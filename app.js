if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const searchRoute = require("./routes/search");
const { User, Buyer } = require("./models");
var nodemailer = require("nodemailer");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/search", searchRoute);

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userLogin = await User.findOne({
      where: {
        email,
      },
    });
    if (!userLogin) {
      next({ name: "NotFound" });
    }

    res.status(200).json({
      email: userLogin.email,
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mjbramadhan@gmail.com",
        pass: "fzihcdlrlgjemgja",
      },
    });

    var mailOptions = {
      from: "mjbramadhan@gmail.com",
      to: "mujib.ramadhan@gmail.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/booking", async (req, res) => {
  try {
    const { hotelName, price } = req.body;
    const data = await Buyer.create({ hotelName, price, UserId: 1 });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/booking", async (req, res) => {
  try {
    const data = await Buyer.findAll({
      include: User,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
