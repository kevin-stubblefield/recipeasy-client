import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import store from './store';

import Recipes from './components/Recipes.vue';
import RecipeDetails from './components/RecipeDetails.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'recipes', path: '/', component: Recipes },
  { name: 'recipeDetails', path: '/:slug', component: RecipeDetails },
];

const router = new VueRouter({
  mode: 'history',
  base: 'recipeasy',
  routes
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app');
