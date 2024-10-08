<template>
    <div>
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
      <main>
        <NuxtPage />
      </main>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .navbar {
    background: linear-gradient(90deg, #ce3030, #843f3f); /* สีพื้นหลังแบบกราเดียนต์ */
    color: #fff; /* สีตัวอักษร */
    padding: 15px 30px; /* เพิ่มพื้นที่ */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* เงาที่ชัดเจน */
    display: flex; /* ใช้ flexbox */
    justify-content: space-between; /* จัดให้โลโก้และลิงก์อยู่ห่างกัน */
    align-items: center; /* จัดให้อยู่กลางในแนวตั้ง */
  }
  
  .navbar-container {
    width: 100%; /* ทำให้คอนเทนเนอร์กว้างเต็มที่ */
    max-width: 1200px; /* กำหนดความกว้างสูงสุด */
    margin: 0 auto; /* จัดกลาง */
  }
  
  .logo {
    font-size: 2rem; /* ขนาดฟอนต์ที่ใหญ่ขึ้น */
    font-weight: bold; /* ฟอนต์หนา */
    letter-spacing: 1px; /* ช่องว่างระหว่างตัวอักษร */
    transition: transform 0.3s; /* การเปลี่ยนแปลงที่ราบรื่น */
  }
  
  .logo:hover {
    transform: scale(1.1); /* ขยายขนาดเมื่อโฮเวอร์ */
  }
  
  .nav-links {
    display: flex; /* ใช้ flexbox */
    list-style-type: none; /* ลบจุดที่อยู่หน้า */
    gap: 20px; /* ระยะห่างระหว่างลิงก์ */
  }
  
  .nav-links li {
    position: relative; /* เพื่อให้เอฟเฟ็กต์ปุ่มสามารถทำงานได้ */
  }
  
  .nav-links a {
    color: #fff; /* สีของลิงก์ */
    text-decoration: none; /* ลบขีดเส้นใต้ */
    padding: 10px 15px; /* เพิ่มพื้นที่รอบๆ */
    border-radius: 30px; /* มุมโค้งเพื่อความนุ่มนวล */
    transition: background-color 0.3s, transform 0.2s; /* การเปลี่ยนแปลงที่ราบรื่น */
  }
  
  .nav-links a:hover {
    background-color: rgba(255, 255, 255, 0.2); /* สีพื้นหลังเมื่อโฮเวอร์ */
    transform: translateY(-3px); /* ขยับขึ้นเล็กน้อยเมื่อโฮเวอร์ */
  }
  
  .nav-links a.active {
    background-color: rgba(255, 255, 255, 0.4); /* สีพื้นหลังสำหรับลิงก์ที่ใช้งานอยู่ */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* เงาให้กับลิงก์ที่ใช้งานอยู่ */
  }
  
  main {
    padding: 20px; /* เพิ่มพื้นที่รอบๆ */
    background-color: #f8f8f8; /* สีพื้นหลังของเนื้อหา */
    min-height: calc(100vh - 70px); /* ความสูงขั้นต่ำ */
  }
  </style>
  