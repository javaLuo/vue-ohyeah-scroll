<template>
  <div v-if="!isMobile"
       :ref="`ohyeahbox-${id}`"
       :style="`width:${theWidth};height:${theHeight}`"
       class="ohyeah-scroll-box"
       tabindex="9999"
       @wheel="onMouseWheel">
    <!-- 纵向滚动条 -->
    <div v-if="!noVer"
         @mousedown.stop="onTrackMousedown($event,1)"
         @mouseenter.stop="hoverH = true"
         @mouseleave.stop="hoverH = false"
         :style="`background-color:${trackColor};opacity:${autoHide? 0 : 0.8}`"
         :class="['ohyeah-scroll-vertical-track-h',{'disabled': !isShowH},{'show': barHDown },{'left': left}]">
      <div @mousedown.stop="onBarMousedown($event, 1)"
           :ref="`ohyeahbarh-${id}`"
           :style="`transition:transform ${transSpeed}ms,width 250ms,height 250ms;background-color:${thumbColor};width:${(hoverH || barHDown )? breadth + 4 : breadth}px;height: ${barHTall}px;transform: translateY(${barHScrollTop}px);border-radius:${breadth}px`" />
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
           :style="`transition:transform ${transSpeed}ms,height 250ms,width 250ms;background-color:${thumbColor};height:${(hoverW || barWDown) ? breadth + 4 : breadth}px;width: ${barWTall}px;transform: translateX(${barWScrollLeft}px)`" />
    </div>
    <!-- 默认内容 -->
    <div :ref="`ohyeahbody-${id}`"
         class="ohyeah-scroll-body"
         :style="`${noVer ? 'height:100%;' : ''} ${noHor ? 'width:100%;' : ''} transition:transform ${transSpeed}ms,width 250ms;transform:translate(-${barWScrollLeft * scaleW}px, -${barHScrollTop * scaleH}px) translateZ(0)`">
      <slot></slot>
    </div>
  </div>
  <div class="ohyeah-scroll-box mobile"
       v-else>
    <slot></slot>
  </div>
