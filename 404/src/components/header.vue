<template>
  <header id="header">
    <div class="tool">
      <i class="iconfont icon-guanyu" title="关于" v-on:click="showif($event)" mykey="about"></i>
      <i class="iconfont icon-lishijilu" title="历史纪录" v-on:click="showif($event)" mykey="history"></i>
      <app-toggle title="未完待续" />
    </div>
    <transition
      name="infoshow"
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
      v-if="transitionWhich"
    >
      <app-info :history="history" :about="about" v-show="history || about" />
    </transition>
    <transition
      name="infoshow"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
      v-else
    >
      <app-info :history="history" :about="about" v-show="history || about" />
    </transition>
    <div class="hideinfo" v-show="history || about" v-on:click="fade"></div>
  </header>
</template>

<script>
import Toggle from "./toggle.vue";
import Info from "./info.vue";

export default {
  name: "app-header",
  data() {
    return {
      history: false,
      about: false,
      transitionWhich: true
    };
  },
  components: {
    "app-toggle": Toggle,
    "app-info": Info
  },
  mounted: function() {
    this.transitionWhich = document.body.offsetWidth > 942;
  },
  methods: {
    showif(e) {
      this.history =
        e.target.getAttribute("mykey") == "history" ? !this.history : false;

      this.about =
        e.target.getAttribute("mykey") == "about" ? !this.about : false;
    },
    fade() {
      this.history = false;
      this.about = false;
    }
  }
};
</script>

<style lang='less' scoped>
header {
  position: relative;
  width: 100%;
  height: 45px;
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.5);

  .tool {
    width: 96%;
    height: 86%;
    padding: 1% 2% 0 2%;
    overflow: hidden;
    background: #292c33;
    border-radius: 9px 9px 0 0;
    box-shadow: inset 0 0 8px rgba(0, 255, 255, 0.5);

    .iconfont {
      font-size: 28px;
      color: white;
      text-shadow: 0 0 1px rgba(0, 255, 255, 0.95);
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        text-shadow: 0 0 6px rgba(0, 255, 255, 0.95);
      }

      &.icon-guanyu {
        float: right;
        margin-left: 5px;
      }

      &.icon-lishijilu {
        float: right;
      }
    }
  }

  .hideinfo {
    position: absolute;
    top: -90%;
    left: -150%;
    z-index: -2;
    width: 1800px;
    height: 1080px;
    // background: rebeccapurple;
  }
}
</style>

