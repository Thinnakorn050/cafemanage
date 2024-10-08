<template>
  <nav class="navbar">
    <div class="navbar-container">
      <h1 class="logo">Cafe Management</h1>
      <ul class="nav-links">
        <li><nuxt-link to="/" exact-active-class="active">Home</nuxt-link></li>
        <li><nuxt-link to="/order" exact-active-class="active">Order</nuxt-link></li>
        <li><nuxt-link to="/payment" exact-active-class="active">Payment</nuxt-link></li>
        <li><nuxt-link to="/user" exact-active-class="active">User Profile</nuxt-link></li>
        <li><nuxt-link to="/admin/dashboard" exact-active-class="active">Admin</nuxt-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #ff7e5f, #feb47b); /* Gradient สีสวยงาม */
  padding: 15px 20px; /* เพิ่มพื้นที่ */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* เงาเพื่อให้ดูมีมิติ */
}

.navbar-container {
  display: flex;
  justify-content: space-between; /* จัดให้โลโก้และลิงก์อยู่ห่างกัน */
  align-items: center; /* จัดให้อยู่กลางในแนวตั้ง */
}

.logo {
  font-size: 1.8rem; /* ขนาดฟอนต์สำหรับโลโก้ */
  color: #fff; /* สีโลโก้ */
  font-weight: bold; /* ฟอนต์หนา */
}

.nav-links {
  display: flex;
  list-style-type: none; /* ลบจุดที่อยู่หน้า */
  gap: 20px; /* ระยะห่างระหว่างลิงก์ */
}

.nav-links li {
  position: relative; /* ตั้งค่าเพื่อให้เอฟเฟ็กต์ปุ่มสามารถทำงานได้ */
}

.nav-links a {
  color: #fff; /* สีของลิงก์ */
  text-decoration: none; /* ลบขีดเส้นใต้ */
  padding: 10px 15px; /* เพิ่มพื้นที่รอบๆ */
  border-radius: 5px; /* มุมโค้ง */
  transition: background-color 0.3s, transform 0.2s; /* การเปลี่ยนแปลงที่ราบรื่น */
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.2); /* สีพื้นหลังเมื่อโฮเวอร์ */
  transform: translateY(-3px); /* ขยับขึ้นเล็กน้อยเมื่อโฮเวอร์ */
}

.nav-links a.active {
  background-color: rgba(255, 255, 255, 0.4); /* สีพื้นหลังสำหรับลิงก์ที่ใช้งานอยู่ */
}
</style>
