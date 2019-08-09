<template>
  <div id="light"></div>
</template>

<script>
export default {
  name: "light",
  mounted: function() {
    let light = document.querySelector("#light");
    let elems = document.querySelectorAll(".keyli");
    let elempos = [],
      mousepos = [];
    let bodywidth = document.body.clientWidth;
    let bodyheight = document.body.clientHeight;

    let getElemPos = elem => {
      return {
        x:
          elem.getBoundingClientRect().left +
          elem.getBoundingClientRect().width / 2 +
          document.documentElement.scrollLeft,
        y:
          elem.getBoundingClientRect().top +
          elem.getBoundingClientRect().height / 2 +
          document.documentElement.scrollTop
      };
    };

    let getEvePos = () => {
      return {
        x:
          event.clientX + document.documentElement.scrollLeft ||
          window.event.clientX + document.documentElement.scrollLeft,
        y:
          event.clientY + document.documentElement.scrollTop ||
          window.event.clientY + document.documentElement.scrollTop
      };
    };

    Array.from(elems).map(elem => {
      elempos.push({ x: getElemPos(elem).x, y: getElemPos(elem).y });
    });

    document.addEventListener("mousemove", e => {
      mousepos = { x: getEvePos().x, y: getEvePos().y };

      if (
        bodywidth != document.body.clientWidth ||
        bodyheight != document.body.clientHeight
      ) {
        elempos = [];
        bodywidth = document.body.clientWidth;
        bodyheight = document.body.clientHeight;
        Array.from(elems).map(elem => {
          elempos.push({ x: getElemPos(elem).x, y: getElemPos(elem).y });
        });
      }

      if (
        mousepos.x > elempos[0].x - 120 &&
        mousepos.x < elempos[3].x + 120 &&
        mousepos.y > elempos[0].y - 48 &&
        mousepos.y < elempos[elempos.length - 1].y + 120
      ) {
        light.style.left = `${mousepos.x}px`;
        light.style.top = `${mousepos.y}px`;
      } else {
        light.style.left = `0px`;
        light.style.top = `0px`;
      }
    });
  }
};
</script>

<style lang="less" scoped>
#light {
  position: absolute;
  z-index: 1;
  width: 15rem;
  height: 15rem;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 255, 255, 0.5) 0%,
    rgba(0, 255, 255, 0) 50%
  );
  border-radius: 50%;
  transform: translate3d(-50%, -50%, 0);

  @media (max-width: 420px){
    display: none;
  }
}
</style>
