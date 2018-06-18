// 隐藏遮罩层，鼠标悬浮显示
addLoadEvent(initMaskBox);
function initMaskBox () {
  let doc = document,
      navList = doc.getElementById("nav_list"),
      links = navList.getElementsByTagName("a"),
      maskBox = doc.getElementsByClassName("navMask")[0],
      header = doc.getElementsByTagName("header")[0],
      nav = doc.getElementsByTagName("nav")[0];
  let showMask = function (event) {
    event = EventUtil.getEvent(event);
    let target = EventUtil.getTarget(event);
    if (target.className === "linkMask") {
      addClass(maskBox, "show", 1);
      navList.className = "maskList";
    } else {
      return;
    }
    EventUtil.removeEvent(navList, "mouseover", showMask);
    EventUtil.addEvent(header, "mouseover", hideMask);
  };
  let hideMask = function (event) {
    if (maskBox.className === "navMask hide") return true;
    event = EventUtil.getEvent(event);
    let target = EventUtil.getTarget(event);
    if (!contains(nav, target)) {
      addClass(maskBox, "hide", 1);
      navList.className = "navList";
    } else {
      return;
    }
    EventUtil.removeEvent(header, "mouseover", hideMask);
    EventUtil.addEvent(navList, "mouseover", showMask);
  }
  EventUtil.addEvent(navList, "mouseover", showMask);
}


// 图片切换 事件处理函数
addLoadEvent(initLink);
function initLink() {
  let doc = document,
      imgBox = doc.getElementById("img"),
      imgIndex = doc.getElementById("img_index"),
      indexs = imgIndex.getElementsByTagName("a"),
      len = indexs.length,
      descs = doc.getElementById("descript").getElementsByTagName("div"),
      currentIndex = +(imgBox.className.slice(-1)),
      leftArrow = doc.getElementById("to_pre"),
      rightArrow = doc.getElementById("to_next");
  imgLinks(imgBox, indexs, descs, len, 0);
// 左右箭头  点击
  EventUtil.addEvent(leftArrow, "click", function () {
    if (currentIndex === 0 ) {
      currentIndex = len - 1;
    } else {
      currentIndex = currentIndex - 1;
    }
    imgLinks(imgBox, indexs, descs, len, currentIndex);
  });    
  EventUtil.addEvent(rightArrow, "click", function () {
    if (currentIndex === len - 1 ) {
      currentIndex = 0;
    } else {
      currentIndex = currentIndex + 1;
    }
    imgLinks(imgBox, indexs, descs, len, currentIndex);
  });
//索引按钮  点击
  EventUtil.addEvent(imgIndex, "click", function (event) {
    event = EventUtil.getEvent(event);
    let target = EventUtil.getTarget(event);
      if (target.tagName !== "A") {
        return false;
      } else {
        targetIndex = +(target.className.slice(5, 6));
        imgLinks(imgBox, indexs, descs, len, targetIndex);
    }
  });
}
//接收（图片容器、索引elems、描述elems、总数total、索引号），改变相关元素的类名；
function imgLinks(imgElem, indexElems, descElems, total, number) {
  if (imgElem.autoNext) {
    clearTimeout(imgElem.autoNext);
  }
  let descBox = descElems[0].parentNode;
  rightFade(descBox, "animate");
  imgElem.className = "img" + number;
  for (i = 0; i < total; i++) {
    if (i === number) {
      addClass(indexElems[i], "cura", 1);
      addClass(descElems[i], "cur", 1);
    } else {
      addClass(indexElems[i], "", 1);
      addClass(descElems[i], "", 1);
    }
  }
  number = changeNext(total, number);
  let repeat = function () {
    imgLinks(imgElem, indexElems, descElems, total, number);
  }
  imgElem.autoNext = setTimeout(repeat, 4000);
}

//循环递增，接收总数和当前索引号；
function changeNext (len, number) {
  if (number < len - 1) {
    number = number + 1;
  } else {
    number = 0
  }
  return number;
}
// rightFade效果,接收元素和类名(CSS动画)
function rightFade(elem, animClass) {
  if (elem.animate) {
    clearTimeout(elem.animate);
  }
  let oldClass = elem.className;
  elem.className = oldClass + " " +animClass;
  let goback = function () {
    elem.className = oldClass;
  }
  elem.animate = setTimeout(goback, 500);
}


