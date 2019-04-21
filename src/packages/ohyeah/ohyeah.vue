<template>
  <div ref="ohyeahbox"
       class="ohyeah-scroll-box">
    <!-- 纵向滚动条 -->
    <div @mousedown.stop="onTrackMousedown($event,1)"
         @mouseenter.stop="hoverH = true"
         @mouseleave.stop="hoverH = false"
         :style="`background-color:${trackColor};`"
         :class="['ohyeah-scroll-vertical-track-h',{'disabled': !isShowH},{'show': barHDown }]">
      <div @mousedown.stop="onBarMousedown($event, 1)"
           ref="ohyeahbarh"
           :style="`background-color:${thumbColor};width:${(hoverH || barHDown )? breadth + 4 : breadth}px;height: ${barHTall}px;transform: translateY(${barHScrollTop}px);border-radius:${breadth}px`"></div>
    </div>
    <!-- 横向滚动条 -->
    <div @mousedown.stop="onTrackMousedown($event,2)"
         @mouseenter.stop="hoverW = true"
         @mouseleave.stop="hoverW = false"
         :style="`background-color:${trackColor};`"
         :class="['ohyeah-scroll-vertical-track-w',{'disabled': !isShowW},{'show': barWDown }]">
      <div @mousedown.stop="onBarMousedown($event,2)"
           ref="ohyeahbarw"
           :style="`background-color:${thumbColor};height:${(hoverW || barWDown) ? breadth + 4 : breadth}px;width: ${barWTall}px;transform: translateX(${barWScrollLeft}px)`"></div>
    </div>
    <!-- 默认内容 -->
    <div ref="ohyeahbody"
         class="ohyeah-scroll-body"
         @wheel.capture.stop="onMouseWheel"
         :style="`transform:translate(-${barWScrollLeft * scaleW}px, -${barHScrollTop * scaleH}px)`">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// todo: 各种自定义：颜色V,监听方法兼容性V，外层容器大小改变时监听V,事件（到顶，到底，滚动的值），方法（设置滚动条位置），边缘检测,数量减少时滚动条位置处理
import ElementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "ohyeah-scroll",
  data() {
    return {
      observer: null, // 监听变化
      isShowH: false, // 是否显示垂直滚动条
      isShowW: false, // 是否显示横向滚动条
      bodyHover: false, // 鼠标是否在body中hover
      barHTall: 0, // 垂直滚动条bar高度
      barWTall: 0, // 横向滚动条bar高度
      barHScrollTop: 0,
      barWScrollLeft: 0,
      startBarHScrollTop: 0,
      startBarWScrollTop: 0,
      barHDown: false, // 垂直滚动条上鼠标是否按下
      barWDown: false, // 横向滚动条上鼠标是否按下
      startX: 0, // 鼠标按下时的坐标X
      startY: 0, // 鼠标按下时的坐标Y
      scaleH: 1, // 比例尺
      scaleW: 1,
      hoverH: false, // H悬浮
      hoverW: false, // W悬浮
      timer: null
    };
  },
  props: {
    breadth: { type: Number, default: 6 }, // bar宽窄
    trackColor: { type: String, default: "rgba(255, 255, 255, 0.5)" }, // 轨道背景色
    thumbColor: { type: String, default: "#7f7f7f" } // 滑块背景色
  },
  mounted() {
    console.log("slot", this.$slots, this.$refs);
    // 监听内部宽高变化，用于调整滚动条大小和位置
    this.listenResize();
    // 监听鼠标拖动事件
    document.addEventListener("mousemove", this.onBarDragMove);
    document.addEventListener("mouseup", this.onMouseUp);
    this.$refs.ohyeahbarh.add;
  },
  beforeDestroy() {
    // 卸载鼠标拖动事件
    document.removeEventListener("mousemove", this.onBarDragMove);
    if (window.ResizeObserver) {
      this.observer.disconnect();
    } else {
      this.observer.uninstall();
    }
    this.observer = null;
  },

  computed: {},
  methods: {
    // 监听容器变化
    listenResize() {
      // 如果支持ResizeObserver就用这个
      if (window.ResizeObserver) {
        this.observer = new ResizeObserver(this.callback);
        this.observer.observe(this.$refs.ohyeahbody);
        this.observer.observe(this.$refs.ohyeahbox);
      } else {
        this.observer = ElementResizeDetectorMaker({
          strategy: "scroll"
        });
        this.observer.listenTo(this.$refs.ohyeahbody, this.callback);
        this.observer.listenTo(this.$refs.ohyeahbox, this.callback);
      }
    },
    callback(msg) {
      const a = this.$refs.ohyeahbox.getBoundingClientRect(); // 外壳大小
      const b = this.$refs.ohyeahbody.getBoundingClientRect(); // body大小
      this.isShowH = b.height > a.height;
      this.isShowW = b.width > a.width;

      if (this.isShowH) {
        this.barHTall = Math.max((a.height / b.height) * (a.height - 4), 20);
      }
      if (this.isShowW) {
        this.barWTall = Math.max((a.width / b.width) * (a.width - 4), 20);
      }
      this.scaleH = (b.height - a.height) / (a.height - 4 - this.barHTall);
      this.scaleW = (b.width - a.width) / (a.width - 4 - this.barWTall);
    },
    // 滚动条上鼠标按下 1纵 2横
    onBarMousedown(e, type) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      this.barHDown = type === 1;
      this.barWDown = type === 2;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startBarHScrollTop = this.barHScrollTop;
      this.startBarWScrollTop = this.barWScrollLeft;
      console.log("鼠标按下：", this.barHDown);
    },
    // 轨道上鼠标按下
    onTrackMousedown(e, type) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      this.barHDown = type === 1;
      this.barWDown = type === 2;

      if (this.barHDown) {
        // 在上方点击
        if (this.barHScrollTop >= e.offsetY) {
          this.barHScrollTop = Math.max(e.offsetY - 6, 0);
        } else {
          this.barHScrollTop = Math.min(
            e.offsetY - this.barHTall + 6,
            this.$refs.ohyeahbox.getBoundingClientRect().height
          );
        }
      }
      if (this.barWDown) {
        // 在上方点击
        if (this.barWScrollLeft >= e.offsetX) {
          this.barWScrollLeft = Math.max(e.offsetX - 6, 0);
        } else {
          this.barWScrollLeft = Math.min(
            e.offsetX - this.barWTall + 6,
            this.$refs.ohyeahbox.getBoundingClientRect().width
          );
        }
      }
      this.onBarMousedown(e, type);
    },
    // 横向或纵向滚动条被拖拽
    onBarDragMove(e) {
      // 正在拖拽纵向滚动条
      const a = this.$refs.ohyeahbox.getBoundingClientRect(); // 外壳大小

      if (this.barHDown) {
        this.barHScrollTop = Math.min(
          Math.max(this.startBarHScrollTop + e.clientY - this.startY, 0),
          a.height - this.barHTall - 4
        );

        // this.$refs.ohyeahbox.scrollTop = this.barHScrollTop;
      }
      if (this.barWDown) {
        this.barWScrollLeft = Math.min(
          Math.max(this.startBarWScrollTop + e.clientX - this.startX, 0),
          a.width - this.barWTall - 4
        );
        // this.$refs.ohyeahbox.scrollLeft = this.barWScrollLeft;
      }
    },
    // 鼠标抬起
    onMouseUp() {
      console.log("鼠标抬起");
      this.barHDown = this.barWDown = false;
    },
    //鼠标滚轮事件
    onMouseWheel(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      // 节流
      if (this.timer) {
        return;
      }
      this.timer = setTimeout(() => {
        const a = this.$refs.ohyeahbox.getBoundingClientRect(); // 外壳大小
        if (this.isShowH) {
          this.barHScrollTop = Math.min(
            Math.max(this.barHScrollTop + e.deltaY / 5, 0),
            a.height - this.barHTall - 4
          );
        }
        if (this.isShowW) {
          this.barWScrollLeft = Math.min(
            Math.max(this.barWScrollLeft + e.deltaX / 5, 0),
            a.width - this.barWTall - 4
          );
        }
        this.timer = null;
      });
    }
  }
};
</script>
<style lang="scss">
.ohyeah-scroll-box {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  &:hover {
    .ohyeah-scroll-vertical-track-h,
    .ohyeah-scroll-vertical-track-w {
      opacity: 1;
    }
  }
  .disabled {
    visibility: hidden;
    pointer-events: none;
  }

  .ohyeah-scroll-vertical-track-h {
    position: absolute;
    box-sizing: border-box;
    // width: auto;
    height: 100%;
    padding: 2px;
    right: 0;
    top: 0;
    z-index: 10;
    cursor: pointer;
    opacity: 0;
    transition: opacity 200ms, width 200ms;
    &.show {
      opacity: 1;
    }
    & > div {
      border-radius: 999px;
      transition: height 200ms, width 200ms;
    }
  }
  .ohyeah-scroll-vertical-track-w {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    padding: 2px;
    bottom: 0;
    left: 0;
    z-index: 9;
    cursor: pointer;
    opacity: 0;
    transition: opacity 200ms, width 200ms;
    &.show {
      opacity: 1;
    }
    & > div {
      border-radius: 999px;
      transition: height 200ms, width 200ms;
    }
  }
  .ohyeah-scroll-body {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    min-width: 100%;
  }
}
</style>

