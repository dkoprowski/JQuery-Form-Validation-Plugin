/* jshint browser: true, jquery: true, devel: true, unused: true */
(function ( $ ) {
 
    var shade = "#556b2f";
 
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
    var testInput = $('#testInput');
    testInput.click(function(){
       testInput.checkEmail();     
    });

});