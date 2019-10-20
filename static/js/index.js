var app = new Vue({
    el: "#root",
    data: {
        tags: [
            { link: 'blog', text: 'blog' ,class:'fa fa-newspaper-o'},
            { link:'mates', text: 'mates' ,class:'fa fa-users'},
            { link: 'views/fileMS.html', text:'files' ,class:'fa fa-camera-retro'},
            { link:'words', text: 'words' ,class:'fa fa-first-order'},
        ]
    }
})
function init() {
    setTheme()
    // setInterval(()=>setTheme(), 60*1000)
}

function buttonClick() {
    var jqxhr = $.get('/queryFile', {
        name:'front'
    }).done(function (data) {
        console.log(JSON.parse(data))
    })
}