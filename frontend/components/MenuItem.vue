<template>
    <div class="menu-item">
      <img :src="item.imageUrl" alt="Menu Item Image" />
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <p class="price">Price: ${{ item.price }}</p>
      <button @click="addToOrder">Add to Order</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: Object,
    },
    methods: {
      addToOrder() {
        this.$emit('add', this.item);
      },
    },
  };
  </script>
  
  <style scoped>
  .menu-item {
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .menu-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
  
  .menu-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }
  
  .price {
    font-size: 1.25rem;
    color: #e74c3c;
    font-weight: bold;
    margin: 10px 0;
  }
  
  button {
    background-color: #4CAF50; /* Green */
    color: white;
    border: none;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #45a049; /* Darker green */
  }
  </style>
  