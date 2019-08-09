<template>
  <div id="calculator">
    <div class="top"></div>
    <div class="left"></div>
    <div id="container">
      <div class="content">
        <app-header />
        <app-output />
        <app-input />
        <div class="class"></div>
      </div>
    </div>
    <div class="right"></div>
    <div class="bottom"></div>
    <app-light />
  </div>
</template>

<script>
import Header from "./components/header.vue";
import OutputV from "./components/output.vue";
import InputV from "./components/input.vue";
import Light from "./components/light.vue";
// import { mouse } from "./js/light.js";

export default {
  name: "calculator",
  data() {
    return {
      flag: false,
      loading: true
    };
  },
  components: {
    "app-header": Header,
    "app-output": OutputV,
    "app-input": InputV,
    "app-light": Light
  },
  methods: {}
};
</script>

<style lang='less' scoped>
.edge() {
  position: relative;
  z-index: 10;
  background: #292c33;
}

#calculator {
  @media screen and (min-width: 420px) {
    display: grid;
    grid-template-areas:
      "top top top"
      "left container right"
      "bottom bottom bottom";
    grid-template-rows: 0.2fr 592px 1fr;
    grid-template-columns: 1fr 436px 1fr;
    align-content: center;
    justify-content: center;
    height: 100%;

    .top {
      grid-area: top;
      .edge();
    }

    .left {
      grid-area: left;
      .edge();
    }

    .right {
      grid-area: right;
      .edge();
    }

    .bottom {
      grid-area: bottom;
      .edge();
    }

    #container {
      grid-area: container;
      background: #292c33;

      .content {
        position: relative;
        z-index: 11;
        width: 420px;
        margin: 3px auto 0;
      }
    }
  }

  @media (max-width: 420px) {
    min-width: 320px;
    height: 100%;
    background: #292c33;

    #container {
      width: 100%;
      height: 100%;
      background: #292c33;

      .content {
        width: auto;
        height: 100%;
      }
    }
  }
}
</style>
