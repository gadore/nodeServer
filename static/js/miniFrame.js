function showNotify(msg) {
    $id('notify').innerText = msg;
    $id('notify').style.display = 'block'
    setTimeout(function () {
        $id('notify').style.display = 'none'
    }, 2000)
}

function $id(id) {
    return document.getElementById(id)
}

function $class(className) {
    return document.getElementsByClassName(className)
}

function $tag(tag) {
    return document.getElementsByTagName(tag)
}

function $isNull(sth) {
    if (sth == '' || sth == null || sth == undefined || sth.length == 0) {
        return true
    } else {
        return false
    }
}

function $mkEle(ele){
    return document.createElement(ele)
}

function scrollToEnd(ele){
    ele.children[ele.children.length-1].scrollIntoView(false)
}
