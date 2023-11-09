<template>
    <div v-if="isOpen" class="bg-dialog" @click.stop="close"></div>
        <div class="wapper-dialog" v-if="isOpen">
        <div class="dialog">
            <div @click="close" class="icon-close svg"></div>
            <slot name="header"></slot>
            <slot name="content"></slot>
            <slot name="footer"></slot>
        </div>
    </div>
    
</template>

<script>
import useOpenClose from '../../composable/useOpenClose';
import { computed, watch } from 'vue';

export default {
    props: {
        isOpenDialog: {
            type: Boolean
        },
      
    },
    setup(props, context) {
        let dialogOpenColose = useOpenClose();
        
        const isOpen = computed(() => {
            return dialogOpenColose.isOpen.value;
        });


        const isOpenDialogFromParent = computed(() => {
            return props.isOpenDialog
        })

        const close = () => {
            dialogOpenColose.close()
            context.emit('closeDialog');
        }

        watch(isOpenDialogFromParent, (newValue) => {
            if(newValue) {
                dialogOpenColose.open();
            }
            else {
                dialogOpenColose.close();
            }
        });

        return {
            
            dialogOpenColose,
            close,
            isOpen,
        }
    }
}

</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import '../Dialog/dialog.scss';
</style>
