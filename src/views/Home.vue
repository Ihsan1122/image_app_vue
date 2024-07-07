<template>
    <div class="home">
      <h1>Welcome to the Photo Web App</h1>
      <p>Please sign in or register to continue.</p>
      <router-link to="/register">Register</router-link>
      <router-link to="/login">Login</router-link>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    margin-top: 50px;
  }
  
  .home h1 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  .home p {
    margin-bottom: 20px;
  }
  
  .home a {
    display: inline-block;
    margin: 10px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .home a:hover {
    background-color: #358a6e;
  }
  </style>
  