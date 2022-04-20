const express = require("express");
const router = express.Router();

const routerRegister = require("./register");
const routerLogin = require("./login");
const { authenticationUser } = require("../middlewares/authentication")
const routerJobs = require('./jobs')
const routerMyApplications = require('./myApplications')

router.use("/register", routerRegister);
router.use("/login", routerLogin);
router.use(authenticationUser)
router.use('/jobs', routerJobs)
router.use('/myapplications', routerMyApplications)

module.exports = router;