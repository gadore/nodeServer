var app = new Vue({
    el: "#root",
    data: {
        tags: [
            { text: 'blog' ,class:'fa fa-newspaper-o'},
            { text: 'mates' ,class:'fa fa-users'},
            { text: 'pic' ,class:'fa fa-camera-retro'},
            { text: 'words' ,class:'fa fa-first-order'},
        ]
    }
})
function init() {
    setTheme()
    // setInterval(()=>setTheme(), 60*1000)
}