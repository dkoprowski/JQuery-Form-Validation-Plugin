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
    }

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
    }

    //--------------------------------
    //password
    $.fn.checkPassword = function () {
        if (validatePassword(this.val())) {
            inputFieldPassed(this);
        } else {
            inputFieldRejected(this);
        }
        return this;
    };

    function validatePassword(text) {
        if (text.length > 5) {
            return true;
        } else {
            return false;
        }
    }
    $.fn.exists = function () {
        return this.length > 0;
    };

    $.fn.passwordPower = function (hintParent, hintId, hint, hintRegex) {
        if (!validateRegex(this.val(), hintRegex)) {
            $ul = $('<ul></ul>').attr('id', hintId);
            if (!$('#' + hintId).exists()) {
                hintParent.append($ul);
            }

            $ul.text(hint);
            $('#' + hintId).show();
        } else {
            $('#' + hintId).hide();
        }
        return this;
    };

} (jQuery));

$(function () {
    var regexInput = $('#regexInput');
    var emailInput = $('#emailInput');
    var passwordInput = $('#password');
    var passhint = $('#passhint').find('li');
    var submitBtn = $('#submit');

    $("input").each(function () {
        $(this).change(function () {
            validateAll();
        });
    });

    passwordInput.keyup(function () {
        validatePass();


    });

    function validateAll() {
        regexInput.checkRegex(/[A-Z].+/);
        emailInput.checkEmail();

        validatePass();

        if (emailInput.hasClass("good") && regexInput.hasClass("good") && passwordInput.hasClass("good")) {
            submitBtn.removeAttr('disabled');
        }
        else {
            submitBtn.attr('disabled', 'disabled');
        }
    }

    function validatePass(){
        passwordInput.checkPassword().passwordPower(passhint, 'hint5', 'Use 3 upper case inorder!', /[A-Z][A-Z][A-Z]+/);
        passwordInput.checkPassword().passwordPower(passhint, 'hint1', 'Use digit', /[0-9]/);
        passwordInput.checkPassword().passwordPower(passhint, 'hint2', 'Use lower case', /[a-z]+/);
        passwordInput.checkPassword().passwordPower(passhint, 'hint3', 'Use special char', /[^a-zA-Z\d\s:]/);

        if (passwordInput.hasClass("good")) {
            $('#hint0').hide();
        } else {
            $('#hint0').show();
        }
    }
});