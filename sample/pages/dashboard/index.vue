<template>
    <div class="dashboard-page">
      <h2>Welcome to Your Dashboard</h2>
      <p>This is your main dashboard page.</p>
  
      <!-- แสดงสถิติพื้นฐาน -->
      <div class="stats">
        <div class="stat-card" v-for="(stat, index) in stats" :key="index">
          <h3>{{ stat.title }}</h3>
          <p>{{ stat.value }}</p>
        </div>
      </div>
  
      <!-- เพิ่มกราฟ หรือข้อมูลเพิ่มเติมที่ต้องการ -->
    </div>
  </template>
  
  <script>
  export default {
    layout: 'dashboard',  // กำหนดให้ใช้ Layout 'dashboard'
  
    data() {
      return {
        stats: [
          { title: 'Total Users', value: 1000 },
          { title: 'New Orders', value: 150 },
          { title: 'Revenue', value: '$10,000' }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .dashboard-page {
    padding: 20px;
  }
  
  .stats {
    display: flex;
    gap: 20px;
  }
  
  .stat-card {
    background-color: #f1f1f1;
    padding: 15px;
    border-radius: 8px;
    width: 200px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  </style>
  