<template>
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Manage Orders</h2>
        <div v-if="orders.length">
          <ul>
            <li v-for="order in orders" :key="order.id">
              <p>Order ID: {{ order.id }}</p>
              <p>Total Amount: {{ order.totalAmount }}</p>
              <button @click="deleteOrder(order.id)">Delete Order</button>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No orders available.</p>
        </div>
      </div>
      <div>
        <h2>Manage Stock</h2>
        <div v-if="menuItems.length">
          <ul>
            <li v-for="item in menuItems" :key="item.id">
              <p>{{ item.name }} - {{ item.price }} THB</p>
              <button @click="deleteProduct(item.id)">Delete Product</button>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No products available.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orders: [],
        menuItems: [],
      };
    },
    async mounted() {
      await this.fetchOrders();
      await this.fetchMenuItems();
    },
    methods: {
      async fetchOrders() {
        try {
          const response = await fetch('http://localhost:5000/orders');
          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }
          this.orders = await response.json();
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      },
      async fetchMenuItems() {
        try {
          const response = await fetch('http://localhost:5000/menu');
          if (!response.ok) {
            throw new Error('Failed to fetch menu items');
          }
          this.menuItems = await response.json();
        } catch (error) {
          console.error('Error fetching menu items:', error);
        }
      },
      async deleteOrder(orderId) {
        try {
          const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete order');
          }
          alert('Order deleted successfully');
          this.orders = this.orders.filter((order) => order.id !== orderId);
        } catch (error) {
          console.error('Error deleting order:', error);
        }
      },
      async deleteProduct(productId) {
        try {
          const response = await fetch(`http://localhost:5000/menu/${productId}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete product');
          }
          alert('Product deleted successfully');
          this.menuItems = this.menuItems.filter((item) => item.id !== productId);
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles as needed */
  h1, h2 {
    margin-bottom: 20px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin-bottom: 10px;
    background: #f9f9f9;
    padding: 10px;
    border: 1px solid #ddd;
  }
  button {
    margin-top: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  