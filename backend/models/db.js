const mysql = require('mysql2'); 

// MySQL Connection Pool (recommended for handling multiple connections)
const db = mysql.createPool({
    host: 'localhost',
    user: 'root', // ชื่อผู้ใช้ MySQL
    password: '', // รหัสผ่าน MySQL
    database: 'cafe_management', // ชื่อฐานข้อมูล
    waitForConnections: true, // รอการเชื่อมต่อ
    connectionLimit: 10, // จำนวนการเชื่อมต่อสูงสุด
    queueLimit: 0 // ไม่จำกัดจำนวนคิว
});

// ใช้งาน Promise เพื่อให้รองรับ async/await ได้
db.promise().getConnection()
  .then(conn => {
      console.log('Connected to MySQL Database.');
      conn.release(); // ปล่อยการเชื่อมต่อหลังจากใช้งาน
  })
  .catch(err => {
      console.error('MySQL connection error: ', err);
  });

module.exports = db;
