restoreValue('form-name');
restoreValue('form-mail');
restoreValue('form-subject');
restoreValue('form-message');

function restoreValue(inputId) {
    var element = document.getElementById(inputId);
    element.value = localStorage.getItem(inputId);
    element.oninput = function () {
        localStorage.setItem(this.id, this.value);
    };
}

document.getElementsByClassName('block-team-members-foto-marketer')[0].onclick = addFotoMarketer;
function addFotoMarketer() {
    this.style.background = 'url("./images/team/marketer.jpg") no-repeat';
    this.style.backgroundSize = 'cover';
}
document.getElementsByClassName('block-team-members-foto-coder')[0].onclick = addFotoCoder;
function addFotoCoder() {
    this.style.background = 'url("./images/team/coder.jpg") no-repeat';
    this.style.backgroundSize = 'cover';
}
document.getElementsByClassName('block-team-members-foto-designer')[0].onclick = addFotoDesigner;
function addFotoDesigner() {
    this.style.background = 'url("./images/team/designer.jpg") no-repeat';
    this.style.backgroundSize = 'cover';
}

$('#continueButton').click(function () {
    $('#exampleModalCenter').modal('hide');
    $('html, body').animate({
        scrollTop: $('#services').offset().top
    }, 1000);
});

$(window).scroll(function() {
    if($(this).scrollTop() != 0) {
        $('#scrollTopButton').fadeIn();
    } else {
        $('#scrollTopButton').fadeOut();
    }
});

$('#scrollTopButton').click(function() {
    $('body,html').animate({scrollTop:0},800);
}).fadeOut();

new Tooltip($('.block-home-bottom__button'), {
    placement: 'top',
    title: "Click here!"
});

$('.block-team-members-foto').each(function (index, value) {
    new Tooltip(value, {
        placement: 'top',
        title: "Click here!"
    });
});

new Tooltip($('.block-home-top-logotype__logo'), {
    placement: 'right',
    title: "Logotype"
});

$('.image-popup-fit-width').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    image: {
        verticalFit: false
    }
});

