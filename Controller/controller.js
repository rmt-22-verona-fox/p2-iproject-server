const bookmark = require("../models/bookmark");
const { User, Bookmark } = require("../models/index");
const axios = require("axios");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      let obj = {
        email,
        password,
      };
      const user = await User.create(obj, {
        returning: true,
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getSurah(req, res, next) {
    try {
      const { data } = await axios.get("https://api.quran.sutanlab.id/surah");

      let surah = data.data.map((el) => {
        let obj = {
          number: el.number,
          name: el.name.transliteration.id,
          translate: el.name.translation.id,
          verses: el.numberOfVerses,
          arab: el.name.short,
        };
        return obj;
      });
      res.status(200).json(surah);
    } catch (err) {
      next(err);
    }
  }
  static async getBookmark(req, res, next) {
    try {
      const bookmarks = await Bookmark.findAll({
        attributes: ["SurahId", "id"],
        where: {
          UserId: 2,
        },
      });
      let surah = bookmarks.map(async (el) => {
        const { data } = await axios.get(
          `https://api.quran.sutanlab.id/surah/${el.SurahId}`
        );
        return data.data;
      });
      const promise = await Promise.all(surah);
      let filtered = promise.map((el, i) => {
        let obj = {
          id: bookmarks[i].id,
          number: el.number,
          name: el.name.transliteration.id,
          translate: el.name.translation.id,
          verseNumber: el.numberOfVerses,
          arab: el.name.short,
        };
        return obj;
      });
      res.status(200).json(filtered);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async deleteBookmarks(req, res, next) {
    try {
      const { id } = req.params;
    } catch (err) {}
  }
  static async detailSurah(req, res, next) {
    try {
      const { id } = req.params;

      const { data } = await axios.get(
        `https://api.quran.sutanlab.id/surah/${id}`
      );
      console.log(data.data.verses);
      const verses = data.data.verses.map((el) => {
        let obj = {
          ayat: el.number.inSurah,
          arab: el.text.arab,
          latin: el.text.transliteration.en,
          indonesia: el.translation.id,
          audio: el.audio.primary,
        };
        return obj;
      });
      res.status(200).json({
        name: data.data.name.transliteration.id,
        arab: data.data.name.short,
        tafsir: data.data.tafsir.id,
        translation: data.data.name.translation.id,
        verses,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Controller;
