<template>
    <div>
      <h1>Payment</h1>
      <p>Total Amount: {{ totalAmount }}</p>
      <button @click="payNow">Pay Now</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        totalAmount: 0,
      };
    },
    methods: {
      payNow() {
        alert('Payment successful!');
        // Implement actual payment logic here
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles as needed */
  </style>
  