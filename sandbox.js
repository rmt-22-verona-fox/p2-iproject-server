const axios = require("axios");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

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

async function getAll() {
  try {
    const random = Math.ceil(Math.random() * 113);

    const { data } = await axios.get(
      `https://api.quran.sutanlab.id/surah/${random}`
    );
    let randomAyat = Math.floor(Math.random() * data.data.verses.length);

    // console.log(data.data.name);
    // console.log(data.data.name.transliteration.id);
    // console.log("ayat ke", randomAyat + 1);
    // console.log(data.data.verses[randomAyat].text.arab);
    // console.log(data.data.verses[randomAyat].text.transliteration.en);
    var maillist = ["donquixote0550@gmail.com", "rezaalp05@gmail.com"];
    let transporter = await nodemailer.createTransport(configMail);
    let mail = {
      to: maillist,
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

// cron.schedule(" * * * * * ", () => {
//   getAll();
//   console.log("success send email");
// });
// getPrayerTime();
getAll();
