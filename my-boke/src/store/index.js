import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        articleId: null,
        scrollTop: 0,
        scrollBottom: 0,
        isNavFooter: true,
        userInfo: {},
        emojis: [],
        globalRandomStr: ''
    },
    mutations: {
        changeArticleId(state, id) {
            state.articleId = id;
        },
        changeScrollTop(state, top) {
            state.scrollTop = top;
        },
        changeScrollBottom(state, bottom) {
            state.scrollBottom = bottom;
        },
        changeUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        getEmojis(state, emojis) {
            state.emojis = emojis;
        },
        randomStr(state) {
            const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            for (let i = 0; i < 16; i++) {
                state.globalRandomStr += chars.charAt(Math.floor(Math.random() * chars.length))
            }
        }
    },
    actions: {},
    modules: {}
})