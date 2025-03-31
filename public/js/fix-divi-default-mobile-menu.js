(function($) {
	$(document).ready(function() {
		if( !$("body").hasClass("et-tb-has-header") ){
			// Set up dropdown toggle buttons for main menu items with children
			$(".et_mobile_menu .menu-item-has-children > a").each(function(){
				var buttonHtml;
				var linkText = $(this).text();
				if($(this).attr("href")=="#"){
					buttonHtml = '<button class="menu-trigger menu-trigger-without-link" aria-expanded="false"><span class="btn-label">' + linkText + '</span><span class="icon-holder"><i class="fd-open" aria-hidden="false"><span class="screen-reader-text">Open ' + linkText +' Submenu</span></i><i class="fd-close" aria-hidden="true"><span class="screen-reader-text">Close ' + linkText +' Submenu</span></i></span></button>';
					$(this).replaceWith(buttonHtml);
				}
				else{
					var spanHtml = '<span class="link-button-wrap"></span>';
					buttonHtml = '<button class="menu-trigger menu-trigger-with-link" aria-expanded="false"><i class="fd-open" aria-hidden="false"><span class="screen-reader-text">Open ' + linkText +' Submenu</span></i><i class="fd-close" aria-hidden="true"><span class="screen-reader-text">Close ' + linkText +' Submenu</span></i></button>';
					$(this).wrap(spanHtml);
					$(buttonHtml).insertAfter($(this));
				}
			});

			//add aria for menu toggle
			$(".mobile_menu_bar").attr({role:"button", "aria-expanded":"false", "aria-label":"Menu Toggle", tabindex:0});

			$(".mobile_menu_bar").on("click",function(){
				if($(".et_mobile_menu").is(":hidden")){
					$(".mobile_menu_bar").attr("aria-expanded","true");
					setTimeout(function () {
						$(".mobile_menu_bar").focus();
					}, 100);
				}
				else{
					$(".mobile_menu_bar").attr("aria-expanded","false");
					$(".mobile_menu_bar").focus();
				}
			});

			//keyboard control for mobile menu
			$(".mobile_menu_bar").on("keydown",function(n){		
				if(n.keyCode==13){  //enter
					if($(".et_mobile_menu").is(":hidden")){
						$(".mobile_menu_bar").attr("aria-expanded","true");
						$(".mobile_nav").removeClass("closed").addClass("opened");
						$(".et_mobile_menu").attr("style","display:block");
						$(".et_mobile_menu>li:last-child").addClass("last");
						$(".et_mobile_menu>li:first-child").addClass("first");
						setTimeout(function () {
							$(".mobile_menu_bar").focus();
						}, 100);
					}
					else{
						$(".mobile_menu_bar").attr("aria-expanded","false");
						$(".mobile_nav").removeClass("opened").addClass("closed");
						$(".et_mobile_menu").attr("style","display:none");
						$(".mobile_menu_bar").focus();
					}
				}
			});

			$(".et_mobile_nav_menu").children().on("keydown", function(n){
				if(n.keyCode==27 || n.keyCode==35 || n.keyCode==36){ //esc, end, home
					$(".mobile_menu_bar").attr("aria-expanded","false");
					$(".mobile_nav").removeClass("opened").addClass("closed");
					$(".et_mobile_menu").attr("style","display:none");
					$(".mobile_menu_bar").focus();
				}
			});


			//click control for submenu
			$(".mobile_nav").on("click", "button", function(){
				if($(this).hasClass("open")){
					//close things
					$(this).removeClass("open");
					$(this).find(".fd-open").attr("aria-hidden","true");
					$(this).find(".fd-close").attr("aria-hidden","false");
					$(this).attr("aria-expanded","false");

					if($(this).hasClass("menu-trigger-with-link")){
						$(this).parent().next("ul.sub-menu").removeClass("open");
					}
					else{
						$(this).next("ul.sub-menu").removeClass("open"); 
					}	
				}
				else{
					//open things
					$(this).addClass("open");
					$(this).find(".fd-open").attr("aria-hidden","false");
					$(this).find(".fd-close").attr("aria-hidden","true");
					$(this).attr("aria-expanded","true");
					if($(this).hasClass("menu-trigger-with-link")){
						$(this).parent().next("ul.sub-menu").addClass("open"); 
					}
					else{
						$(this).next("ul.sub-menu").addClass("open");
					}	
				}
			});

			//keyboard control
			$(".mobile_nav").on("keydown", "a", function(n){
				if(n.keyCode==9 || n.keyCode==39 || n.keyCode==40){ //tab, right arrow, down arrow
					if($(this).parent().hasClass("last") || $(this).parent().parent().hasClass("last")){
						n.preventDefault();
						if( $(this).next("button").length > 0){
							$(this).next("button").focus();
						}
						else{
							$(".mobile_menu_bar").focus();
						}
					}
				}
				if(n.keyCode==37 || n.keyCode==38 || n.keyCode==16){ //up arrow, left arrow, shift
					if($(this).parent().hasClass("first") || $(this).parent().parent().hasClass("first")){
						n.preventDefault();
						$(".mobile_menu_bar").focus();
					}
				}
			});

			$(".mobile_nav").on("keydown", "button", function(n){
				if(n.keyCode==9 || n.keyCode==39 || n.keyCode==40){ //tab, right arrow, down arrow
					if($(this).parent().hasClass("last") || $(this).parent().parent().hasClass("last")){
						n.preventDefault();
						$(".mobile_menu_bar").focus();
					}
				}
				if(n.keyCode==37 || n.keyCode==38 || n.keyCode==16){ //up arrow, left arrow, shift
					if($(this).parent().hasClass("first") || $(this).parent().parent().hasClass("first")){
						n.preventDefault();
						if( $(this).prev("a").length > 0){
							$(this).prev("a").focus();
						}
						else{
							$(".mobile_menu_bar").focus();
						}
					}
				}
				if(n.keyCode==13){//enter - open/close submenu
					n.preventDefault();
					if($(this).hasClass("open")){
						$(this).removeClass("open");
						$(this).find(".fd-open").attr("aria-hidden","true");
						$(this).find(".fd-close").attr("aria-hidden","false");
						$(this).attr("aria-expanded","false");

						if($(this).hasClass("menu-trigger-with-link")){
							$(this).parent().next("ul.sub-menu").removeClass("open");
						}
						else{
							$(this).next("ul.sub-menu").removeClass("open"); 
						}	
					}
					else{
						$(this).addClass("open");
						$(this).find(".fd-open").attr("aria-hidden","false");
						$(this).find(".fd-close").attr("aria-hidden","true");
						$(this).attr("aria-expanded","true");
						if($(this).hasClass("menu-trigger-with-link")){
							$(this).parent().next("ul.sub-menu").addClass("open");
							$(this).parent().next("ul.sub-menu").find("li:first-child a").focus();
						}
						else{
							$(this).next("ul.sub-menu").addClass("open");
							$(this).next("ul.sub-menu").find("li:first-child a").focus();
						}
					}
				}
			});


			//arrow controls
			$(".mobile_nav").on("keydown", "a", function(n){
				if(n.keyCode==39 || n.keyCode==40){ //right arrow, down arrow
					if( $(this).next("button").length > 0){
						$(this).next("button").focus();
					}
					else{
						if($(this).parent().hasClass("link-button-wrap")){
							if($(this).parent().parent().next().find(">:first-child").hasClass("link-button-wrap")){
								$(this).parent().parent().next().find(">:first-child").find(">:first-child").focus();   
							}
							else{
								$(this).parent().parent().next().find(">:first-child").focus(); 
							}  
						}
						else{
							if($(this).parent().next().find(">:first-child").hasClass("link-button-wrap")){
								$(this).parent().next().find(">:first-child").find(">:first-child").focus();   
							}
							else{
								$(this).parent().next().find(">:first-child").focus(); 
							}
						}		
					}
				}
				if(n.keyCode==37 || n.keyCode==38){ //up arrow, left arrow
					if($(this).parent().hasClass("link-button-wrap")){
						if($(this).parent().parent().prev().find(">:first-child").hasClass("link-button-wrap")){
							$(this).parent().parent().prev().find(">:first-child").find(">:first-child").focus();   
						}
						else{
							$(this).parent().parent().prev().find(">:first-child").focus(); 
						}  
					}
					else{
						if($(this).parent().prev().find(">:first-child").hasClass("link-button-wrap")){
							$(this).parent().prev().find(">:first-child").find(">:first-child").focus();   
						}
						else{
							$(this).parent().prev().find(">:first-child").focus(); 
						} 
					}
				}
			});

			$(".mobile_nav").on("keydown", "button", function(n){
				if(n.keyCode==39 || n.keyCode==40){ //right arrow, down arrow
					if($(this).parent().hasClass("link-button-wrap")){
						if($(this).parent().parent().next().find(">:first-child").hasClass("link-button-wrap")){
							$(this).parent().parent().next().find(">:first-child").find(">:first-child").focus();   
						}
						else{
							$(this).parent().next().find(">:first-child").focus(); 
						}	   
					}
					else{
						if($(this).parent().next().find(">:first-child").hasClass("link-button-wrap")){
							$(this).parent().parent().next().find(">:first-child").find(">:first-child").focus();   
						}
						else{
							$(this).parent().next().find(">:first-child").focus(); 
						}
					}
				}
				if(n.keyCode==37 || n.keyCode==38){ //up arrow, left arrow
					if( $(this).prev("a").length > 0){
						$(this).prev("a").focus();   
					}
					else{
						if($(this).parent().prev().find(">:first-child").hasClass("link-button-wrap")){
							$(this).parent().prev().find(">:first-child").find(">:first-child").focus();   
						}
						else{
							$(this).parent().prev().find(">:first-child").focus(); 
						}
					}
				}
			});

			//submenu controls	
			$(".sub-menu li").on("keydown",function(n){
				if(n.keyCode==27){//Escape	
					$(this).parent().parent().removeClass("open");
					if($(this).parent().prev().hasClass("link-button-wrap")){
						$(this).parent().prev().find("button").removeClass("open");
						$(this).parent().prev().find("button").attr("aria-expanded","false");
						$(this).parent().prev().find("button").find(".fd-close").attr("aria-hidden","false");
						$(this).parent().prev().find("button").find(".fd-open").attr("aria-hidden","true");
					}
					else{
						$(this).parent().prev().removeClass("open");
						$(this).parent().prev().attr("aria-expanded","false");
						$(this).parent().prev().find(".fd-close").attr("aria-hidden","false");
						$(this).parent().prev().find(".fd-open").attr("aria-hidden","true");
					}
				}
				if(e.keyCode==9 || n.keyCode==39 || n.keyCode==40){//right and down arrow
					if($(this).is(":last-child")){
						$(this).blur();
						if($(this).parent().prev().hasClass("link-button-wrap")){
							$(this).parent().prev().find(".menu-trigger").focus();
						}
						else{
							$(this).parent().prev().focus();
						}
					}
					else{
						$(this).blur();
						$(this).next().find("a").focus();
					}

				}
				if(n.keyCode==37 || n.keyCode==38 || n.keyCode==16){//left and up arrow
					if($(this).is(":first-child")){
						$(this).blur();
						if($(this).parent().prev().hasClass("link-button-wrap")){
							$(this).parent().prev().find(".menu-trigger").focus();
						}
						else{
							$(this).parent().prev().focus();
						}	
					}
					else{
						$(this).blur();
						$(this).prev().find("a").focus();
					}
				}
			});
		}
	});
})(jQuery);
