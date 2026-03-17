// server.js — điểm khởi động toàn bộ backend

// Dòng này phải đặt ĐẦU TIÊN — load biến từ .env vào process.env
require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

// ── Middleware ──────────────────────────────────
// Cho phép nhận dữ liệu JSON từ request
app.use(express.json())

// Cho phép React (localhost:5173) gọi API sang đây (localhost:5000)
// Không có dòng này → React sẽ bị lỗi CORS khi gọi API
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://shop-frontend-xxxx.vercel.app"  // 👈 thay bằng URL Vercel thật của bạn
  ]
}))
// ── Kết nối MongoDB ─────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => console.log("❌ Lỗi MongoDB:", err.message))

// ── Routes ──────────────────────────────────────
// Import và dùng các route — sẽ tạo ở bước sau
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")

// Mọi request bắt đầu bằng /api/auth → vào authRoutes
app.use("/api/auth", authRoutes)
// Mọi request bắt đầu bằng /api/products → vào productRoutes
app.use("/api/products", productRoutes)

// ── Khởi động server ────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`)
})