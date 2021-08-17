<template>
    <div class="toast" v-show="IsShowToast">
        <div class="message">{{message}}</div>
    </div>
</template>

<script>
    export default {
        name: "toast",
        props: {
            message: {
                type: String,
                default() {
                    return ''
                }
            },
            IsShowToast: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        }
    }
</script>

<style scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        color: #fff;
        text-align: center;
        background-color: grey;
        z-index: 10;
        transform: translate(-50%, -50%);
        padding: 8px 10px;
        border-radius: 3%;
        width: 50%;
        height: 30%;
        opacity:0.6
    }

    .message {
        position: fixed;
        top: 45%;
        bottom: 50%;
        right: 10%;
        left: 10%;
    }
</style>