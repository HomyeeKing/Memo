<template>
    <div>
        <a-card hoverable style="width: 300px">
            <template #cover>
                <img alt="example" :src="coverUrl" />
            </template>

            <a-card-meta title="Jario's Memo" description="Memo Of Jario">
            </a-card-meta>
        </a-card>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { Card } from 'ant-design-vue';
export default defineComponent({
    name: 'UnitCard',
    components: { ACard: Card, ACardMeta: Card.Meta },
    props: {
        coverUrl: {
            type: String,
            default:
                'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        },
    },
});
</script>

<style scoped lang="scss">
</style>