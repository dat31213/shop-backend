const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  // Lấy token từ header
  const authHeader = req.headers.authorization

  // Kiểm tra có token và đúng định dạng "Bearer xxxxx" không
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Không có token" })
  }

  // Tách lấy phần token, bỏ chữ "Bearer "
  const token = authHeader.split(" ")[1]

  try {
    // Xác thực token — nếu sai hoặc hết hạn sẽ nhảy vào catch
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Gắn thông tin user vào request — dùng ở các route sau
    req.user = decoded
    next()

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token đã hết hạn" })
    }
    return res.status(401).json({ message: "Token không hợp lệ" })
  }
}

module.exports = auth