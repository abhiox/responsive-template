var smoothscroll = (function(){
    var scrollunits = 0;
    var interval_id = null;
    
    function smoothscroll(){
        if(scrollunits === 0){
            clearInterval(interval_id);
        } else {
            delta = scrollunits>2? 2: scrollunits;
            window.scrollTo(window.scrollX, window.scrollY+delta);
            scrollunits =  scrollunits - delta;
        }
    }
    
    function onPageClick(e){
        e.preventDefault();
        var a_el = this;
        var target_id = a_el.getAttribute('href').substr(1);
        var target_el = document.getElementById(target_id);
        
        var desty = target_el.getBoundingClientRect().top + window.scrollY;
        var curry = window.screenY;
        scrollunits = desty - curry;
        
        interval_id = setInterval(smoothscroll, 1);
    }
    
    function init(){
        var alist = document.querySelectorAll("a[href^='#']");
        for(var i=0; i<alist.length; i++){
            var hrefvalue = alist[i].getAttribute('href');
            if(hrefvalue !== '#'){
                alist[i].addEventListener('click',onPageClick);
            }
        }
    }
    
    return {
        init: init
    }
})();