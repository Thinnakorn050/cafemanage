<template>
    <v-app>
      <!-- App Bar -->
      <v-app-bar app elevation="2" color="brown darken-2">
        <v-btn icon @click="toggleSidebar">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-toolbar-title>Cafe Management Admin</v-toolbar-title>
      </v-app-bar>
  
      <!-- Sidebar -->
      <v-navigation-drawer v-model="sidebar" app>
        <v-list dense>
          <v-list-item link to="/">
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/products">
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/orders">
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <!-- Main Content -->
      <v-main>
        <v-container fluid>
          <!-- ใช้ NuxtPage เพื่อแสดงเนื้อหาของหน้าที่เกี่ยวข้อง -->
          <NuxtPage />
        </v-container>
      </v-main>
  
      <!-- Footer -->
      <footer class="dashboard-footer">
        <p>Footer content</p>
      </footer>
    </v-app>
  </template>
  
  <script setup>
  // Sidebar state
  const sidebar = ref(false);
  
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    sidebar.value = !sidebar.value;
  };
  </script>
  
  <style scoped>
  .dashboard-footer {
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: center;
  }
  </style>
  