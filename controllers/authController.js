const User = require("../models/User")
const jwt = require("jsonwebtoken")

// Tạo token từ thông tin user
// Hàm này dùng chung cho cả đăng ký lẫn đăng nhập
const taoToken = (user) => {
  return jwt.sign(
    // Payload — thông tin lưu trong token
    { id: user._id, email: user.email, role: user.role },
    // Secret key từ .env
    process.env.JWT_SECRET,
    // Token hết hạn sau 7 ngày
    { expiresIn: "7d" }
  )
}

// Đăng ký
const dangKy = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Kiểm tra email đã tồn tại chưa
    const daTotnai = await User.findOne({ email })
    if (daTotnai) {
      return res.status(400).json({ message: "Email đã được sử dụng" })
    }

    // Tạo user mới — password tự động hash nhờ middleware pre save
    const user = await User.create({ name, email, password })

    // Trả về token và thông tin user
    res.status(201).json({
      token: taoToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Đăng nhập
const dangNhap = async (req, res) => {
  try {
    const { email, password } = req.body

    // Tìm user theo email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" })
    }

    // So sánh password nhập vào với password đã hash trong DB
    const bcrypt = require("bcrypt")
    const dungMatKhau = await bcrypt.compare(password, user.password)
    if (!dungMatKhau) {
      return res.status(400).json({ message: "Mật khẩu không đúng" })
    }

    res.json({
      token: taoToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { dangKy, dangNhap }