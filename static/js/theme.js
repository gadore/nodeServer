function setTheme(){
    var date = new Date()
    var hour = date.getHours()
    if(hour < 6 && hour > 18){
        $id('body').classList.remove('themeNight')
        $id('body').classList.add('themeDay')

        for(var i=0;i<$tag('a').length;i++){
            $tag('a')[i].style.color = 'black'
        }
    }else{
        $id('body').classList.add('themeNight')
        $id('body').classList.remove('themeDay')
        
        for(var i=0;i<$tag('a').length;i++){
            $tag('a')[i].style.color = 'white'
        }
    }
}