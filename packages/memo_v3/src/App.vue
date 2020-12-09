<template>
    <app-skeleton>
        <template #main> <router-view /> </template>
    </app-skeleton>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import AppSkeleton from '@/components/AppSkeleton';
export default defineComponent({
    name: 'App',
    components: { AppSkeleton },
});
</script>
<style lang="scss">
// #nav {
//     width: 100vw;
//     height: $top-nav-height;
//     background-color: $primary;
// }
</style>
