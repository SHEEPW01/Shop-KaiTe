<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="Isactive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :class="{active: Isactive}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
          path:String
        },
        data() {
          return {
             // Isactive: false,
          }
        },
        computed: {
          Isactive() {
            return this.$route.path.indexOf(this.path) !== -1
          }
        },
        methods: {
            itemClick() {
              this.$router.replace(this.path)
            }
        }
    }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  .active{
    color: red;
  }
</style>
