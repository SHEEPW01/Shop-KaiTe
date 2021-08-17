<template>
    <NavBar>
        <div slot="left" class="back">
            <img src="~assets/img/fanhui.png" alt="" @click="imgClick">
        </div>
        <div slot="center" class="title">
            <div v-for="(item, index) in titles" class="title-item" :class="{active: index === currentIndex}" @click="titleClick(index)">
                {{item}}
            </div>
        </div>
    </NavBar>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
        data() {
          return {
              titles: ['商品', '参数', '评论', '推荐'],
              currentIndex: 0,
          }
        },
        components: {
            NavBar,

        },
        methods: {
            titleClick(index) {
                this.currentIndex = index;
                this.$emit('titleClick', index)
            },

            imgClick() {
                this.$router.back()
            }
        }
    }
</script>

<style lang="less" scoped>

    .title {
        display: flex;
    }

    .title-item {
        flex: 1;
    }

    .active {
        color: var(--color-high-text);
    }

    .back img {
        width: 35px;
        height: 35px;
        vertical-align: middle;
    }
</style>