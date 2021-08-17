<template>
    <div class="cart-list-wrap">
        <CartListItem :cart-list="cartList" ></CartListItem>
    </div>
</template>

<script>
    import CartListItem from "./CartListItem";
    export default {
        name: "CartList",
        components: {
            CartListItem,
        },
        data() {
            return {
                cartList: this.$store.state.cartList
            }
        }
    }
</script>

<style scoped>
    .cart-list-wrap {
        position: relative;
        top: 44px;
        bottom: 89px;
        background-color: #fff;
    }
</style>