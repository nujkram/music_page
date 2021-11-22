// Custom Script
// Developed by: Samson.Onna
// CopyRights : http://webthemez.com
var customScripts = {
    profile: function () {
     	 var portfolio = $('#portfolio');
		var items = $('.items', portfolio); 
		var filters = $('.filters li a', portfolio); 
	
		items.imagesLoaded(function() {
			items.isotope({
				itemSelector: '.item',
				layoutMode: 'fitRows',
				transitionDuration: '0.7s'
			});
		});
		
		filters.click(function(){
			var el = $(this);
			filters.removeClass('active');
			el.addClass('active');
			var selector = el.attr('data-filter');
			items.isotope({ filter: selector });
			return false;
		});            
    },
    fancybox: function () {
        // fancybox
        $(".fancybox").fancybox();
    },
    onePageNav: function () {

        $('#mainNav').onePageNav({
            currentClass: 'active',
            changeHash: false,
            scrollSpeed: 950,
            scrollThreshold: 0.2,
            filter: '',
            easing: 'swing',
            begin: function () {
                //I get fired when the animation is starting
            },
            end: function () {
                   //I get fired when the animation is ending
				if(!$('#main-nav ul li:first-child').hasClass('active')){
					$('.header').addClass('addBg');
				}else{
						$('.header').removeClass('addBg');
				}
				
            },
            scrollChange: function ($currentListItem) {
                //I get fired when you enter a section and I pass the list item of the section
				if(!$('#main-nav ul li:first-child').hasClass('active')){
					$('.header').addClass('addBg');
				}else{
						$('.header').removeClass('addBg');
				}
			}
        });
		
		$("a[href='#top']").click(function () {
                $("html, body").animate({ scrollTop: 0 }, "slow");
                return false;
            });
			$("a[href='#basics']").click(function () {
                $("html, body").animate({ scrollTop: $('#services').offset().top - 75 }, "slow"); 
                return false;
            });
    }, 
    owlSlider: function () {
        var owl = $("#owl-demo");
        owl.owlCarousel();
        // Custom Navigation Events
        $(".next").click(function () {
            owl.trigger('owl.next');
        })
        $(".prev").click(function () {
            owl.trigger('owl.prev');
        })
    },
    bannerHeight: function () {
        var bHeight = $(".banner-container").height();
        $('#da-slider').height(bHeight);
        $(window).resize(function () {
            var bHeight = $(".banner-container").height();
            $('#da-slider').height(bHeight);
        });
    },
	waySlide: function(){
		  	/* Waypoints Animations
		   ------------------------------------------------------ */		   			  
		 
			 						 
		},
		fitText: function(){			  
				setTimeout(function() {			
				$('h1.responsive-headline').fitText(1.2, { minFontSize: '16px', maxFontSize: '30px' });			
				}, 100);
		},
    init: function () {
        customScripts.onePageNav();
        customScripts.profile();
        customScripts.fancybox(); 
        customScripts.owlSlider();
		customScripts.waySlide();
		customScripts.fitText();
        customScripts.bannerHeight();
    }
}
$('document').ready(function () {
	var music = document.getElementById('music'); // id for audio element
      var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
      var pButton = document.getElementById('pButton'); // play button
      var playhead = document.getElementById('playhead'); // playhead
      var timeline = document.getElementById('timeline'); // timeline

      // timeline width adjusted for playhead
      var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

      // play button event listenter
      pButton.addEventListener("click", play);

      // timeupdate event listener
      music.addEventListener("timeupdate", timeUpdate, false);

      // makes timeline clickable
      timeline.addEventListener("click", function (event) {
          moveplayhead(event);
          music.currentTime = duration * clickPercent(event);
      }, false);

      // returns click as decimal (.77) of the total timelineWidth
      function clickPercent(event) {
          return (event.clientX - getPosition(timeline)) / timelineWidth;
      }

      // makes playhead draggable
      playhead.addEventListener('mousedown', mouseDown, false);
      window.addEventListener('mouseup', mouseUp, false);

      // Boolean value so that audio position is updated only when the playhead is released
      var onplayhead = false;

      // mouseDown EventListener
      function mouseDown() {
          onplayhead = true;
          window.addEventListener('mousemove', moveplayhead, true);
          music.removeEventListener('timeupdate', timeUpdate, false);
      }

      // mouseUp EventListener
      // getting input from all mouse clicks
      function mouseUp(event) {
          if (onplayhead == true) {
              moveplayhead(event);
              window.removeEventListener('mousemove', moveplayhead, true);
              // change current time
              music.currentTime = duration * clickPercent(event);
              music.addEventListener('timeupdate', timeUpdate, false);
          }
          onplayhead = false;
      }
      // mousemove EventListener
      // Moves playhead as user drags
      function moveplayhead(event) {
          var newMargLeft = event.clientX - getPosition(timeline);

          if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
              playhead.style.marginLeft = newMargLeft + "px";
          }
          if (newMargLeft < 0) {
              playhead.style.marginLeft = "0px";
          }
          if (newMargLeft > timelineWidth) {
              playhead.style.marginLeft = timelineWidth + "px";
          }
      }

      // timeUpdate
      // Synchronizes playhead position with current point in audio
      function timeUpdate() {
          var playPercent = timelineWidth * (music.currentTime / duration);
          playhead.style.marginLeft = playPercent + "px";
          if (music.currentTime == duration) {
              pButton.className = "";
              pButton.className = "fas fa-play";
          }
      }

      //Play and Pause
      function play() {
          // start music
          if (music.paused) {
              music.play();
              // remove play, add pause
              pButton.className = "";
              pButton.className = "fas fa-pause";
          } else { // pause music
              music.pause();
              // remove pause, add play
              pButton.className = "";
              pButton.className = "fas fa-play";
          }
      }

      // Gets audio file duration
      music.addEventListener("canplaythrough", function () {
          duration = music.duration;
      }, false);

      // getPosition
      // Returns elements left position relative to top-left of viewport
      function getPosition(el) {
          return el.getBoundingClientRect().left;
      }

    customScripts.init();
});

