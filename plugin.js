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

    $.fn.passwordPower = function () {
        if (this.val().length < 6) {
            $('#hint0').show();
        } else {
            $('#hint0').hide();
        }

        if (!hasLowerCase(this.val())) {
            $('#hint1').show();
        } else {
            $('#hint1').hide();
        }

        if (!hasUpperCase(this.val())) {
            $('#hint2').show();
        } else {
            $('#hint2').hide();
        }

        if (!hasDigitsCase(this.val())) {
            $('#hint3').show();
        } else {
            $('#hint3').hide();
        }

        if (!hasSpecialCharacter(this.val())) {
            $('#hint4').show();
        } else {
            $('#hint4').hide();
        }
        return this;
    };

    function hasLowerCase(str) {
        return (/[a-z]/.test(str));
    }

    function hasUpperCase(str) {
        return (/[A-Z]/.test(str));
    }

    function hasDigitsCase(str) {
        return (/[0-9]/.test(str));
    }

    function hasSpecialCharacter(str) {
        return (/[^a-zA-Z\d\s:]/.test(str));
    }
} (jQuery));

$(function () {
    var regexInput = $('#regexInput');
    var emailInput = $('#emailInput');
    var passwordInput = $('#password');
    var passhint = $('#passhint');
    var submitBtn = $('#submit');

    $("input").each(function () {
        $(this).change(function () {
            validateAll();
        });
    });

    passwordInput.keyup(function () {
        passwordInput.checkPassword().passwordPower(passhint);
    });

    function validateAll() {
        regexInput.checkRegex(/[A-Z].+/);
        emailInput.checkEmail();
        passwordInput.checkPassword().passwordPower(passhint);

        if (emailInput.hasClass("good") && regexInput.hasClass("good") && passwordInput.hasClass("good")) {
            submitBtn.removeAttr('disabled');
        }
        else {
            submitBtn.attr('disabled', 'disabled');
        }
    }

});