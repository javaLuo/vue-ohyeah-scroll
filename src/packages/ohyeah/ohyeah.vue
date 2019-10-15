<template>
  <div :ref="`ohyeahbox-${id}`"
       :style="`width:${theWidth};height:${theHeight}`"
       class="ohyeah-scroll-box">
    <!-- 纵向滚动条 -->
    <div v-if="!noVer"
         @mousedown.stop="onTrackMousedown($event,1)"
         @mouseenter.stop="hoverH = true"
         @mouseleave.stop="hoverH = false"
         :style="`background-color:${trackColor};opacity:${autoHide? 0 : 0.8}`"
         :class="['ohyeah-scroll-vertical-track-h',{'disabled': !isShowH},{'show': barHDown },{'left': left}]">
      <div @mousedown.stop="onBarMousedown($event, 1)"
           :ref="`ohyeahbarh-${id}`"
           :style="`transition:width 250ms,height 250ms;background-color:${thumbColor};width:${(hoverH || barHDown )? breadth + 4 : breadth}px;height: ${barHTall}px;transform: translateY(${barHScrollTop}px);border-radius:${breadth}px`" />
    </div>
    <!-- 横向滚动条 -->
    <div v-if="!noHor"
         @mousedown.stop="onTrackMousedown($event,2)"
         @mouseenter.stop="hoverW = true"
         @mouseleave.stop="hoverW = false"
         :style="`background-color:${trackColor};opacity:${autoHide? 0 : 0.8}`"
         :class="['ohyeah-scroll-vertical-track-w',{'disabled': !isShowW},{'show': barWDown },{'top': top}]">
      <div @mousedown.stop="onBarMousedown($event,2)"
           :ref="`ohyeahbarw-${id}`"
           :style="`transition:height 250ms,width 250ms;background-color:${thumbColor};height:${(hoverW || barWDown) ? breadth + 4 : breadth}px;width: ${barWTall}px;transform: translateX(${barWScrollLeft}px)`" />
    </div>
    <!-- 默认内容 -->
    <div :ref="`ohyeahbody-${id}`"
         class="ohyeah-scroll-body"
         tabindex="9999"
         :style="`${noVer ? 'height:100%;overflow-y:hidden;' : ''} ${noHor ? 'width:100%;overflow-x:hidden;' : ''}`"
         @scroll="onScrollEvent">
      <div :ref="`ohyeahbodylistener-${id}`">
        <slot></slot>
      </div>
    </div>

  </div>
