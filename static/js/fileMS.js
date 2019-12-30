var app = null;

function init() {
    setTheme()
    getPicList()
}

function openfolder(folder){
    console.log(folder)
}

function getPicList() {
    $.get('/queryFile', {
        name: 'front'
    }).done(function (data) {
        var temp = JSON.parse(data)
        initDom(temp.pic)
        initBinding()
    })
}

function initDom(list) {
    app = new Vue({
        el: "#root",
        data: {
            pics: mkPicList(list)
        }
    })
}

function mkPicList(list,subPath) {
    var resList = []

    resList.push(mkObject('fa fa-folder','/queryFile?' + 'place='+'home',true,'home'))

    for (var i = 0; i < list.length; i++) {
        var flag = list[i].split('.')
        var flagLength = flag.length
        if (flagLength > 1) {
            var download = false
            if(setFileIcon(flag[flagLength - 1]) == 'fa fa-file'){
                download = true
            }
            tempPath = '../static/files/yunda/' + subPath + '/' + list[i]
            resList.push(mkObject(setFileIcon(flag[flagLength - 1]),tempPath,false,decodeURI(list[i]),download))
        } else {
            resList.push(mkObject('fa fa-folder','/queryFile?' + 'place='+list[i],true,list[i],false))
        }
    }
    return resList
}

function uploadFile() {
    // console.log('hello uploadfile')
    $.ajax({
        url: '/deelFileUpload',
        type: 'post',
        data: new FormData($('#form')[0]), 
        cache: false, //上传文件不需要缓存
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        success: function (data) {
            console.log(data);
            // 设置图片预览功能
        }
    })
}

function initBinding(){
    $('.folderClick').click(function(){
        $.get('/queryFile', {
            place: this.innerText
        }).done(function (data) {
            var temp = JSON.parse(data)
            app.pics = mkPicList(temp.pic,temp.subPath)
            initBinding()
        })
    })
}

function mkObject(type,link,bool,name,download){
    var obj = new Object()
    obj.type = type
    obj.link = link
    obj.bool = bool
    obj.name = name
    obj.download = download
    return obj
}

function setFileIcon(type) {
    switch (type) {
        case 'mp4':
        case 'MP4':
            type = 'fa fa-play'
            break
        case 'jpg':
        case 'png':
        case 'jpeg':
        case 'PNG':
        case 'JPG':
            type = 'fa fa-file-image-o'
            break
        default:
            type = 'fa fa-file'
            break
    }
    return type
}