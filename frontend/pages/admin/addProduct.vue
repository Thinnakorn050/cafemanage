<template>
    <div>
      <h1>Add Product</h1>
      <form @submit.prevent="addProduct">
        <input v-model="name" placeholder="Product Name" required />
        <input v-model="price" placeholder="Price" type="number" required />
        <textarea v-model="description" placeholder="Description"></textarea>
        <button type="submit">Add Product</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        price: '',
        description: '',
      };
    },
    methods: {
      async addProduct() {
        try {
          const response = await fetch('http://localhost:5000/menu', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.name,
              price: this.price,
              description: this.description,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          alert('Product added successfully');
          this.name = '';
          this.price = '';
          this.description = '';
        } catch (error) {
          console.error('Error adding product:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles as needed */
  </style>
  