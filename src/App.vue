<template>
  <div id="app">
    <keep-alive include="recipes">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Recipes from './components/Recipes.vue';


export default {
  name: 'app',
  components: {
    Recipes
  }
}
</script>

<style>
#app {
}
</style>
