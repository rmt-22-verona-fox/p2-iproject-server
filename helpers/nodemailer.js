const axios = require("axios");
const nodemailer = require("nodemailer");
const { User } = require("../models/index");

async function sendRandomSurah(email) {
  try {
    let configMail = {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "iproject.quran@gmail.com",
        pass: "openforpublic",
      },
    };
    // const random = Math.ceil(Math.random() * 113);

    const { data } = await axios.get(
      `https://newsapi.org/v2/everything?q=islam&apiKey=${process.env.NEWSKEY}`
    );
    let randomNews = Math.floor(Math.random() * data.articles.length);

    let transporter = await nodemailer.createTransport(configMail);
    let mail = {
      to: email,
      from: configMail.auth.user,
      subject: "[Daily surah]",
      html: `
        <div
        style="
          border-radius: 15px;
          padding: 20px;
        ">
        <p
          style="
            font-size: 2em;
            font-style: italic;
            font-family: sans-serif;
            font-weight: bold;
          "
        >
        ${data.articles[randomNews].source.name}
        </p>
        <p
          style="
            font-size: 1.5em;
            font-weight: bold;
            margin-top: 3px;
            margin-bottom: 5px;
            font-family: sans-serif;
          "
        >
        ${data.articles[randomNews].title}
        </p>
       
       
        <img style="max-width: 400px; max-height: 400px" src="${data.articles[randomNews].urlToImage}" />
        <p style="font-style: italic; font-family: sans-serif;font-size: 1.3em;">
         ${data.articles[randomNews].description}
        </p>
        <a href="${data.articles[randomNews].url}">Read Here</a>
      </div>
        `,
    };
    transporter.sendMail(mail);
  } catch (err) {
    console.log(err);
  }
}
async function sendBulkRandomSurah() {
  try {
    let configMail = {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "iproject.quran@gmail.com",
        pass: "openforpublic",
      },
    };
    const random = Math.ceil(Math.random() * 113);

    const { data } = await axios.get(
      `https://api.quran.sutanlab.id/surah/${random}`
    );
    let randomAyat = Math.floor(Math.random() * data.data.verses.length);
    const users = await User.findAll();

    let email = users.map((el) => {
      return el.email;
    });
    console.log(email);
    let transporter = await nodemailer.createTransport(configMail);
    let mail = {
      to: email,
      from: configMail.auth.user,
      subject: "[Daily surah]",
      html: `
          <div
          style="
            border-radius: 15px;
            padding: 20px;
          ">
          <p
            style="
              font-size: 2em;
              font-style: italic;
              font-family: sans-serif;
              font-weight: bold;
            "
          >
          ${data.data.name.transliteration.id}
          </p>
          <p
            style="
              font-size: 1.5em;
              font-weight: bold;
              margin-top: 3px;
              margin-bottom: 5px;
              font-family: sans-serif;
            "
          >
          Ayat-${randomAyat + 1}
          </p>
         
         
          <p style="font-style: italic; font-family: sans-serif;font-size: 2em;">
           ${data.data.verses[randomAyat].text.arab}
          </p>
          <p style="font-style: italic; font-family: sans-serif;font-size: 1.3em;">
           ${data.data.verses[randomAyat].text.transliteration.en}
          </p>
          <p style="font-family: sans-serif;font-size: 1.3em;font-style: italic">
          "${data.data.verses[randomAyat].translation.id}"
        </p>
        </div>
          `,
    };
    transporter.sendMail(mail);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { sendRandomSurah, sendBulkRandomSurah };
