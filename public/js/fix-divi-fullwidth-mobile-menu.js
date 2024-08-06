// JavaScript Document

(function($) {
	$(document).ready(function() {
		if( !$("body").hasClass("et-tb-has-header") ){
			// Set up dropdown toggle buttons for main menu items with children
			$(".et_mobile_menu .menu-item-has-children > a").each(function(){
				var buttonHtml;
				var linkText = $(this).text();
				if($(this).attr("href")=="#"){
					buttonHtml = '<button class="menu-trigger menu-trigger-without-link" aria-expanded="false">' + linkText + '<i class="fd-open" aria-hidden="false"><span class="screen-reader-text">Open ' + linkText +' Submenu</span></i><i class="fd-close" aria-hidden="true"><span class="screen-reader-text">Close ' + linkText +' Submenu</span></i></button>';
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
				if($(".mobile_menu_bar").attr("aria-expanded")=="false"){
					$(".mobile_menu_bar").attr("aria-expanded","true");
					setTimeout(function () {
						$(".et_slide_in_menu_container .et_toggle_fullscreen_menu").focus();
					}, 100);
				}
				else{
					$(".mobile_menu_bar").attr("aria-expanded","false");
					$("#et-top-navigation .mobile_menu_bar").focus();
				}
			});

			//keyboard control for mobile menu
			$(".mobile_menu_bar").on("keydown",function(n){		
				if(n.keyCode==13){  //enter
					$(".et_mobile_menu>li:last-child").addClass("last");
					$(".et_mobile_menu>li:first-child").addClass("first");
					setTimeout(function () {
						$("#et-top-navigation .mobile_menu_bar").click();
					}, 100);
				}
			});

			$(".et_slide_in_menu_container").children().on("keydown", function(n){
				if(n.keyCode==27 || n.keyCode==35 || n.keyCode==36){ //esc, end, home
					setTimeout(function () {
						$("#et-top-navigation .mobile_menu_bar").click();
					}, 100);
				}
			});

			//click control for submenu
			$(".et_pb_fullscreen_nav_container").on("click", "button", function(){
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

			$(".et_pb_fullscreen_nav_container").on("keydown", "button", function(n){
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
						$(this).parent().next("ul.sub-menu").addClass("open");
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

			//keyboard controls
			$(".et_pb_fullscreen_nav_container").on("keydown", "a", function(n){
				n.preventDefault();
				if(n.keyCode==9 || n.keyCode==39 || n.keyCode==40){ //tab, right arrow, down arrow
					if($(this).parent().hasClass("last") || $(this).parent().parent().hasClass("last")){
						if( $(this).next("button").length > 0){
							$(this).next("button").focus();
						}
						else{
							$(".et_slide_in_menu_container .et_toggle_fullscreen_menu").focus();
						}
					}
					else{
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
				}
				if(n.keyCode==37 || n.keyCode==38 || n.keyCode==16){ //left arrow, up arrow, shift
					n.preventDefault();
					if($(this).parent().hasClass("first") || $(this).parent().parent().hasClass("first")){
						$(".et_slide_in_menu_container .et_toggle_fullscreen_menu").focus();
					}
					else{
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
				}
			});

			$(".et_pb_fullscreen_nav_container").on("keydown", "button", function(n){
				if(n.keyCode==9){//tab
				n.preventDefault();
					if($(this).hasClass("open")){
						if($(this).parent().hasClass("link-button-wrap")){
							$(this).parent().next(".sub-menu.open").find(":first-child").find(":first-child").focus();   
						}
						else{
							$(this).next(".sub-menu.open").find(":first-child").find(":first-child").focus(); 
						}
					}
					else{
						if($(this).parent().hasClass("last") || $(this).parent().parent().hasClass("last")){	
							$(".et_slide_in_menu_container .et_toggle_fullscreen_menu").focus();
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
				}
				if(n.keyCode==39 || n.keyCode==40){ //right arrow, down arrow
					n.preventDefault();
					if($(this).parent().hasClass("last") || $(this).parent().parent().hasClass("last")){					
						$(".et_slide_in_menu_container .et_toggle_fullscreen_menu").focus();
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
				if(n.keyCode==37 || n.keyCode==38 || n.keyCode==16){ //up arrow, left arrow, shift
					n.preventDefault();
					if($(this).parent().hasClass("first") || $(this).parent().parent().hasClass("first")){
						if( $(this).prev("a").length > 0){
							$(this).prev("a").focus();   
						}
						else{
							$(".et_slide_in_menu_container .et_toggle_fullscreen_menu").focus();
						}
					}
					else{
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
				if(n.keyCode==9 || n.keyCode==39 || n.keyCode==40){//right and down arrow
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
