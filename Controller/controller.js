const bookmark = require("../models/bookmark");
const { User, Bookmark } = require("../models/index");
const axios = require("axios");
const { compareHash } = require("../helpers/bcryptjs");
const { getToken } = require("../helpers/jwt");
const { sendRandomSurah } = require("../helpers/nodemailer");

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
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "email or password invalid" };
      }
      const comparedHash = compareHash(password, user.password);
      if (!comparedHash) {
        throw { name: "email or password invalid" };
      }

      const payload = {
        id: user.id,
        email: user.email,
      };
      const token = getToken(payload);
      //   sendRandomSurah(user.email);
      res.status(200).json({
        statusCode: 200,
        message: "Success Login",
        accessToken: token,
        name: user.username,
        role: user.role,
        id: user.id,
      });
    } catch (err) {
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
          UserId: req.user.id,
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
          verses: el.numberOfVerses,
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
  static async addBookmark(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.get(
        `https://api.quran.sutanlab.id/surah/${id}`
      );
      const bookmark = await Bookmark.findOne({
        where: {
          UserId: req.user.id,
          SurahId: id,
        },
      });
      console.log(bookmark);
      if (bookmark) {
        throw { name: "User Already Bookmark This Surah" };
      }
      const create = await Bookmark.create({
        UserId: req.user.id,
        SurahId: id,
      });
      if (!create) {
        throw { name: `Surah is not found` };
      }

      res.status(201).json({
        message: "success add bookmark",
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteBookmarks(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Bookmark.destroy({
        where: {
          id,
        },
      });
      if (!deleted) {
        throw { name: "Bookmark is not found" };
      }
      res.status(200).json({
        message: "Success Delete Bookmark",
      });
    } catch (err) {
      next(err);
    }
  }
  static async detailSurah(req, res, next) {
    try {
      const { id } = req.params;

      const { data } = await axios.get(
        `https://api.quran.sutanlab.id/surah/${id}`
      );
      console.log(data);
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
        number: data.data.number,
        arab: data.data.name.short,
        tafsir: data.data.tafsir.id,
        translation: data.data.name.translation.id,
        verses,
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async randomSurah(req, res, next) {
    try {
      const random = Math.ceil(Math.random() * 113);
      const { data } = await axios.get(
        `https://api.quran.sutanlab.id/surah/${random}`
      );
      let randomAyat = Math.floor(Math.random() * data.data.verses.length);
      let randomSurah = {
        surah: data.data.name.transliteration.id,
        ayat: randomAyat + 1,
        arab: data.data.verses[randomAyat].text.arab,
        latin: data.data.verses[randomAyat].text.transliteration.en,
        indonesia: data.data.verses[randomAyat].translation.id,
      };
      res.status(200).json(randomSurah);
    } catch (err) {
      next(err);
    }
  }
  static async getPrayerTime(req, res, next) {
    try {
      const { long, lat } = req.query;
      console.log(req.query);
      const { data } = await axios.get(
        `https://api.pray.zone/v2/times/today.json?longitude=${long}&latitude=${lat}`
      );
      console.log(data);
      let obj = {
        // timezone: data.results.location.timezone,
        time: data.results.datetime[0].times,
        date: data.results.datetime[0].date.gregorian,
      };
      console.log(obj);
      res.status(200).json(obj);
    } catch (err) {
      next(err);
    }
  }
  static async news(req, res, next) {
    try {
      const { data } = await axios.get(
        `https://newsapi.org/v2/everything?q=islam&apiKey=c2cb5c46705d4e76a7d34a52907b3116`
      );
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
