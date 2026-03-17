const Product = require("../models/Product")

// Lấy tất cả sản phẩm
const layTatCa = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy 1 sản phẩm theo id
const layTheoId = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Tạo sản phẩm mới — chỉ admin mới được dùng
const taoMoi = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Sửa sản phẩm
const suaSanPham = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,  // tìm theo id
      req.body,       // cập nhật bằng dữ liệu gửi lên
      { new: true }   // trả về sản phẩm sau khi sửa
    )
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Xóa sản phẩm
const xoaSanPham = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" })
    }
    res.json({ message: "Xóa thành công" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { layTatCa, layTheoId, taoMoi, suaSanPham, xoaSanPham }