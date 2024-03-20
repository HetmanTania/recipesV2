<template>
  <div :style="getBG" class="recipe-block">
        <router-link :to="{name: 'recipe', params: { id: idRecipe }}">
            <div class="recipe-title">{{title}}</div>
        </router-link>
    </div>
</template>

<script>
import { ellipsisText } from '@/utils/utils';

import { computed } from 'vue';

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
        });

        const getBG = computed(() => {
            return `background-image: url('${recipeData.image}')`
        });

        return {
            recipeData,

            idRecipe,
            title,
            getBG,
        }
    }
}
</script>

<style lang="scss">
@import '../../style/mixin.scss';
@import '../../style/var.scss';
@import './recipesBlock.scss';
</style>