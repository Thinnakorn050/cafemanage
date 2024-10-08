<template>
    <div>
      <h1>User Profile</h1>
      <p>Welcome, {{ username }}!</p>
      <!-- Add user details and settings here -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: 'User', // Replace with actual username
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add styles as needed */
  </style>
  