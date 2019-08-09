<template>
  <div id="info">
    <transition
      name="sshow"
      enter-active-class="animated fadeIn"
      leave-active-class="aniamted fadeOut"
    >
      <div class="history" v-show="history">
        <transition-group tag="ul" name="historyshow" leave-active-class="animated zoomOutRight">
          <li class="historyshow-li" v-for="lli in lis" :key="lli.key">{{ lli.value }}</li>
        </transition-group>
      </div>
    </transition>
    <transition
      name="sshow"
      enter-active-class="animated fadeIn"
      leave-active-class="aniamted fadeOut"
    >
      <div class="about" v-show="about">关于...</div>
    </transition>
    <div class="delete">
      <i class="iconfont icon-lajixiang" v-show="history" @click="deleteHistory" title="删除全部"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "info",
  props: {
    history: {
      type: Boolean,
      default: false
    },
    about: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    lis: {
      get() {
        return this.$store.state.content.llis.map((value, index) => {
          return {
            value: value,
            key: index
          };
        });
      }
    }
  },
  beforeUpdate:function(){
    if (document.body.offsetWidth < 420) this.setInfo();
  },
  methods: {
    deleteHistory() {
      this.$store.commit("deleteLlis");
    },
    setInfo() {
      document.querySelector("#info").style.top =
        document.querySelector("#header").offsetHeight +
        document.querySelector("#output").offsetHeight - 
        10 + "px";

      document.querySelector("#info").style.height =
        document.querySelector("#input").offsetHeight + 10 + "px";
    }
  }
};
</script>

<style lang="less" scoped>
.historyshow-li {
  margin-right: 10px;
  transition: all 1s;
}

.historyshow-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.historyshow-move {
  transition: transform 1s;
}

#info {
  overflow: hidden;
  background: #e4e0e0e0;

  @media (min-width: 420px) {
    position: absolute;
    top: 8px;
    left: 100%;
    z-index: -1;
    width: 64%;
    height: 570px;
    border: 6px solid #292c33;
    border-radius: 0 18px 18px 0;
  }

  @media (max-width: 420px) {
    position: absolute;
    // top: 150px;
    z-index: 11;
    width: 100%;
    // height: 600px;
    border-radius: 18px 18px 0 0;
  }

  .history {
    width: 100%;
    height: 95%;
    overflow: auto;
    background: #e4e0e0e0;
    box-shadow: 0 0 12px #708fd5a1;

    ul {
      display: flex;
      flex-direction: column-reverse;
      padding: 12px;
      list-style: none;

      li {
        height: 24px;
        margin-top: 10px;
        border-bottom: 1px solid #a49898;
      }
    }
  }

  .about {
    box-sizing: border-box;
    width: 100%;
    height: 95%;
    padding: 19px;
    overflow: auto;
    background: #e4e0e0e0;
    box-shadow: 0 0 12px #708fd5a1;
  }

  .delete {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5%;
    font-size: 21px;
    text-align: right;
    background: #afacac;

    .iconfont {
      margin-right: 16px;
      font-size: 22px;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        color: rgba(0, 114, 114, 0.76);
        text-shadow: 0 0 1px rgba(0, 255, 255, 0.95);
      }
    }
  }
}
</style>
