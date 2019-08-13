let getElemPos = elem => {
    return {
        x: elem.getBoundingClientRect().left + elem.getBoundingClientRect().width / 2 + document.documentElement.scrollLeft,
        y: elem.getBoundingClientRect().top + elem.getBoundingClientRect().height / 2 + document.documentElement.scrollTop,
        w: elem.getBoundingClientRect().width / 2,
        h: elem.getBoundingClientRect().height / 2
    }
}

let getEvePos = () => {
    return {
        x: event.clientX + document.documentElement.scrollLeft || window.event.clientX + document.documentElement.scrollLeft,
        y: event.clientY + document.documentElement.scrollTop || window.event.clientY + document.documentElement.scrollTop
    }
}

let renderBorder = (mp, ep, elem, range = 64 * 2) => {
    elem.style.borderImage = `radial-gradient(${range}px at ${ep.w + mp.x - ep.x}px ${ep.h + mp.y - ep.y}px, white, rgba(0, 255, 255, 0)) 1`;
}

let renderInit = (mp, ep, elems, width, height, test) => {
    for (let index in elems) {
        if (elems.hasOwnProperty(index)) {
            elems[index].style.borderImage = ``;
            if (Math.abs(ep[index].x - mp.x) < width && Math.abs(ep[index].y - mp.y < height)) {
                renderBorder(mp, ep[index], elems[index]);
                test.push(index);
            }
        }
    }
}

let light = () => {
    let body = document.querySelector('body');
    let elems = document.querySelectorAll('.keyli');
    let mousepos = {}, elempos = [];

    Array.from(elems).map(elem => {
        elempos.push({ x: getElemPos(elem).x, y: getElemPos(elem).y, w: getElemPos(elem).w, h: getElemPos(elem).h });
    });

    // for(let elem of elem){
    //     elempos.push([getElemPos(elem)[0], getElemPos(elem)[1], getElemPos(elem)[2], getElemPos(elem)[3]]);
    // }

    body.onmousemove = () => {
        let test = [];
        mousepos = { x: getEvePos().x, y: getEvePos().y }
        if (mousepos.x > elempos[0].x - 120
            && mousepos.x < elempos[3].x + 120
            && mousepos.y > elempos[0].y - 120
            && mousepos.y < elempos[elempos.length - 1].y + 120
        ) {
            renderInit(mousepos, elempos, elems, 108, 72, test);
            // console.log(test);
        }
    }
    // console.log(elempos.length - 1);
}

// 废案
export { light };
