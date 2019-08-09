<template>
  <div id="output">
    <div class="formula">{{content.formula}}</div>
    <div class="writing">{{content.writing}}</div>
  </div>
</template>

<script>
export default {
  name: "app-output",
  data() {
    return {};
  },
  computed: {
    content: {
      get() {
        return {
          formula: this.$store.state.content.formula,
          writing: this.$store.state.content.writing
        };
      }
    }
  },
  updated: function() {
    document.querySelector(".writing").style.fontSize = "3rem";
    if (
      document.querySelector("#output").offsetWidth <
      document.querySelector(".writing").scrollWidth
    ) {
      let size =
        document.querySelector("#output").offsetWidth /
        document.querySelector(".writing").scrollWidth;

      document.querySelector(".writing").style.fontSize = size * 3 - 0.1 + "rem";
    }
  }
};
</script>

<style lang="less" scoped>
#output {
  width: 100%;
  height: 120px;
  color: white;
  text-align: right;
  background: rgba(129, 219, 219, 0.81);
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.5);

  .formula {
    height: 40%;
    padding: 0 6px;
    overflow: auto;
    font-size: 1rem;
    line-height: 36px;
    // background: red;
  }

  .writing {
    height: 60%;
    padding: 0 6px;
    overflow: auto;
    font-size: 3rem;
    // background: yellow;
  }

  @media (max-width: 420px) {
    height: 18%;
  }
}
</style>

