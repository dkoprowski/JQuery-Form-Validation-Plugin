/* jshint browser: true, jquery: true, devel: true, unused: true */
(function ( $ ) {
    // regex
    $.fn.checkRegex = function(regex) {
        if(validateRegex(this.val(), regex)){
            this.addClass("good");
            this.removeClass("bad");
        }else{
            this.addClass("bad");
            this.removeClass("good");                        
        }
        return this;
    };
    
    function validateRegex(text, regex){
        console.log(regex.test(text));
        return regex.test(text);
    };
 
 // ----------------------------------
 // email
     $.fn.checkEmail = function() {
        if(validateEmail(this.val())){
            this.addClass("good");
        }else{
            this.addClass("bad");            
        }
        return this;
    };
    
    function validateEmail(text){
        return true;
    };
}( jQuery ));

$(function () {
    var regexInput = $('#regexInput');
    regexInput.click(function(){
       regexInput.checkRegex(/[A-Z].+/);     
    });

});