<template>
  <div id="app">
    <Recipes></Recipes>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Recipes from './components/Recipes.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Recipes
  }
}
</script>

<style>
#app {
}
</style>
