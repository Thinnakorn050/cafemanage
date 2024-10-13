const db = require('../db');

// ดึงข้อมูลคำสั่งซื้อทั้งหมด
exports.getAllOrders = async () => {
    const [orders] = await db.query('SELECT * FROM orders');
    return orders;
};

// ดึงข้อมูลคำสั่งซื้อที่มี ID เฉพาะเจาะจง
exports.getOrderById = async (id) => {
    const [order] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
    if (order.length === 0) return null;
    return order[0];
};

// สร้างคำสั่งซื้อใหม่
exports.createOrder = async (user_id, menu_items) => {
    const [result] = await db.query('INSERT INTO orders (user_id, payment_status) VALUES (?, ?)', [user_id, 'pending']);
    const orderId = result.insertId;

    const orderItems = menu_items.map(item => [orderId, item.menu_item_id, item.quantity, item.quantity * item.price]); // เพิ่ม total_price
    await db.query('INSERT INTO order_items (order_id, menu_item_id, quantity, total_price) VALUES ?', [orderItems]);

    return { orderId, menu_items };
};

// อัปเดตสถานะของคำสั่งซื้อ
exports.updateOrder = async (id, payment_status) => {
    const [result] = await db.query('UPDATE orders SET payment_status = ? WHERE id = ?', [payment_status, id]);
    return result.affectedRows > 0 ? { id, payment_status } : null;
};

// ลบคำสั่งซื้อ
exports.deleteOrder = async (id) => {
    await db.query('DELETE FROM order_items WHERE order_id = ?', [id]);
    const [result] = await db.query('DELETE FROM orders WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
