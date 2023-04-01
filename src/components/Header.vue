<template>
    <header class="bg-light py-3">
      <div class="container">
        <NavBar></NavBar>
      </div>
    </header>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue'
  export default {
    name: 'HeaderFile',
    components: {
        NavBar,
    }
  }
  </script>
  
  <style scoped></style>