<template>
    <div>
        <h1 class="text-center">自定义模块</h1>
        <v-form>
            <v-text-field
                v-model="model.cardName"
                label="模块名称"
            ></v-text-field>
            <v-file-input
                v-model="model.imgFile"
                accept="image/*"
                label="封面上传"
                placeholder="不上传则默认pb风格"
            ></v-file-input>
            <v-btn class="mr-4" @click="submit"> submit </v-btn>
            <v-btn @click="clear"> clear </v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    name: 'createModule',

    data: () => ({
        model: {
            cardName: '',
            imgFile: '',
            cover: '',
        },
    }),

    methods: {
        async submit() {
            if (this.model.cardName === '') {
                return alert('请输入模块名称');
            } else {
                console.log(this.model.imgFile);
                if (this.model.imgFile !== '') {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(this.model.imgFile);
                    fileReader.onload = async (e) => {
                        this.model.cover = e.target.result;
                        const {
                            data: { msg, code },
                        } = await this.$http.post('/createCard', this.model);
                        alert(msg);
                        if (code === 200) {
                            this.$router.replace('/');
                        }
                    };
                } else {
                    const {
                        data: { msg },
                    } = await this.$http.post('/createCard', this.model);
                    alert(msg);
                }
            }
        },
        clear() {
            this.model = {};
        },
    },
};
</script>
