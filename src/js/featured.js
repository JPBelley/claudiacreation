if(window.innerWidth > 767) {
  $('.hover h2').on('click', function() {
    $('.box').addClass('hide');
    $(this).parents('.box').removeClass('hide').addClass('full-width');
  });

  $('.hover .close').on('click', function() {
    $(this).parents('.box').removeClass('full-width');
    setTimeout(function() {
      $('.box').removeClass('hide');
    }, 200);
  });
}
