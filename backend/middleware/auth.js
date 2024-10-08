const auth = (req, res, next) => {
    // ตัวอย่างการตรวจสอบการเข้าสู่ระบบ
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    
    // ใส่ตรรกะการตรวจสอบ token ที่นี่ (JWT, session, เป็นต้น)

    next();
};

module.exports = auth;
