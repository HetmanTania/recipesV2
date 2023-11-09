<template>
  <div :style="{backgroundImage: 'url(' + recipeData.image + ')'} " class="recipe-block">
        <router-link :to="{name: 'recipe', params: { id: idRecipe }}">
            <div class="recipe-title">{{title}}</div>
        </router-link>
    </div>
</template>

<script>
import {computed} from 'vue';
import { ellipsisText } from '../../utils/utils';
export default {
    props: {
        recipe: {
            require: true,
            type: Object
        }
    },
    setup(props) {
        const recipeData = {...props.recipe};
        const title = computed(() => {
           return ellipsisText(recipeData.title);
        });

        const idRecipe = computed(() => {
            return recipeData.id;
        })

        return {
            recipeData,
            idRecipe,
            title
        }
    }
}
</script>

<style lang="scss">
@import '../../style/mixin.scss';
@import '../../style/var.scss';
@import './recipesBlock.scss';
</style>