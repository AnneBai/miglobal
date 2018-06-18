// 添加页面加载初始化事件
function addLoadEvent(fn) {
  let oldLoad = window.onload;
  if (typeof oldLoad !== "function") {
    window.onload = fn;
  } else {
    window.onload = function () {
      oldLoad();
      fn();
    }
  }
}

// 关于事件操作的通用方法
var EventUtil = {
  addEvent: function (elem, type, handler) {
    if (elem.addEventListener) {
      elem.addEventListener(type, handler, false);
    } else if (elem.attachEvent) {
      elem.attachEvent("on"+type, handler);
    } else {
      elem["on"+type] = handler;
    }
  },
  removeEvent: function (elem, type, handler) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handler, false);
    } else if (elem.detachEvent) {
      elem.detachEvent("on"+type, handler);
    } else {
      elem["on"+type] = null;
    }
  },
  getEvent: function (event) {
    return event? event : window.event;
  },
  getTarget: function (event) {
    return event.target || event.srcElement;
  },
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  StopPropagation: function (event) {
    if (event.StopPropagation) {
      event.StopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }
};

// addClass添加类名，参数(elem, newClass, number);
// 第一个参数指定元素，第二个参数指定要添加的类名，第三个元素指定要保留几个旧的类名；
function addClass(elem, newClass, number) {
  let oldClass = elem.className;
  if (typeof oldClass !== "string") {
    elem.className = newClass;
    // 如果参数number未提供
  } else if (number === undefined) {
    elem.className = oldClass+" "+newClass;
  } else {
    let arr = oldClass.split(/\s+/, number);
    arr.push(newClass);
    elem.className = arr.join(" ");
  }
}

// 检测节点的关系 contains(参照节点，检测节点)
var client = function () {
  let engine = {
    ie: 0, gecko: 0, webkit: 0, 
    khtml: 0, opera: 0, ver: null};
  return {
    engine : engine
  };
}();
function contains(refNode, otherNode) {
  if (typeof refNode.contains === "function" && 
      (!client.engine.webkit || client.engine.webkit >= 522)) {
    return refNode.contains(otherNode);
  } else if (typeof refNode.compareDocumentPosition === "function") {
    return (!!refNode.compareDocumentPosition(otherNode) & 16);
  } else {
    let node = otherNode.parentNode;
    do {
      if (node === refNode) {
        return true;
      } else {
        node = node.parentNode;
      }
    } while (node !== null);
    return false;
  }
}

