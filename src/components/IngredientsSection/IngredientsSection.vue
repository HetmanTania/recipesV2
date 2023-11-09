<template>
    <div class="ingrediens-block">
        <div class="ingredien-header">
            <p>Ingredients</p>
            <div class="number-add">
                <p>Number</p>
                <p>Add to list</p>
            </div>
        </div>
        <IngredienBlock :ingredien="ingredien" v-for="ingredien in ingrediensList" :key="ingredien.id"></IngredienBlock>
    </div>
</template>

<script>
import IngredienBlock from '../IngredienBlock/IngredienBlock.vue';

export default {
    props: {
        ingrediensList: {
            type: Array,
            required: true
        }
    },
    setup() {
    },
    components: { IngredienBlock }
}
</script>

<style lang="scss">
@import '../../style/mixin.scss';
@import '../../style/var.scss';
@import './ingredientsSection.scss';
</style>