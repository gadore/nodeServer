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

    subPath = subPath == undefined ? '' : subPath + '/'

    resList.push(mkObject('fa fa-folder','/queryFile?' + 'place='+'home',true,'home'))

    for (var i = 0; i < list.length; i++) {
        var flag = list[i].split('.')
        var flagLength = flag.length
        if (flagLength > 1) {
            var download = false
            if(setFileIcon(flag[flagLength - 1]) == 'fa fa-file'){
                download = true
            }
            tempPath = '../static/files/' + subPath + list[i]

            resList.push(mkObject(setFileIcon(flag[flagLength - 1]),tempPath,false,decodeURI(list[i]),download))
        } else {
            resList.push(mkObject('fa fa-folder','/queryFile?' + 'place='+list[i],true,list[i],false))
        }
    }
    return resList
}

function progressFunction(e){
    var loading = Math.round(e.loaded / e.total * 100) + '%'
    $id('uploadProcessBar').style.width = loading
    $id('uploadProcessBar').innerText = loading
}
function uploadComplete(){
    $id('uploadProcessBar').innerText = 'success'
}
function uploadFailed(){
    $id('uploadProcessBar').innerText = 'failed'
}

function uploadFile() {
    $id('progress').classList.remove('hidden')
    var xhr = new XMLHttpRequest();
    
    xhr.onload = uploadComplete; // 添加 上传成功后的回调函数
    xhr.onerror =  uploadFailed; // 添加 上传失败后的回调函数
    xhr.upload.onprogress = progressFunction; // 添加 监听函数
    xhr.open("POST", '/deelFileUpload', true);
    xhr.send(new FormData($('#form')[0]));
    // $.ajax({
    //     url: '/deelFileUpload',
    //     type: 'post',
    //     data: new FormData($('#form')[0]), 
    //     cache: false, //上传文件不需要缓存
    //     processData: false, // 告诉jQuery不要去处理发送的数据
    //     contentType: false, // 告诉jQuery不要去设置Content-Type请求头
    //     success: function (data) {
    //         console.log(data);
    //         // 设置图片预览功能
    //     }
    // })
}

function initBinding(){
    var classVlaue = ''
    $('.folderClick').click(function(){
        classVlaue = this.classList.value
        if(!isContains(classVlaue,'folderClick')){
            return
        }
        this.classList.add('bind')
        $.get('/queryFile', {
            place: this.innerText
        }).done(function (data) {
            var temp = JSON.parse(data)
            app.pics = mkPicList(temp.pic,temp.subPath)
            if(isContains(classVlaue,'bind')){
                return
            }
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