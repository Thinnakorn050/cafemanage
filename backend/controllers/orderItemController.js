const OrderItem = require('../models/orderItemModels');

// ดึงข้อมูล order_items ทั้งหมด
exports.getAllOrderItems = (req, res) => {
  OrderItem.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// ดึงข้อมูล order_items โดยใช้ id
exports.getOrderItemById = (req, res) => {
  const id = req.params.id;
  OrderItem.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Order Item not found' });
    }
    res.json(results[0]);
  });
};

// สร้าง order_items ใหม่
exports.createOrderItem = (req, res) => {
  const orderItemData = req.body;
  OrderItem.create(orderItemData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Order Item created', orderItemId: result.insertId });
  });
};

// อัปเดต order_items
exports.updateOrderItem = (req, res) => {
  const id = req.params.id;
  const orderItemData = req.body;
  OrderItem.update(id, orderItemData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Order Item updated' });
  });
};

// ลบ order_items
exports.deleteOrderItem = (req, res) => {
  const id = req.params.id;
  OrderItem.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Order Item deleted' });
  });
};
