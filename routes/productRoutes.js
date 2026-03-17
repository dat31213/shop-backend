const express = require("express")
const router = express.Router()
const { layTatCa, layTheoId, taoMoi, suaSanPham, xoaSanPham } = require("../controllers/productController")
const auth = require("../middleware/auth")

// GET /api/products — ai cũng xem được
router.get("/", layTatCa)

// GET /api/products/:id — ai cũng xem được
router.get("/:id", layTheoId)

// POST /api/products — phải đăng nhập mới tạo được
// auth là middleware chạy trước, kiểm tra token hợp lệ không
router.post("/", auth, taoMoi)


router.put("/:id", auth, suaSanPham)      // PUT /api/products/:id — phải đăng nhập mới sửa được
router.delete("/:id", auth, xoaSanPham)     // DELETE /api/products/:id — phải đăng nhập mới xóa được

module.exports = router