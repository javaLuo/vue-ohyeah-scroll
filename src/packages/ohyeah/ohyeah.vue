<template>
  <div :ref="`ohyeahbox-${id}`"
       :style="`width:${theWidth};height:${theHeight}`"
       class="ohyeah-scroll-box">
    <!-- 纵向滚动条 -->
    <div v-if="!noVer && !isMobile"
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
    <div v-if="!noHor && !isMobile"
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
         :class="['ohyeah-scroll-body',{'isPc': !isMobile},{'isSmooth': needSmooth}]"
         :style="`${noVer ? 'height:100%;overflow-y:hidden;' : ''} ${noHor ? 'width:100%;overflow-x:hidden;' : ''}`"
         tabindex="9999"
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
  name: "Ohyeah",
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
      timer: 0, // 节流所使用的timer
      reqTimer: null, // requestAnimationFrame所使用的timer
      needSmooth: true, // 是否需要平滑滚动 鼠标拖拽滑块时不需要，其他时候需要
      isBehavior: false // 是否支持原生平滑滚动
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
    // 是否为移动端
    this.isMobile = /(android)|(iphone)|(symbianos)|(windows phone)|(ipad)|(ipod)/.test(
      navigator.userAgent.toLowerCase()
    );
    // 是否支持原生平滑滚动,chrome/firefox/opera支持
    this.isBehavior = "scroll-behavior" in document.body.style;

    // 监听内部宽高变化，用于调整滚动条大小和位置
    this.callback();
    this.listenResize();

    if (!this.isMobile) {
      // 监听鼠标拖动事件
      document.addEventListener("mousemove", this.onBarDragMove, false);
      document.addEventListener("mouseup", this.onMouseUp, false);
    }
  },
  beforeDestroy() {
    // 卸载鼠标拖动事件
    if (!this.isMobile) {
      document.removeEventListener("mousemove", this.onBarDragMove, false);
      document.removeEventListener("mouseup", this.onMouseUp, false);
    }

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
      const p = {
        offsetHeight: dom.offsetHeight,
        offsetWidth: dom.offsetWidth,
        clientHeight: dom.clientHeight,
        clientWidth: dom.clientWidth,
        scrollHeight: dom.scrollHeight,
        scrollWidth: dom.scrollWidth,
        scrollTop: dom.scrollTop,
        scrollLeft: dom.scrollLeft
      };
      if (canEmited) {
        if (newV === 0) {
          canEmited = false;
          this.$emit("onVerStart", p, dom);
        } else if (newV === this.trickH - this.barHTall) {
          this.$emit("onVerEnd", p, dom);
          canEmited = false;
        }
      } else {
        canEmited = true;
      }
      this.$emit("onScroll", p, dom);
    },

    // 监听到左和到右事件
    barWScrollLeft(newV) {
      if (newV < 0 || newV > this.trickW - this.barWTall) {
        return;
      }
      const dom = this.$refs[`ohyeahbody-${this.id}`];
      const p = {
        offsetHeight: dom.offsetHeight,
        offsetWidth: dom.offsetWidth,
        clientHeight: dom.clientHeight,
        clientWidth: dom.clientWidth,
        scrollHeight: dom.scrollHeight,
        scrollWidth: dom.scrollWidth,
        scrollTop: dom.scrollTop,
        scrollLeft: dom.scrollLeft
      };
      if (canEmited) {
        if (newV === 0) {
          canEmited = false;
          this.$emit("onHorStart", p, dom);
        } else if (newV === this.trickW - this.barWTall) {
          canEmited = false;
          this.$emit("onHorEnd", p, dom);
        }
      } else {
        canEmited = true;
      }

      this.$emit("onScroll", p, dom);
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
     * @params targetNum 目标位置，用于在轨道上点击时瞬间记录最终位置，因为滚动可能为平滑滚动
     * **/
    onBarMousedown(e, type, targetNum) {
      e.preventDefault();
      // 是否来自点击轨道，点击轨道需要保持平滑
      const isTargetSmooth = targetNum || targetNum === 0;
      // 非轨道点击 或 是轨道点击但不支持原生滚动（会启动动画，不需要smooth）
      if (!isTargetSmooth || (isTargetSmooth && !this.isBehavior)) {
        this.needSmooth = false;
      }

      this.barHDown = type === 1;
      this.barWDown = type === 2;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startBarHScrollTop =
        this.barHDown && isTargetSmooth ? targetNum : this.barHScrollTop; // 记录当前滚动条的位置
      this.startBarWScrollLeft =
        this.barWDown && isTargetSmooth ? targetNum : this.barWScrollLeft;
    },

    /**
     * 轨道上鼠标按下
     * @param e 事件对象
     * @param type 1垂直滚动条/2水平滚动条
     * **/
    onTrackMousedown(e, type) {
      e.preventDefault();
      // this.needSmooth = false;
      const dom = this.$refs[`ohyeahbody-${this.id}`];
      let temp;
      this.$nextTick(() => {
        let targetNum;
        if (type === 1) {
          // 在上方点击 这里不能用temp
          if (this.barHScrollTop >= e.offsetY) {
            temp = Math.max(e.offsetY - 6, 0);
          } else {
            temp = Math.min(
              e.offsetY - this.barHTall + 2,
              this.trickH - this.barHTall
            );
          }

          if (this.isBehavior) {
            dom.scrollTop = temp * this.scaleH;
          } else {
            targetNum = temp * this.scaleH;
            // 步进值 / 15 约等于 256ms
            cancelAnimationFrame(this.reqTimer);
            this.smoothScrollTo(
              "scrollTop",
              dom,
              targetNum,
              (targetNum - dom.scrollTop) / 15
            );
          }
        }
        if (type === 2) {
          // 在左方点击
          if (this.barWScrollLeft >= e.offsetX) {
            temp = Math.max(e.offsetX - 6, 0);
          } else {
            temp = Math.min(
              e.offsetX - this.barWTall + 2,
              this.trickW - this.barWTall
            );
          }

          if (this.isBehavior) {
            dom.scrollLeft = temp * this.scaleW;
          } else {
            targetNum = temp * this.scaleW;
            cancelAnimationFrame(this.reqTimer);
            this.smoothScrollTo(
              "scrollLeft",
              dom,
              targetNum,
              (targetNum - dom.scrollLeft) / 15
            );
          }
        }
        // 为了按下后直接拖动时的位置校准
        this.onBarMousedown(e, type, temp);
      });
    },

    /**
     * 横向或纵向滚动条被拖拽
     * @param e 拖动时的事件对象，为了实时获取鼠标位置
     * **/
    onBarDragMove(e) {
      const dom = this.$refs[`ohyeahbody-${this.id}`];

      if (this.barHDown) {
        this.needSmooth = false;
        if (!this.timer) {
          cancelAnimationFrame(this.reqTimer);
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
        this.needSmooth = false;
        if (!this.timer) {
          cancelAnimationFrame(this.reqTimer);
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
      this.needSmooth = true;
    },

    /**
     * 平滑scrollTo
     * @param type scrollTop/scrollLeft
     * @param dom DOM对象
     * @param targetNum 目标值
     * @param step 步进值
     * */
    smoothScrollTo(type, dom, targetNum, step) {
      this.reqTimer = requestAnimationFrame(() => {
        if (
          (step < 0 && dom[type] > targetNum) ||
          (step > 0 && dom[type] < targetNum)
        ) {
          dom[type] = dom[type] + step;
          if (Math.abs(targetNum - dom[type]) < Math.abs(step)) {
            this.smoothScrollTo(
              type,
              dom,
              targetNum,
              Math.abs(targetNum - dom[type]) * (step < 0 ? -1 : 1)
            );
          } else {
            this.smoothScrollTo(type, dom, targetNum, step);
          }
        }
      });
    },

    /**
     * 滚动到指定位置
     * @param x 水平真实滚动距离，null保持不变/'end'滚到底
     * @param y 垂直真实滚动距离，null保持不变/'end'滚到底
     * @param smooth 是否平滑滚动
     * **/
    scrollTo(x, y, smooth) {
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
      this.needSmooth = !!smooth;
      this.$nextTick(() => {
        if (this.realShowH && (y || y === 0)) {
          dom.scrollTop = s_y;
        }
        if (this.realShowW && (x || x === 0)) {
          dom.scrollLeft = s_x;
        }
        // firefox 设置scrollTop不会触发scroll事件,手动触发一下
        if (!smooth) {
          this.onScrollEvent();
        }
      });
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
    -webkit-overflow-scrolling: touch;
    * {
      -ms-overflow-style: auto;
    }
    &.isPc {
      -ms-overflow-style: none !important; // IE/Edge
      scrollbar-width: none; // Firefox
      // Chrome/Safari/Opera
      &::-webkit-scrollbar {
        display: none;
      }
    }
    &.isSmooth {
      scroll-behavior: smooth;
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

