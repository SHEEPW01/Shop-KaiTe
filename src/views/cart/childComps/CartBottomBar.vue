<template>
    <div class="cart-bot-bar flex">
        <div><input type="checkbox" class="check" :class="{active: IsShowCheck}" @click="checkClick">全部</div>
        <div>合计：{{totalPrice}}</div>
        <div @click="EmitCloseAccount" class="account">去结算({{checkLength}})</div>
    </div>
</template>

<script>
    export default {
        name: "CartBottomBar",
        data() {
          return {
              IsShowCheck: true
          }
        },
        mounted() {
            this.$bus.$on('OnIsCheck', data => {
                this.IsShowCheck = data
            })
        },
        computed: {
            totalPrice() {
                return '￥' + this.$store.state.cartList.filter(item => {
                    return item.checked
                }).reduce((previousValue, item) => {
                    return previousValue + item.price * item.count
                }, 0).toFixed(2)
            },

            checkLength() {
                return this.$store.state.cartList.filter(item => {
                    return item.checked
                }).length
            }
        },
        methods: {
            checkClick() {
                if(this.IsShowCheck) {
                    this.$store.state.cartList.forEach(item => item.checked = false)
                    this.IsShowCheck = false
                }
                else {
                    this.$store.state.cartList.forEach(item => item.checked = true)
                    this.IsShowCheck = true
                }
            },

            EmitCloseAccount() {
                this.$emit('CloseAccount')
            }
        }
    }
</script>

<style lang="less" scoped="scoped">
    .account{
        background-color: red;
        padding: 12px  10px 10px;
        color: #f2f5f8;
    }

    .cart-bot-bar {
        position: fixed;
        bottom: 49px;
        left:0;
        right: 0;
        height: 40px;
        padding: 0 10px;
        font-size: 13px;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        border-bottom: 1px solid #ececec;
        border-top: 1px solid #ececec;
        .check {
            width: 18px;
            height: 18px;
            overflow: hidden;
            border-radius: 100%;
            vertical-align: bottom;
            border: 1px solid #ececec;
        }
        .active {
            border: 1px solid var(----color-high-text);
            background: url(~assets/img/detail/check_active.png) no-repeat center;
            background-size: cover;
        }
    }
</style>