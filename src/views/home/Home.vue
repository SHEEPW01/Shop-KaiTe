<template>
    <div id="home">
        <NavBar class="home-nav"><div slot="center">购物商城</div></NavBar>
        <TabControl :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="tabFixed" v-show="IsShowTab"></TabControl>
        <Scroll class="content" ref="scroll" :property1="3" @GetPosition="GetPosition" @pullingUp="LoadMore" :pullUpLoad1="true">
            <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
            <recommend-view :recommends="recommends"></recommend-view>
            <FeatureView></FeatureView>
            <TabControl :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></TabControl>
            <GoodsList :goods="goods[currentType].list"></GoodsList>
        </Scroll>

        <BackTop @click.native="topClick" v-show="IsShow"></BackTop>
    </div>
</template>

<script>
    import {getHomeMultiData, getHomegoods} from "network/home";

    import NavBar from "../../components/common/navbar/NavBar";
    import Scroll from "../../components/common/scroll/Scroll";
    import TabControl from "../../components/content/tabControl/TabControl";
    import GoodsList from "../../components/content/goods/GoodsList";
    import BackTop from "../../components/content/backTop/BackTop";

    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";
    import HomeSwiper from "./childComps/HomeSwiper";

    import {imgRefrashMixin} from "../../common/mixins";

    export default {
        name: "Home",
        mixins: [imgRefrashMixin],
        components: {
            NavBar,
            Scroll,
            TabControl,
            GoodsList,
            BackTop,
            RecommendView,
            FeatureView,
            HomeSwiper,

        },
        data() {
            return {
                // result: null
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentType: 'pop',
                IsShow: false,
                IsShowTab: false,
                saveY: 0,
            }
        },
        created() {
            this.getHomeMultiData();
            this.getHomegoods('pop');
            this.getHomegoods('new');
            this.getHomegoods('sell');

        },
        // mounted() {
        //     const refresh = this.debounce(this.$refs.scroll.refresh1, 50)
        //     this.$bus.$on('ItemImgLoad', () => {
        //         // this.$refs.scroll.refresh1();
        //         refresh()
        //     })
        // },
        activated() {
            this.$refs.scroll.refresh1();
            this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0);
        },

        deactivated() {
            this.saveY = this.$refs.scroll.scroll.y
        },
        methods: {
            /**
             *  事件监听相关方法
             */
            // debounce(func, delay) {
            //   let timer = null;
            //   return function (...args) {
            //       if (timer) clearTimeout(timer);
            //       timer = setTimeout(() => {
            //           func.apply(this, args)
            //       },delay)
            //   }
            // },

            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break;
                    case 1:
                        this.currentType = 'new'
                        break;
                    case 2:
                        this.currentType = 'sell'
                        break;
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },

            swiperImgLoad() {
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
                // console.log(this.tabOffsetTop);
            },

            topClick() {
                this.$refs.scroll.ScrolltopClick(0, 0)
            },

            GetPosition(position) {
                this.IsShow = (-position.y) > 500;
                this.IsShowTab = (-position.y) > this.tabOffsetTop;
            },

            LoadMore() {
                this.getHomegoods(this.currentType);
            },
            /**
             *  网络请求相关方法
             */
            getHomeMultiData() {
                //    1，请求多个数据
                getHomeMultiData().then(res => {
                    // this.result = res
                    this.banners = res.data.data.banner.list;
                    this.recommends = res.data.data.recommend.list;
                })
            },

            getHomegoods(type) {
                //    2.请求商品数据
                const page = this.goods[type].page + 1
                getHomegoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.data.list)
                    this.goods[type].page += 1;
                    this.$refs.scroll.finishPullUp1();
                })
            }
        },
        destroyed() {

        }
    }
</script>

<style scoped>
    #home {
        /*padding-top: 44px;*/
        position: relative;
        height: 100vh;
    }

    .home-nav {
        background-color: pink;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }

    /*.tab-control {*/
    /*    position: sticky;*/
    /*    top: 41px;*/
    /*    background-color: #eeeeee;*/
    /*    z-index: 9;*/
    /*}*/

    .tabFixed {
        position: relative;
        top: 44px;
        z-index: 9;
        background-color: #fff;
    }

    .content {
        position: absolute;
        overflow: hidden;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>
