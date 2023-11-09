<template>
    <div class="pagination">
        <button class="pagination__item">p</button>
        <button @click="setPage(state.currentPage - 3)" v-if="isShowFirstEllipsis" class="pagination__item">...</button>
        <button @click="setPage(num)" v-for="num in getShowPaginationList" :key="num" :class="[{current: isCurrentPage(num)}, 'pagination__item']">{{ num }}</button>
        <button @click="setPage(state.showPaginationNum.to + 1)" class="pagination__item">...</button>
        <button @click="setPage(lastItem)" class="pagination__item">{{lastItem}}</button>
        <button class="pagination__item">n</button>
    </div>

</template>

<script>
import { computed, watch, reactive } from 'vue';

export default {
    props: {
        infoPagination: {
            typeof: Object,
            require: true
        }
    },
    setup(props, context) {

        const state = reactive({
            currentPage: 1,
            showPaginationNum: {
                from:1,
                to:7
            }
        });

        const setPage = (num) => {
            if(num) {
                state.currentPage = num;
                context.emit('changePagination', state.currentPage);
                setShowPaginationNum(num);
            }
        }

        const isCurrentPage = (num) => {
            return state.currentPage === num
        };

        const isShowFirstEllipsis = computed(() => {
            return state.currentPage >= 5;
        });

        const getShowPaginationList = computed(() =>  {
            return [...Array(7)].map((_, i) => state.showPaginationNum.from + i);
        });

        const lastItem = computed(() => {
            console.log(props.infoPagination);
            if(props.infoPagination?.total) {
                return Math.ceil(props.infoPagination.total / props.infoPagination.count)
            }
            return 0;
        });
       
        const setShowPaginationNum = (num) => {
            if(num - 3 <= 0) {
                state.showPaginationNum = {
                    from: 1,
                    to: 7
                };
            }
            else if((num >= state.showPaginationNum.from) || num > state.showPaginationNum.to) {
                state.showPaginationNum = {
                    from: num - 3,
                    to: num + 3
                };
            }
               
           
        }

        watch(() => props.infoPagination, (newValue, oldValue) => { 
            if(newValue.total !== oldValue.total) {
                setPage(1);
            }
        })


        return {
            setPage,
            lastItem,
            getShowPaginationList,
            isCurrentPage,
            isShowFirstEllipsis,

            state
        }
    }

}
</script>

<style lang="scss">
@import '../../style/mixin.scss';
@import '../../style/var.scss';
@import './pagination.scss';
</style>