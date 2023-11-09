<template>
    <TheHeader></TheHeader>
    <main>
        <h1 class="title title-big">Search</h1>
        <div class="search-sistem">
            <div class="search-sistem__wrapper">
                <InputText v-model="valueSearchText" placeholder="Search" clases="shearch__input curly-input input input-gray"></InputText>
                <button @click="search" class="btn btn-curly btn-curly-green-hoverBlack btn-curly-green">Search</button>
            </div>
        </div>
        <!-- <RecipesSection :search="{type: 'query', searchText: searchText.value}" countRecipes=8 isBtnMore="false" isShowTitle="false" :pageNum="pageNum"></RecipesSection> -->
    </main>
    <theFooter></theFooter>
</template>

<script>
// import RecipesSection from '../../components/RecipesSection/RecipesSection.vue';
import TheHeader from '../../components/TheHeader/TheHeader.vue';
import TheFooter from '../../components/TheFooter/TheFooter.vue'
import InputText from '../../components/InputText/InputText.vue'
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const valueSearchText = ref('meal');
        const searchText = ref('meal');
        const store = useStore();
        const search = async () => {
            searchText.value = valueSearchText
            await store.dispatch('recipes/requestSerch', {search: 'sandwich', count: 8, offset: 0});
        }

        return {
            valueSearchText,
            searchText,
            search
        }
    },
    components: { TheHeader, TheFooter, InputText }
}
</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './search.scss';
</style>