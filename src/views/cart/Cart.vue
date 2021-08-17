<template>
    <div>
        <NavBar  class="nav-bar">
            <div slot="center">购物车({{cattLength}})</div>
        </NavBar>
        <CartList></CartList>
        <CartBottomBar @CloseAccount=CloseAccount ></CartBottomBar>
        <Toast :message="message" :IsShowToast="IsShowToast"></Toast>
        <Gathering v-show="IsShowAccount" @offPay="offPay" ref="Gathering"></Gathering>
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import Toast from "../../components/common/Toast";

    import CartList from "./childComps/CartList";
    import CartBottomBar from "./childComps/CartBottomBar";
    import Gathering from "./childComps/Gathering";
    export default {
        name: "Cart",
        components: {
            NavBar,
            Toast,
            CartList,
            CartBottomBar,
            Gathering,
        },
        data() {
          return {
              IsShowToast: false,
              message: '',
              IsShowAccount: false
          }
        },
        computed: {
            cattLength() {
                return this.$store.state.cartList.length
            }
        },
        methods: {
            CloseAccount() {
                // console.log(!(this.$store.state.cartList.find(item => item.checked == true)))
                if(!(this.$store.state.cartList.find(item => item.checked == true))) {
                    this.message = '请添加商品到购物车'
                    this.IsShowToast = true
                    setTimeout(() => {
                        this.message = ''
                        this.IsShowToast = false
                    }, 2000)

                }
                else {
                    //结算
                    this.IsShowAccount = true
                    // this.$refs.Gathering.setTime()
                    setTimeout(() => {
                        this.IsShowAccount = false
                    },3000)
                }
            },

            offPay() {
                this.IsShowAccount = false
            }
        }
    }
</script>

<style scoped>
    .nav-bar {
        background-color: var(--color-high-text);
        color: #fff;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 9;
    }
</style>
