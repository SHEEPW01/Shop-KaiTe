import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
    state: {
        cartList: [],
    },
    mutations: {

    },
    actions: {
        addCart(context, payload){
            return new Promise((resolve, reject) => {
                let oldProduct = context.state.cartList.find(function (item) {
                    return item.iid === payload.iid
                })
                if(oldProduct) {
                    oldProduct.count += 1;
                    resolve('当前商品数量+1')
                }
                else {
                    payload.count = 1;
                    payload.checked = true;
                    context.state.cartList.push(payload)
                    resolve('添加了新的商品')
                }
            })
        }
    }
})

//3.挂载到Vue实例上
export default store