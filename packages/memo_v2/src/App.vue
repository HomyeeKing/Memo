<template>
    <v-app id="sandbox" dark>
        <!-- <v-navigation-drawer 
    v-model="drawerModel"
    :mini-variant=true
    app
    overflow
    :bottom="true"
    >
      <v-list>
        <v-list-item>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->
        <v-overlay :value="showP">
            <v-card>
                <v-text>
                    <v-simple-table center>
                        <template #default>
                            <thead>
                                <tr>
                                    <th class="text-left">按键</th>
                                    <th class="text-left">功能</th>
                                    <th
                                        class="text-left"
                                        @click.stop="showP = !showP"
                                    >
                                        X
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in shortCuts" :key="item.func">
                                    <td>{{ item.key }}</td>
                                    <td>{{ item.func }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-text>
            </v-card>
        </v-overlay>
        <v-overlay :value="tv">
            <span
                @click="tv = false"
                class="float-right"
                style="cursor: default"
                >X</span
            >
            <video
                src="./assets/tutorail.mp4"
                width="500"
                height="350"
                controls="controls"
            ></video>
        </v-overlay>
        <v-app-bar app color="primary">
            <i
                aria-hidden="true"
                @click="() => $router.back()"
                style="margin-right: 20px"
                class="v-icon notranslate mdi mdi-arrow-left-bold theme--dark"
            ></i>

            <i
                aria-hidden="true"
                @click="tv = !tv"
                style="margin-right: 20px"
                class="v-icon notranslate mdi mdi-television-box theme--dark"
            ></i>
            <v-toolbar-title class="font-weight-black secondary--text"
                >Memo</v-toolbar-title
            >
            <div class="spacer"></div>
            <span class="toolbar-icons d-flex justify-space-between">
                <i
                    aria-hidden="true"
                    class="v-icon notranslate mdi mdi-bell theme--dark"
                    @click.stop="showP = !showP"
                ></i>
                <i
                    aria-hidden="true"
                    @click="createModule"
                    class="v-icon notranslate mdi mdi-brain theme--dark"
                ></i>
                <i
                    aria-hidden="true"
                    @click="changeTheme"
                    class="v-icon notranslate mdi mdi-invert-colors theme--dark"
                ></i>
            </span>
        </v-app-bar>

        <v-content>
            <v-container fluid style="width: 100%; height: 100%">
                <router-view></router-view>
            </v-container>
        </v-content>

        <v-footer app color="primary" class="d-flex justify-space-between">
            <span class="px-4 secondary--text font-weight-bold"
                >&copy; {{ new Date().getFullYear() }}</span
            >
            <span class="px-4 text-uppercase font-weight-bold secondary--text"
                >producted by homyee king</span
            >
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'App',

    data: () => ({
        drawerModel: false,
        showP: false,
        tv: false,
        shortCuts: [
            { key: 'p', func: '播放单词发音' },
            { key: 'f', func: '输入框获取焦点' },
            { key: 'Enter', func: '停止计时 / 转到下一个单词' },
            { key: 'ESC', func: '回到单词列表' },
            { key: '↑', func: '返回上一个单词' },
            { key: '↓', func: '前往下一个单词' },
        ],
    }),
    methods: {
        changeTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
        createModule() {
            this.$router.push('/createCards');
        },
    },
};
</script>
<style lang="stylus" scoped>
.v-icon {
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.4s ease-in-out;

  &:hover {
    opacity: 1;
  }
}

.toolbar-icons {
  width: 100px;
}
</style>