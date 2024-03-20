<template>
    <div class="ingredients-block">
        <div class="ingredient-header">
            <p>Ingredients</p>
            <div class="number-add">
                <p>Number</p>
                <p>Add to list</p>
            </div>
        </div>
        <IngredientBlock :ingredient="ingredient" v-for="ingredient in ingredientsList" :key="ingredient.id"></IngredientBlock>
    </div>
</template>

<script>
import IngredientBlock from '../IngredientBlock/IngredienBlock.vue';

export default {
    props: {
        ingredientsList: {
            type: Array,
            required: true
        }
    },
    setup() {
    },
    components: { IngredientBlock }
}
</script>

<style lang="scss">
@import '../../style/mixin.scss';
@import '../../style/var.scss';
@import './ingredientsSection.scss';
</style>