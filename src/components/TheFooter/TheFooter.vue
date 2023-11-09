<template>
<div class="wrapper-footer">
    <div class="bg-img leaves-1"></div>
    <footer class="footer">
        <div class="footer-info">
            <div class="footer-infoLinks"> 
                <div class="footer-logo">
                    <div class="logo svg">
                        <img src="../../assets/svg/logo.svg"/>
                    </div>
                    <h3 class="title title-small">So Yummy</h3>
                </div>
                <ul class="list-ul">
                    <li>Database of recipes that can be replenished</li>
                    <li>Flexible search for desired and unwanted ingredients</li>
                    <li>Ability to add your own recipes with photos</li>
                    <li>Convenient and easy to use</li>
                </ul>
            </div>
            <div class="footer-links">
                <ul class="list-ul">
                    <li>Ingredients</li>
                    <li>Add recipes</li>
                    <li>My recipes</li>
                    <li>Favorite</li>
                    <li>Shopping list</li>
                </ul>
            </div>  
        </div>
        <div class="footer-rights">
            <p>© {{ getYear}} All Rights Reserved</p>
            <p>Terms of Service</p>
            <div class="bg-img"></div>
        </div>
</footer>

</div>

</template>

<script>
import { computed } from 'vue'

export default {
    setup() {

        const getYear = computed(() => {
            return new Date().getUTCFullYear();
        })

        return {
            getYear
        }
    }
}

</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './theFooter.scss';
</style>