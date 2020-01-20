<template>
    <section id="recipes">
        <article v-for="recipe in recipes" :key="recipe.id">
            <a :href="'http://localhost:3000/' + recipe.id">{{ recipe.name }}</a>
        </article>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            recipes: []
        };
    },
    mounted() {
        axios.get('http://localhost:3000/').then(result => {
            this.recipes = result.data;
            console.log(result);
        }, error => {
            console.error(error);
        });
    }
}
</script>

<style scoped>

</style>