</template>
<script>
import ElementResizeDetectorMaker from "element-resize-detector";
let canEmited = 1;
export default {
  name: "ohyeah",
  data() {
    return {
      isMobile: false,
      observer: null, // 监听变化
      isShowH: false, // 是否显示垂直滚动条
      isShowW: false, // 是否显示横向滚动条,
      trickH: 0, // 轨道高 = box高 - padding的4px
      trickW: 0, // 轨道宽
      barHTall: 0, // 垂直滚动条bar高度
      barWTall: 0, // 横向滚动条bar高度
      barHScrollTop: 0, // 滚动条移动的距离Y
      barWScrollLeft: 0, // 滚动条移动的距离X
      startBarHScrollTop: 0, // 滚动条上一次的位置Y
      startBarWScrollLeft: 0, // 滚动条上一次的位置X
      barHDown: false, // 垂直滚动条上鼠标是否按下
      barWDown: false, // 横向滚动条上鼠标是否按下
      startX: 0, // 鼠标按下时的坐标X
      startY: 0, // 鼠标按下时的坐标Y
      scaleH: 0, // 比例尺
      scaleW: 0,
      hoverH: false, // H悬浮
      hoverW: false, // W悬浮
      timer: 0
    };
  },
  props: {
    id: { type: [String, Number], default: () => Date.now() + Math.random() },
    noVer: { type: Boolean, default: false }, // 是否禁用垂直滚动条
    noHor: { type: Boolean, default: false }, // 是否禁用横向滚动条
    left: { type: Boolean, default: false }, // 垂直滚动条是否依附于容器左边
    top: { type: Boolean, default: false }, // 横向滚动条是否依附于容器顶部
    breadth: { type: Number, default: 6 }, // bar宽窄
    trackColor: { type: String, default: "transparent" }, // 轨道背景色
    thumbColor: { type: String, default: "#7f7f7f" }, // 滑块背景色
    autoHide: { type: Boolean, default: true }, // 是否自动隐藏滚动条
    minLength: { type: Number, default: 20 }, // 滑块最小长度
    width: { type: [Number, String], default: "100%" }, // ohyeah容器宽度
    height: { type: [Number, String], default: "100%" }, // ohyeah容器高度
    resizeObject: { type: Boolean, default: false } // resize模式，默认scroll
  },
  mounted() {
    // 监听内部宽高变化，用于调整滚动条大小和位置
    this.isMobile = /(android)|(iphone)|(symbianos)|(windows phone)|(ipad)|(ipod)/.test(
      navigator.userAgent.toLowerCase()
    );
    this.callback();
    this.listenResize();
    // 监听鼠标拖动事件
    document.addEventListener("mousemove", this.onBarDragMove);
    document.addEventListener("mouseup", this.onMouseUp);
  },
  beforeDestroy() {
    // 卸载鼠标拖动事件
    if (this.isMobile) {
      return;
    }
    document.removeEventListener("mousemove", this.onBarDragMove);
    document.removeEventListener("mouseup", this.onMouseUp);

    if (window.ResizeObserver) {
      this.observer.disconnect();
    } else {
      this.observer.uninstall(this.$refs[`ohyeahbody-${this.id}`]);
    }
    this.observer = null;
  },

  computed: {
    realShowH() {
      return this.isShowH && !this.noVer;
    },
    realShowW() {
      return this.isShowW && !this.noHor;
    },
    theWidth() {
      return Number(this.width) ? `${this.width}px` : this.width;
    },
    theHeight() {
      return Number(this.height) ? `${this.height}px` : this.height;
    }
  },
  watch: {
    noVer(newV) {
      if (newV) {
        const dom = this.$refs[`ohyeahbody-${this.id}`];
        this.barHScrollTop = 0;
        this.scaleH = 0;
        dom.scrollTop = 0;
      } else {
        this.callback();
      }
    },
    noHor(newV) {
      if (newV) {
        const dom = this.$refs[`ohyeahbody-${this.id}`];
        this.barWScrollLeft = 0;
        this.scaleW = 0;
        dom.scrollLeft = 0;
      } else {
        this.callback();
      }
    },
    // 监听到顶和到底事件, 数值 canEmited是为了解决safari回弹效果会多次触发事件
    barHScrollTop(newV) {
      if (newV < 0 || newV > this.trickH - this.barHTall) {
        return;
      }
      const dom = this.$refs[`ohyeahbody-${this.id}`];
      if (canEmited) {
        if (newV === 0) {
          canEmited = false;
          this.$emit("onVerStart", dom);
        } else if (newV === this.trickH - this.barHTall) {
          this.$emit("onVerEnd", dom);
          canEmited = false;
        }
      } else {
        canEmited = true;
      }
      this.$emit("onScroll", dom);
    },

    // 监听到左和到右事件
    barWScrollLeft(newV) {
      if (newV < 0 || newV > this.trickW - this.barWTall) {
        return;
      }
      const dom = this.$refs[`ohyeahbody-${this.id}`];
      if (canEmited) {
        if (newV === 0) {
          canEmited = false;
          this.$emit("onHorStart", dom);
        } else if (newV === this.trickW - this.barWTall) {
          canEmited = false;
          this.$emit("onHorEnd", dom);
        }
      } else {
        canEmited = true;
      }

      this.$emit("onScroll", dom);
    }
  },
  methods: {
    /**
     * 监听滚动条滚动事件
     * 原生滚动条为主，模拟滚动条跟随原生滚动条位置
     * 这里不做节流，需要灵敏
     * **/
    onScrollEvent() {
      const dom = this.$refs[`ohyeahbody-${this.id}`];
      if (this.realShowH) {
        this.barHScrollTop = dom.scrollTop / this.scaleH;
      }
      if (this.realShowW) {
        this.barWScrollLeft = dom.scrollLeft / this.scaleW;
      }
    },

    // 监听容器变化
    listenResize() {
      // 如果支持ResizeObserver就用这个
      if (window.ResizeObserver) {
        this.observer = new ResizeObserver(this.callback);
        this.observer.observe(this.$refs[`ohyeahbody-${this.id}`]);
        this.observer.observe(this.$refs[`ohyeahbodylistener-${this.id}`]);
      } else {
        this.observer = ElementResizeDetectorMaker(
          this.resizeObject ? null : { strategy: "scroll" }
        );
        this.observer.listenTo(
          this.$refs[`ohyeahbody-${this.id}`],
          this.callback
        );
        this.observer.listenTo(
          this.$refs[`ohyeahbodylistener-${this.id}`],
          this.callback
        );
      }
    },

    /**
     * 容器大小变化后的回调函数
     * 重置是否显示滚动条
     * 重置比例尺
     * 重置轨道高度
     * 重置滑块高度
     * 重置真实滚动条位置
     * **/
    callback() {
      console.log("变化了");
      const dom = this.$refs[`ohyeahbody-${this.id}`];
      const b = dom.getBoundingClientRect(); // boxbody大小
      this.trickH = b.height - 4; // 轨道长度 = box高度 - 上下padding一共4px
      this.trickW = b.width - 4;

      this.isShowH = dom.scrollHeight > dom.clientHeight; // 真实内容高度 > 容器高度，就显示滚动条
      this.isShowW = dom.scrollWidth > dom.clientWidth;

      if (this.realShowH) {
        // 滚动条的高度 = 真实容器可见高度/真实总高度 * 轨道高度
        this.barHTall = Math.max(
          (dom.clientHeight / dom.scrollHeight) * this.trickH,
          this.minLength > dom.clientHeight ? 0 : this.minLength
        );
        // 比例尺 = （真实高度 - 容器高度）/ （轨道高度 - 滚动条高度）
        this.scaleH =
          (dom.scrollHeight - dom.clientHeight) / (this.trickH - this.barHTall);
        this.barHScrollTop = Math.min(
          Math.max(dom.scrollTop / this.scaleH, 0),
          this.trickH - this.barHTall
        );
      } else {
        this.scaleH = 0;
        dom.scrollTop = 0;
      }
      if (this.realShowW) {
        this.barWTall = Math.max(
          (dom.clientWidth / dom.scrollWidth) * this.trickW,
          this.minLength > dom.clientWidth ? 0 : this.minLength
        );
        this.scaleW =
          (dom.scrollWidth - dom.clientWidth) / (this.trickW - this.barWTall);
        this.barWScrollLeft = Math.min(
          Math.max(dom.scrollLeft / this.scaleW, 0),
          this.trickW - this.barWTall
        );
        dom.scrollLeft = this.barWScrollLeft * this.scaleW;
      } else {
        this.scaleW = 0;
        dom.scrollLeft = 0;
      }
    },

    /**
     * 鼠标在滑块上按下
     * @parame e 事件对象，为了得到当前鼠标在滑块上的位置
     * @params type 1垂直滚动条，2水平滚动条
     * **/
    onBarMousedown(e, type) {
      e.preventDefault();
      e.stopImmediatePropagation();

      this.barHDown = type === 1;
      this.barWDown = type === 2;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startBarHScrollTop = this.barHScrollTop; // 记录当前滚动条的位置
      this.startBarWScrollLeft = this.barWScrollLeft;
    },

    /**
     * 轨道上鼠标按下
     * @param e 事件对象
     * @param type 1垂直滚动条/2水平滚动条
     * **/
    onTrackMousedown(e, type) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const dom = this.$refs[`ohyeahbody-${this.id}`];

      this.$nextTick(() => {
        if (type === 1) {
          // 在上方点击 这里不能用temp
          if (this.barHScrollTop >= e.offsetY) {
            this.barHScrollTop = Math.max(e.offsetY - 6, 0);
          } else {
            this.barHScrollTop = Math.min(
              e.offsetY - this.barHTall + 2,
              this.trickH - this.barHTall
            );
          }
          dom.scrollTop = this.barHScrollTop * this.scaleH;
        }
        if (type === 2) {
          // 在左方点击
          if (this.barWScrollLeft >= e.offsetX) {
            this.barWScrollLeft = Math.max(e.offsetX - 6, 0);
          } else {
            this.barWScrollLeft = Math.min(
              e.offsetX - this.barWTall + 2,
              this.trickW - this.barWTall
            );
          }
          dom.scrollLeft = this.barWScrollLeft * this.scaleW;
        }
        // 为了按下后直接拖动时的位置校准
        this.onBarMousedown(e, type);
      });
    },

    // 横向或纵向滚动条被拖拽
    onBarDragMove(e) {
      const dom = this.$refs[`ohyeahbody-${this.id}`];
      if (this.barHDown) {
        if (!this.timer) {
          requestAnimationFrame(() => {
            const temp = Math.min(
              Math.max(this.startBarHScrollTop + e.clientY - this.startY, 0),
              this.trickH - this.barHTall
            );
            dom.scrollTop = temp * this.scaleH;
            this.timer = 0;
          });
          this.timer = 1;
        }
      } else if (this.barWDown) {
        if (!this.timer) {
          requestAnimationFrame(() => {
            const temp = Math.min(
              Math.max(this.startBarWScrollLeft + e.clientX - this.startX, 0),
              this.trickW - this.barWTall
            );
            dom.scrollLeft = temp * this.scaleW;
            this.timer = 0;
          });
          this.timer = 1;
        }
      }
    },

    // 鼠标抬起
    onMouseUp() {
      this.barHDown = this.barWDown = false;
    },

    /**
     * 滚动到指定位置
     * @param x 水平真实滚动距离，null保持不变/'end'滚到底
     * @param y 垂直真实滚动距离，null保持不变/'end'滚到底
     * @param time 滚动消耗的时间ms
     * **/
    scrollTo(x, y, time = 0) {
      const dom = this.$refs[`ohyeahbody-${this.id}`];
      const s_y =
        y === "end"
          ? dom.scrollHeight - dom.clientHeight
          : y && this.scaleH > 0
          ? y
          : 0;
      const s_x =
        x === "end"
          ? dom.scrollWidth - dom.clientWidth
          : x && this.scaleW > 0
          ? x
          : 0;

      if (this.realShowH && (y || y === 0)) {
        // const temp = Math.min(Math.max(s_y, 0), this.trickH - this.barHTall);
        dom.scrollTop = s_y;
      }
      if (this.realShowW && (x || x === 0)) {
        // const temp = Math.min(Math.max(s_x, 0), this.trickW - this.barWTall);
        dom.scrollLeft = s_x;
      }
    },
    /**
     * 手动获取当前dom信息
     * **/
    getScrollInfo() {
      const dom = this.$refs[`ohyeahbody-${this.id}`];
      return {
        height: dom.clientHeight,
        width: dom.clientWidth,
        clientHeight: dom.clientHeight,
        clientWidth: dom.clientWidth,
        offsetHeight: dom.offsetHeight,
        offsetWidth: dom.offsetWidth,
        scrollTop: dom.scrollTop,
        scrollLeft: dom.scrollLeft,
        scrollHeight: dom.scrollHeight,
        scrollWidth: dom.scrollWidth
      };
    }
  }
};
</script>
<style lang="less">
.ohyeah-scroll-box {
  position: relative;
  overflow: hidden;
  outline: none;
  .ohyeah-scroll-body {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    outline: none;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &.mobile {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  &:hover {
    & > .ohyeah-scroll-vertical-track-h,
    & > .ohyeah-scroll-vertical-track-w {
      opacity: 1 !important;
    }
  }

  .disabled {
    visibility: hidden;
    pointer-events: none;
  }

  .ohyeah-scroll-vertical-track-h {
    position: absolute;
    box-sizing: border-box;
    height: 100%;
    right: 0;
    top: 0;
    z-index: 10;
    padding: 2px;
    cursor: pointer;
    transition: opacity 200ms, width 200ms;
    &.show {
      opacity: 1 !important;
    }
    &.left {
      left: 0;
      right: auto;
    }
    & > div {
      border-radius: 999px;
    }
  }
  .ohyeah-scroll-vertical-track-w {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 9;
    padding: 2px;
    cursor: pointer;
    transition: opacity 200ms, height 200ms;
    &.show {
      opacity: 1 !important;
    }
    &.top {
      top: 0;
      bottom: auto;
    }
    & > div {
      border-radius: 999px;
    }
  }
}
</style>

