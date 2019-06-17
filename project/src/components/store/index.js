import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state: { //状态集合
        id: '', //返回的ID
        cldSessionId: '',//返回的cldSessionId
    },
    mutations: { //突变集合
        SET_ID: (state, id) => {
            state.id = id;
        },
        SET_cldSessionId: (state, cldSessionId) => {
            state.cldSessionId = cldSessionId;
        },
    },
    actions: { //操作集合
        setId({ commit }, id) {
            commit('SET_ID', id)
        },
        setCldSessionId({ commit }, cldSessionId) {
            commit('SET_cldSessionId', cldSessionId)
        },
    },
    getters: { //显示集合
        getId: state => state.id,
        getCldSessionId: state => state.cldSessionId,
        // getName: state => {
        //     if (state.name) {
        //         return state.name;
        //     } else {
        //         return sessionStorage.getItem('user');
        //     }
        // }, //顶部用户名显示
        // getCode: state => state.code, //用户中心向订单详情发送的订单编号
        // getheadX: state => state.headX, //用户头像
        // // getPd: state => state.pd, //用户密码
        // getEvaldetail: state => state.evaldetail, //用户评价传参
        // getwxNum: state => state.wxnum, //微信购物车数量
        // getRegionId: state => state.regionId,
    }

})