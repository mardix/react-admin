(function($){

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('.status').fadeOut();
		$('.preloader').delay(350).fadeOut('slow');
	});

	$(document).ready(function() {

		/* ---------------------------------------------- /*
		 * Animated scrolling / Scroll Up
		/* ---------------------------------------------- */

		$('a[href*=#]').bind("click", function(e){
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);
			e.preventDefault();
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});

		$(document).on('click','.navbar-collapse.in',function(e) {
			if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
				$(this).collapse('hide');
			}
		});

		/* =======================================
		 * Video Embed Async Load
		 * =======================================
		 */
		$( window ).on( 'load', function() {
			$( '.video-async' ).each( function( i, el ) {
				var $el = $( el ),
				    source = $el.data( 'source' ),
				    video = $el.data( 'video' ),
				    color = $el.data( 'color' );

				if ( source == 'vimeo' ) {
					$el.attr( 'src', '//player.vimeo.com/video/' + video + ( color ? '?color=' + color : '' ) );
				} else if ( source == 'youtube' ) {
					$el.attr( 'src', '//www.youtube.com/embed/' + video + '?rel=0' );
				}

			});
		});


		

		//-------Appearence of navigation----------

		//   $('header .nav').onePageNav({
		//     scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
		//     scrollOffset: 45 //Height of Navigation Bar
		//   });
		//
		//   var headerDynamic = $("#header")
		//   $(window).scroll(function() {
		//
		// 	//if (winWidth > 767) {
		// 	//   var $scrollHeight = $(window).scrollTop();
		// 	//   if ($scrollHeight > 600) {
         //     //      headerDynamic.slideDown(400);
		// 	//   } else{
         //     //      headerDynamic.slideUp(400);
		// 	//   }
		// 	//}
		//
		// 	 //header version 2
		//
		// 	  var $scrollHeight2 = $(window).scrollTop();
		// 	  if ($scrollHeight2 > 120) {
		// 		$('#header2 nav').addClass('addbg').slideDown(400);
		// 	  } else {
		// 		$('#header2 nav').removeClass('addbg');
		// 	  }
		//
		// 	  //got o top
		// 	  if ($(this).scrollTop() > 200) {
		// 			$('#go-to-top a').fadeIn('slow');
		// 		  } else {
		// 			$('#go-to-top a').fadeOut('slow');
		// 	  }
		// });
  
  

	/* ---------------------------------------------- /*
	 * WOW Animation When You Scroll
	/* ---------------------------------------------- */

		wow = new WOW({
			mobile: false
		});
		wow.init();

	});


    /* Newsletter */
	$('.newsletter_wrapper .newsletter_form').each( function(){
		var form = $(this);
		//form.validate();
		form.submit(function(e) {
			if (!e.isDefaultPrevented()) {
				jQuery.post(this.action,{
					'email':$('input[name="nf_email"]').val(),
				},function(data){
					form.fadeOut('fast', function() {
						$(this).siblings('p.newsletter_success_box').show();
					});
				});
				e.preventDefault();
			}
		});
	});	

})(jQuery);


/*-----------------------------------------------------------------------------------*/
/* SLIDER
/*-----------------------------------------------------------------------------------*/

$("#owl-screen").owlCarousel({ 
    autoPlay: 3000, //Set AutoPlay to 3 seconds
    items : 4,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,3],
	stopOnHover : true,
    navigation : true, // Show next and prev buttons
    pagination : false,
	navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
});



