<template>
    <div>
      <h2>Order Summary</h2>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }} - ${{ item.price }}
          <button @click="$emit('remove', item.id)">Remove</button>
        </li>
      </ul>
      <p>Total: ${{ total }}</p>
      <button @click="$emit('placeOrder')">Place Order</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      items: Array,
    },
    computed: {
      total() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles as needed */
  </style>
  