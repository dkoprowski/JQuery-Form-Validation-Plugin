/* jshint browser: true, jquery: true, devel: true, unused: true */
(function ($) {



    function inputFieldPassed(field) {
        field.addClass("good");
        field.removeClass("bad");
    }

    function inputFieldRejected(field) {
        field.addClass("bad");
        field.removeClass("good");
    }
    // regex
    $.fn.checkRegex = function (regex) {
        if (validateRegex(this.val(), regex)) {
            inputFieldPassed(this);
        } else {
            inputFieldRejected(this);
        }
        return this;        
    };

    function validateRegex(text, regex) {
        return regex.test(text);
    };

    // ----------------------------------
    // email
    $.fn.checkEmail = function () {
        if (validateEmail(this.val())) {
            inputFieldPassed(this);
        } else {
            inputFieldRejected(this);
        }
        return this;
    };

    function validateEmail(text) {
        var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        return emailRegex.test(text);
    };
} (jQuery));

$(function () {
    var regexInput = $('#regexInput');
    var emailInput = $('#emailInput');
    var submitBtn = $('#submit');

    $("input").each(function (index) {
        $(this).change(function () {
            validateAll();
        });
    });

    function validateAll() {
        regexInput.checkRegex(/[A-Z].+/);
        emailInput.checkEmail();

        if (emailInput.hasClass("good") && regexInput.hasClass("good")) {
            submitBtn.removeAttr('disabled');
        }
        else {
            submitBtn.attr('disabled', 'disabled');
        }
    }

});