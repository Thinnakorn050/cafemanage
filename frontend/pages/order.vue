<template>
    <div>
      <h1>Your Order</h1>
      <OrderSummary :items="orderItems" @remove="removeItem" @placeOrder="placeOrder" />
    </div>
  </template>
  
  <script>
  import OrderSummary from '@/components/OrderSummary.vue';
  
  export default {
    components: {
      OrderSummary,
    },
    data() {
      return {
        orderItems: [],
      };
    },
    methods: {
      removeItem(itemId) {
        this.orderItems = this.orderItems.filter((item) => item.id !== itemId);
      },
      async placeOrder() {
        try {
          const response = await fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: 1, // Replace with actual user ID
              items: this.orderItems,
              totalAmount: this.orderItems.reduce((sum, item) => sum + item.price, 0),
            }),
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          alert(data.message);
          this.orderItems = [];
        } catch (error) {
          console.error('Error placing order:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles as needed */
  </style>
  