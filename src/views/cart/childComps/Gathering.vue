<template>
    <div class="gathering">
        <div>
            <span class="off" @click="offPay">取消支付</span>
<!--            <span>{{time}}秒后自动取消支付</span>-->
            <img src="~assets/gathering.jpg" class="img">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Gathering",
        data() {
          return {
              time: 180
          }
        },
        methods: {
            offPay() {
                this.$emit('offPay')
                this.time = 180
            },
        }
    }
</script>

<style scoped>
    .gathering {
        /*块居中*/
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
        width: 300px;
        height: 300px;
        margin: 250px auto;
        z-index: 10;
    }

    .img {
        height: 300px;
        width: 300px;
    }

    .off {
        width: 75px;
        height: 20px;
        padding-top: 3px;
        text-align: center;
        position: fixed;
        background-color: lightgrey;
        margin: 10px  30px  0;
    }
</style>