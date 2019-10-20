function init(){
    setTheme()
    getPicList()
}

function getPicList(){
    $.get('/queryPicture', {
        name:'front'
    }).done(function (data) {
        var temp = JSON.parse(data)
        initDom(temp.pic)
    })
}

function initDom(list){
    let app = new Vue({
        el: "#root",
        data: {
            pics: mkPicList(list)
        }
    })
}

function mkPicList(list){
    var resList = []
    for(var i=0;i<list.length;i++){
        var temp = new Object();
        temp.link = '../static/img/'+list[i]
        temp.name = list[i]
        resList.push(temp)
    }
    return resList
}