<template>
    <div class="wrapper1" ref="cai">
        <div class="content">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll";
    export default {
        name: "Scroll",
        data() {
            return {
                scroll: null,
            }
        },
        props: {
            property1: {
                type: Number,
                default: 0,
            },
            pullUpLoad1: {
                type: Boolean,
                default: false,
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.cai, {
                click: true,
                probeType: this.property1,
                pullUpLoad: this.pullUpLoad1,
            });

            this.scroll.on('scroll', (position) => {
                this.$emit('GetPosition', position)
            });

            this.scroll.on('pullingUp',() => {
                this.$emit('pullingUp');
            })
        },
        methods: {
            ScrolltopClick(x, y, time=500) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp1() {
                this.scroll && this.scroll.finishPullUp()
            },
            refresh1() {
                this.scroll && this.scroll.refresh()
            }
        }
    }
</script>

<style scoped>

</style>