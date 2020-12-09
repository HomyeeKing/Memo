<template>
    <div class="home d-flex align-center">
        <unit-card></unit-card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UnitCard from '@/components/unit-card.vue';

export default defineComponent({
    name: 'Home',
    components: { UnitCard },
});
</script>

<style lang="scss">
.home {
    width: 100px;
    padding: 20px;
}
</style>
