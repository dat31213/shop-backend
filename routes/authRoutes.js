const express = require("express")
const router = express.Router()
const { dangKy, dangNhap } = require("../controllers/authController")

// POST /api/auth/dang-ky
router.post("/dang-ky", dangKy)

// POST /api/auth/dang-nhap
router.post("/dang-nhap", dangNhap)

module.exports = router