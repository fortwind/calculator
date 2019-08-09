<template>
  <div class="toggle">
    <div class="toggle-line">
      <span class="line line1-1"></span>
      <span class="line line2-1"></span>
      <span class="line line3-1"></span>
      <span class="line linef line1-2"></span>
      <span class="line linef line2-2"></span>
      <span class="line linef line3-2"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "toggle",
};
</script>

<style lang="less" scoped>
.pos(@top, @left, @rigth) {
  top: @top;
  right: @rigth;
  left: @left;
}

.trans(@width, @translate, @angle) {
  width: @width;
  transform: translate(@translate, 0) rotateZ(@angle);
}

.toggle {
  float: left;
  width: 24px;
  height: 20px;
  padding: 6px;
  cursor: pointer;
  user-select: none;

  .toggle-line {
    position: relative;
    width: 24px;
    height: 20px;
    line-height: 0;

    .line {
      position: absolute;
      display: inline-block;
      width: 54%;
      height: 2px;
      background: white;
      border-radius: 2px;
      box-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
      transition: 0.3s;

      &.line1-1 {
        .pos(3px, 0, unset);
      }

      &.line1-2 {
        .pos(3px, unset, 0);
      }

      &.line2-1 {
        .pos(9px, 0, unset);
      }

      &.line2-2 {
        .pos(9px, unset, 0);
      }

      &.line3-1 {
        .pos(15px, 0, unset);
      }

      &.line3-2 {
        .pos(15px, unset, 0);
      }
    }

    &:hover {
      .line1-1 {
        .trans(42%, 27%, 24deg);
      }

      .line1-2 {
        .trans(42%, -27%, -24deg);
      }

      .line2-1 {
        .trans(44%, 26%, 36deg);
      }

      .line2-2 {
        .trans(44%, -26%, -36deg);
      }

      .line3-1 {
        .trans(48%, 25%, 45deg);
      }

      .line3-2 {
        .trans(48%, -25%, -45deg);
      }
    }
  }
}
</style>
