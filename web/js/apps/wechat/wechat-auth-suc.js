$(document).ready(function() { 
    function jump(count) {    
        window.setTimeout(function(){  
        	opener=null; 
            count--;    
            if(count > 0) {    
                $('#num').text(count);
                jump(count);    
            } else {    
            	close();    
            }    
        }, 1000);    
    }    
    jump(5);    
});    
	