</template>
<script>
import ElementResizeDetectorMaker from "element-resize-detector";
export default {
  name: "ohyeah",
  data() {
    return {
      isMobile: false,
      observer: null, // 监听变化
      isShowH: false, // 是否显示垂直滚动条
      isShowW: false, // 是否显示横向滚动条,
      isKeyDown: 0, // 键盘按下,0未按下/1已按下/2已启动平滑滚动
      bodyH: 0, // body高
      bodyW: 0, // body宽
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
      transSpeed: 250, // 过渡的速度
      smoothTimer: null,
      timer: 0,
      slow: 0.22
    };
  },
  props: {
    id: { type: [String, Number], default: () => Date.now() + Math.random() },
    noVer: { type: Boolean, default: false }, // 是否禁用垂直滚动条
    noHor: { type: Boolean, default: false }, // 是否禁用横向滚动条
    useKeybord: { type: Boolean, default: false }, // 是否启用键盘方向键
    movePx: { type: Number, default: 160 }, // 键盘翻页速度 px
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
    this.slow =
      navigator.userAgent.indexOf("Firefox") >= 0 &&
      navigator.userAgent.indexOf("Windows") >= 0
        ? 8
        : 0.22;
    if (this.isMobile) {
      return;
    }
    this.callback();
    this.listenResize();
    // 监听鼠标拖动事件
    document.addEventListener("mousemove", this.onBarDragMove);
    document.addEventListener("mouseup", this.onMouseUp);
    if (this.useKeybord) {
      this.$refs[`ohyeahbox-${this.id}`].addEventListener(
        "keyup",
        this.onKeyUp,
        false
      );
      this.$refs[`ohyeahbox-${this.id}`].addEventListener(
        "keydown",
        this.onKeyDown,
        false
      );
      this.$refs[`ohyeahbox-${this.id}`].addEventListener(
        "mouseenter",
        this.onBoxMouseEnter,
        false
      );
    }
  },
  beforeDestroy() {
    // 卸载鼠标拖动事件
    if (this.isMobile) {
      return;
    }
    document.removeEventListener("mousemove", this.onBarDragMove);
    document.removeEventListener("mouseup", this.onMouseUp);

    if (this.useKeybord) {
      this.$refs[`ohyeahbox-${this.id}`].removeEventListener(
        "keyup",
        this.onKeyUp,
        false
      );
      this.$refs[`ohyeahbox-${this.id}`].addEventListener(
        "keydown",
        this.onKeyDown,
        false
      );
      this.$refs[`ohyeahbox-${this.id}`].removeEventListener(
        "mouseenter",
        this.onBoxMouseEnter,
        false
      );
    }
    if (window.ResizeObserver) {
      this.observer.disconnect();
    } else {
      this.observer.uninstall(this.$refs[`ohyeahbody-${this.id}`]);
      this.observer.uninstall(this.$refs[`ohyeahbox-${this.id}`]);
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
        this.barHScrollTop = 0;
        this.scaleH = 0;
      } else {
        this.callback();
      }
    },
    noHor(newV) {
      if (newV) {
        this.barWScrollLeft = 0;
        this.scaleW = 0;
      } else {
        this.callback();
      }
    },
    // 监听到顶和到底事件, 数值
    barHScrollTop(newV) {
      const p = {
        offsetHeight: this.bodyH,
        offsetWidth: this.bodyW,
        height: this.trickH + 4,
        width: this.trickW + 4,
        scrollTop: newV * this.scaleH,
        scrollLeft: this.barWScrollLeft * this.scaleW
      };
      if (newV <= 0) {
        this.$emit("onVerStart", p);
      } else if (newV >= this.trickH - this.barHTall) {
        this.$emit("onVerEnd", p);
      }
      this.$emit("onScroll", p);
    },
    // 监听到左和到右事件
    barWScrollLeft(newV) {
      const p = {
        offsetHeight: this.bodyH,
        offsetWidth: this.bodyW,
        height: this.trickH + 4,
        width: this.trickW + 4,
        scrollTop: this.barHScrollTop * this.scaleH,
        scrollLeft: newV * this.scaleW
      };
      if (newV <= 0) {
        this.$emit("onHorStart", p);
      } else if (newV >= this.trickW - this.barWTall) {
        this.$emit("onHorEnd", p);
      }
      this.$emit("onScroll", p);
    }
  },
  methods: {
    // 监听容器变化
    listenResize() {
      // 如果支持ResizeObserver就用这个
      if (window.ResizeObserver) {
        this.observer = new ResizeObserver(this.callback);
        this.observer.observe(this.$refs[`ohyeahbody-${this.id}`]);
        this.observer.observe(this.$refs[`ohyeahbox-${this.id}`]);
      } else {
        this.observer = ElementResizeDetectorMaker(
          this.resizeObject ? null : { strategy: "scroll" }
        );
        this.observer.listenTo(
          this.$refs[`ohyeahbody-${this.id}`],
          this.callback
        );
        this.observer.listenTo(
          this.$refs[`ohyeahbox-${this.id}`],
          this.callback
        );
      }
    },
    callback() {
      const a = this.$refs[`ohyeahbox-${this.id}`].getBoundingClientRect(); // 外壳大小
      const b = this.$refs[`ohyeahbody-${this.id}`].getBoundingClientRect(); // body大小
      this.bodyH = b.height;
      this.bodyW = b.width;
      this.trickH = a.height - 4; // 轨道长度 = box高度 - padding的4px
      this.trickW = a.width - 4;

      this.isShowH = b.height > a.height;
      this.isShowW = b.width > a.width;

      if (this.realShowH) {
        const temp = this.barHScrollTop * this.scaleH;
        this.barHTall = Math.max(
          (a.height / b.height) * this.trickH,
          this.minLength > a.height ? 0 : this.minLength
        );
        this.scaleH = (b.height - a.height) / (this.trickH - this.barHTall);
        this.barHScrollTop = Math.min(
          Math.max(temp / this.scaleH, 0),
          this.trickH - this.barHTall
        );
      } else {
        this.barHScrollTop = 0;
        this.scaleH = 0;
      }
      if (this.realShowW) {
        const temp = this.barWScrollLeft * this.scaleW;
        this.barWTall = Math.max(
          (a.width / b.width) * this.trickW,
          this.minLength > a.width ? 0 : this.minLength
        );
        this.scaleW = (b.width - a.width) / (this.trickW - this.barWTall);
        this.barWScrollLeft = Math.min(
          Math.max(temp / this.scaleW, 0),
          this.trickW - this.barWTall
        );
      } else {
        this.barWScrollLeft = 0;
        this.scaleW = 0;
      }
    },
    // 鼠标进入范围，在开启键盘功能的情况下需要自动获得焦点
    onBoxMouseEnter() {
      console.log("来来没有", document.activeElement.nodeName);
      if (document.activeElement.nodeName === "BODY") {
        this.$refs[`ohyeahbox-${this.id}`].focus();
      }
    },

    // 滚动条上鼠标按下 1纵 2横
    onBarMousedown(e, type) {
      e.preventDefault();
      e.stopImmediatePropagation();

      this.barHDown = type === 1;
      this.barWDown = type === 2;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startBarHScrollTop = this.barHScrollTop;
      this.startBarWScrollLeft = this.barWScrollLeft;
    },

    // 键盘按下
    onKeyDown(e) {
      if (/^(INPUT)|(TEXTAREA)|SELECT/.test(document.activeElement.nodeName)) {
        return;
      }
      e.preventDefault(); // 需要这个，不然外部原生滚动条也会跟着滚动
      e.stopImmediatePropagation();
      // 只监听4个方向键
      // 已按下
      if (this.isKeyDown === 2) {
        return;
      } else if (this.isKeyDown === 1) {
        this.smoothScroll(e.which);
      } else {
        if (e.which > 36 && e.which < 41) {
          this.isKeyDown = 1;
          switch (e.which) {
            // 左
            case 37:
              this.scrollTo(
                this.barWScrollLeft * this.scaleW - this.movePx,
                null,
                250
              );
              break;
            // 上
            case 38:
              this.scrollTo(
                null,
                this.barHScrollTop * this.scaleH - this.movePx,
                250
              );
              break;
            // 右
            case 39:
              this.scrollTo(
                this.barWScrollLeft * this.scaleW + this.movePx,
                null,
                250
              );
              break;
            // 下
            case 40:
              this.scrollTo(
                null,
                this.barHScrollTop * this.scaleH + this.movePx,
                250
              );
              break;
          }
        }
      }
    },

    // 用户长按方向键，启动平滑滚动
    smoothScroll(which) {
      this.isKeyDown = 2;

      this.smoothTimer = requestAnimationFrame(() => {
        this.transSpeed = 0;
        this.smoothScroll(which);
        switch (which) {
          // 左
          case 37:
            this.barWScrollLeft = Math.min(
              Math.max(this.barWScrollLeft - 1, 0),
              this.trickW - this.barWTall
            );
            break;
          // 上
          case 38:
            this.barHScrollTop = Math.min(
              Math.max(this.barHScrollTop - 1, 0),
              this.trickH - this.barHTall
            );
            break;
          // 右
          case 39:
            this.barWScrollLeft = Math.min(
              Math.max(this.barWScrollLeft + 1, 0),
              this.trickW - this.barWTall
            );
            break;
          // 下
          case 40:
            this.barHScrollTop = Math.min(
              Math.max(this.barHScrollTop + 1, 0),
              this.trickH - this.barHTall
            );
            break;
        }
      });
    },

    // 键盘弹起
    onKeyUp(e) {
      this.isKeyDown = 0;
      cancelAnimationFrame(this.smoothTimer);
    },

    // 轨道上鼠标按下
    onTrackMousedown(e, type) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this.barHDown = type === 1;
      this.barWDown = type === 2;

      this.transSpeed = 250;

      this.$nextTick(() => {
        if (this.barHDown) {
          // 在上方点击
          if (this.barHScrollTop >= e.offsetY) {
            this.barHScrollTop = Math.max(e.offsetY - 6, 0);
          } else {
            this.barHScrollTop = Math.min(
              e.offsetY - this.barHTall + 2,
              this.trickH - this.barHTall
            );
          }
        }
        if (this.barWDown) {
          // 在左方点击
          if (this.barWScrollLeft >= e.offsetX) {
            this.barWScrollLeft = Math.max(e.offsetX - 6, 0);
          } else {
            this.barWScrollLeft = Math.min(
              e.offsetX - this.barWTall + 2,
              this.trickW - this.barWTall
            );
          }
        }
        this.onBarMousedown(e, type);
      });
    },
    // 横向或纵向滚动条被拖拽
    onBarDragMove(e) {
      // 正在拖拽纵向滚动条
      if (this.barHDown) {
        if (!this.timer) {
          requestAnimationFrame(() => {
            this.transSpeed = 0;
            this.barHScrollTop = Math.min(
              Math.max(this.startBarHScrollTop + e.clientY - this.startY, 0),
              this.trickH - this.barHTall
            );
            this.timer = 0;
          });
          this.timer = 1;
        }
      } else if (this.barWDown) {
        if (!this.timer) {
          requestAnimationFrame(() => {
            this.transSpeed = 0;
            this.barWScrollLeft = Math.min(
              Math.max(this.startBarWScrollLeft + e.clientX - this.startX, 0),
              this.trickW - this.barWTall
            );
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
    // 鼠标滚轮事件
    onMouseWheel(e) {
      // 节流

      if (!this.timer) {
        let y =
          this.realShowH && e.deltaY
            ? Math.min(
                Math.max(e.deltaY * this.slow + this.barHScrollTop, 0),
                this.trickH - this.barHTall
              )
            : 0;
        let x =
          this.realShowW && e.deltaX
            ? Math.min(
                Math.max(e.deltaX * this.slow + this.barWScrollLeft, 0),
                this.trickW - this.barWTall
              )
            : 0;

        this.willStopProp(e, y, x);

        requestAnimationFrame(() => {
          this.transSpeed = 0;
          if (this.realShowH && e.deltaY) {
            this.barHScrollTop = y;
          }
          if (this.realShowW && e.deltaX) {
            this.barWScrollLeft = x;
          }
          this.timer = 0;
        });
        this.timer = 1;
      } else {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    },

    willStopProp(e) {
      if (
        this.realShowH &&
        e.deltaY &&
        this.barHScrollTop + e.deltaY > 0 &&
        this.barHScrollTop + e.deltaY < this.trickH - this.barHTall
      ) {
        e.preventDefault();
        e.stopImmediatePropagation();
      } else if (
        this.realShowW &&
        e.deltaX &&
        this.barWScrollLeft + e.deltaX > 0 &&
        this.barWScrollLeft + e.deltaX < this.trickW - this.barWTall
      ) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    },

    scrollTo(x, y, time = 0) {
      const s_y =
        y === "end"
          ? this.trickH - this.barHTall
          : y && this.scaleH > 0
          ? y / this.scaleH
          : 0;
      const s_x =
        x === "end"
          ? this.trickW - this.barWTall
          : x && this.scaleW > 0
          ? x / this.scaleW
          : 0;

      this.transSpeed = time;
      if (this.realShowH && (y || y === 0)) {
        this.barHScrollTop = Math.min(
          Math.max(s_y, 0),
          this.trickH - this.barHTall
        );
      }
      if (this.realShowW && (x || x === 0)) {
        this.barWScrollLeft = Math.min(
          Math.max(s_x, 0),
          this.trickW - this.barWTall
        );
      }
    },
    getScrollInfo() {
      return {
        offsetHeight: this.bodyH,
        offsetWidth: this.bodyW,
        height: this.trickH + 4,
        width: this.trickW + 4,
        scrollTop: this.barHScrollTop * this.scaleH,
        scrollLeft: this.barWScrollLeft * this.scaleW
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
  -ms-overflow-style: none;
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
  &.transition {
    & > .ohyeah-scroll-body {
      transition: transform 250ms;
    }
    & > .ohyeah-scroll-vertical-track-h > div,
    & > .ohyeah-scroll-vertical-track-w > div {
      transition: transform 250ms;
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
    padding: 2px;
    right: 0;
    top: 0;
    z-index: 10;
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
    padding: 2px;
    bottom: 0;
    left: 0;
    z-index: 9;
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
  .ohyeah-scroll-body {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    min-width: 100%;
  }
}
</style>

