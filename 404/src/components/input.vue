<template>
  <div id="input">
    <ul class="keypad">
      <li
        class="keyli"
        ref="keyli"
        v-for="(ikey, index) in keypad"
        :key="index"
        :class="{numli:ikey.weight}"
      >
        <div
          class="kkey"
          v-html="ikey.name"
          v-on:click="transfer($event)"
          :type="ikey.type"
          :value="ikey.value"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { finalResult, form as content } from "../js/calc.js";

export default {
  name: "app-input",
  data() {
    return {
      keypad: [
        { name: "%", weight: false, type: "base", value: "mod" },
        {
          name: "&radic;",
          weight: false,
          type: "special",
          value: "sqrt"
        },
        {
          name: "$$ x^2 $$",
          weight: false,
          type: "special",
          value: "pow"
        },
        {
          name: "$$1/x$$",
          weight: false,
          type: "special",
          value: "reciprocal"
        },
        { name: "C", weight: false, type: "clear", value: "c" },
        {
          name: "CE",
          weight: false,
          type: "clear",
          value: "ce"
        },
        {
          name: '<i class="iconfont icon-tuige"></i>',
          weight: false,
          type: "clear",
          value: "bs"
        },
        {
          name: "$$ \\div $$",
          weight: false,
          type: "base",
          value: "divide"
        },
        { name: "7", weight: true, type: "number", value: "7" },
        { name: "8", weight: true, type: "number", value: "8" },
        { name: "9", weight: true, type: "number", value: "9" },
        {
          name: "$$ \\times $$",
          weight: false,
          type: "base",
          value: "times"
        },
        { name: "4", weight: true, type: "number", value: "4" },
        { name: "5", weight: true, type: "number", value: "5" },
        { name: "6", weight: true, type: "number", value: "6" },
        { name: "-", weight: false, type: "base", value: "sub" },
        { name: "1", weight: true, type: "number", value: "1" },
        { name: "2", weight: true, type: "number", value: "2" },
        { name: "3", weight: true, type: "number", value: "3" },
        { name: "+", weight: false, type: "base", value: "plus" },
        {
          name: "$$ \\pm $$",
          weight: false,
          type: "specialbase",
          value: "inverse"
        },
        { name: "0", weight: true, type: "number", value: "0" },
        {
          name: "&sdot;",
          weight: true,
          type: "number",
          value: "dot"
        },
        { name: "=", weight: false, type: "base", value: "equal" }
      ]
    };
  },
  mounted: function() {
    if (document.body.offsetWidth < 420) this.layout();
  },
  methods: {
    transfer(e) {
      const type =
        e.target.getAttribute("type") ||
        e.target.parentNode.getAttribute("type");

      const value =
        e.target.getAttribute("value") ||
        e.target.parentNode.getAttribute("value");

      const character = { type: type, value: value };

      const error = finalResult(character);

      if (error) {
        if (error == "Success") {
          this.$store.commit(
            "updateLlis",
            window.sessionStorage.getItem("key")
          );
          console.log("yeah");
        } else alert(error);
      }

      this.$store.commit("updateContent", [
        content.show_prev,
        content.show_curr
      ]);
    },
    layout() {
      document.querySelector(".keypad").style.height =
        document.body.offsetHeight -
        document.querySelector("#header").offsetHeight -
        document.querySelector("#output").offsetHeight +
        "px";
    }
    // paint() {
    //   let keyli = document.querySelectorAll(".kkey");
    //   for (let index in keyli) {
    //     if (keyli.hasOwnProperty(index)) {
    //       keyli[index].style.background = `rgba(0,127,127, ${Math.random() *
    //         0.5 +
    //         0.25})`;
    //     }
    //   }
    // }
  }
};
</script>

<style lang="less" scoped>
#input {
  width: 100%;
  height: auto;
  color: white;
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.5);

  ul {
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(4, 1fr);
    width: 432px;
    padding: 0;
    margin: 0;
    list-style-type: none;
    transform: translateX(-6px);

    li {
      position: relative;
      z-index: 10;
      // flex: 1 0 21%;
      height: 64px;
      cursor: pointer;
      user-select: none;
      border: 3px #292c33 solid;
      // border-image: radial-gradient(circle at 30px 30px, red, yellow, green);
      // border-image-slice: 1;

      &.numli {
        font-weight: 600;
      }

      .kkey {
        position: absolute;
        top: 3px;
        right: 3px;
        bottom: 3px;
        left: 3px;
        z-index: -1;
        font-size: larger;
        line-height: 60px;
        text-align: center;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
        background: #292c33;
        border: 0 rgba(123, 228, 222, 0.37) solid;
        transition: 0.3s;
      }

      &:hover .kkey {
        border: 3px rgba(123, 228, 222, 0.37) solid;
      }
    }

    @media (max-width: 420px) {
      width: auto;
      transform: none;
    }
  }
}
</style>
