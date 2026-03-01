// JavaScript Document

(function($) {
	function menuTriggerClose(r) { 
		$(r).closest("li").find(".sub-menu li.open").each(function(){
			$(this).removeClass("open et-touch-hover et-show-dropdown et-hover");
			$(this).find("button.open .fd-close").attr("aria-hidden","false");
			$(this).find("button.open .fd-open").attr("aria-hidden","true");
			$(this).find("button.open").removeClass("open").attr("aria-expanded","false");
		});
			
		$(r).removeClass("open").attr("aria-expanded","false");
		$(r).find(".fd-close").attr("aria-hidden","false");
		$(r).find(".fd-open").attr("aria-hidden","true");
		if($(r).hasClass("menu-trigger-with-link")){
			$(r).parent().parent().removeClass("open et-touch-hover et-show-dropdown et-hover");
		}
		else{
			$(r).parent().removeClass("open et-touch-hover et-show-dropdown et-hover");
		}
	}
	
	function menuTriggerOpen(r) {
		if($(r).closest(".sub-menu").length>0){
			$(r).closest(".sub-menu").find("li.menu-item.open").each(function(){
				menuTriggerClose($(this).find("button.open"));
			});
		}
		else{
			$("#top-menu>li.menu-item.open").each(function(){
				menuTriggerClose($(this).find("button.open"));
			});
		}
		
		$(r).addClass("open"); 
		if($(r).hasClass("menu-trigger-with-link")){
			$(r).parent().parent().addClass("open");
		}
		else{
			$(r).parent().addClass("open");
		}
		$(r).attr("aria-expanded","true");
		$(r).find(".fd-close").attr("aria-hidden","true");
		$(r).find(".fd-open").attr("aria-hidden","false");		
	}
	
	$(document).ready(function() {
		if( !$("body").hasClass("et-tb-has-header") ){
			// Set up dropdown toggle buttons for main menu items with children
			$(".et_mobile_menu .menu-item-has-children > a").each(function(){
				var buttonHtml;
				var linkText = $(this).text();
				if($(this).attr("href")=="#"){
					buttonHtml = '<button class="menu-trigger menu-trigger-without-link" aria-expanded="false">' + linkText + '<i class="fd-open" aria-hidden="false"><span class="screen-reader-text">' + linkText +' Submenu</span></i><i class="fd-close" aria-hidden="true"><span class="screen-reader-text">' + linkText +' Submenu</span></i></button>';
					$(this).replaceWith(buttonHtml);
				}
				else{
					var spanHtml = '<span class="link-button-wrap"></span>';
					buttonHtml = '<button class="menu-trigger menu-trigger-with-link" aria-expanded="false"><i class="fd-open" aria-hidden="false"><span class="screen-reader-text">' + linkText +' Submenu</span></i><i class="fd-close" aria-hidden="true"><span class="screen-reader-text">' + linkText +' Submenu</span></i></button>';
					$(this).wrap(spanHtml);
					$(buttonHtml).insertAfter($(this));
				}
			});

			//add aria for menu toggle
			$(".mobile_menu_bar").attr({role:"button", "aria-expanded":"false", "aria-label":"Menu Toggle", "tabIndex": "0"});

			$(".mobile_menu_bar").on("click",function(){
				if($(".mobile_menu_bar").attr("aria-expanded")=="false"){
					$(".mobile_menu_bar").attr("aria-expanded","true");
					$(".et_slide_in_menu_container").attr({"style": "display: block"});
				}
				else{
					$(".mobile_menu_bar").attr("aria-expanded","false");
					$(".et_slide_in_menu_container").attr({"style": "display: none"});
					$(".mobile_menu_bar").focus();
				}
			});

			//keyboard control for mobile menu
			$(".mobile_menu_bar").on("keydown",function(n){		
				if(n.keyCode==13 || n.keyCode==32){  //enter
					$(".mobile_menu_bar").click();
				}
				if(n.keyCode==9){
					if($(this).attr("aria-expanded")=="true"){
						n.preventDefault();
						$(".et_slide_in_menu_container").find('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').first().focus();
					}
				}
			});

			//open/close submenu		
			$(".menu-trigger").on("keydown", function(e) {
				if(!e.which==9){
					if($(e.target.className=="screen-reader-text")){
						if($(e.target).parent().parent().hasClass("open")){
							menuTriggerClose($(e.target).closest(".menu-trigger"));
						}
						else{
							menuTriggerOpen($(e.target).closest(".menu-trigger"));
						}
					}
					else{
						if($(e.target).hasClass("open")){
							menuTriggerClose($(e.target));	
						}
						else{
							menuTriggerOpen($(e.target));
						}
					}
				}
			});
					
			$(".menu-trigger").on("click", function(e) {
				if($(e.target.className=="screen-reader-text")){
					if($(e.target).closest(".menu-trigger").hasClass("open")){
						menuTriggerClose($(e.target).closest(".menu-trigger"));
					}
					else{
						menuTriggerOpen($(e.target).closest(".menu-trigger"));
					}
				}
				else{
					if($(e.target).hasClass("open")){
						menuTriggerClose($(e.target));	
					}
					else{
						menuTriggerOpen($(e.target));
					}
				}
			});
			
			$(".et_pb_fullscreen_nav_container").children().on("keydown", function(n){
				if(n.keyCode==27 || n.keyCode==35 || n.keyCode==36){  //esc, end, home
					setTimeout(function () {
						$(".mobile_menu_bar").click();
					}, 100);
				}
			});
			
			//add support for arrow controls	
			$(".et_pb_fullscreen_nav_container").on("keydown", function(n){
				var activeElement = document.activeElement.tagName;
				var activeElClass = document.activeElement.className;
				
				if( activeElement == 'A'){
					if( n.keyCode==9 || n.keyCode==39 || n.keyCode==40){ //tab, right, down		
						n.preventDefault();
						if(!n.shiftKey){
							if( $(n.target).next("button").length > 0){
								$(n.target).next("button").focus();
							}
							else{
								if( $(n.target).closest("li").is(":last-child") ){
									if($(n.target).closest(".sub-menu").length==0 ){//top level
										$("div[role=main]").find('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').first().focus();
									}
									else{//in a submenu
										if( $(n.target).parents("li.open").last().is(":last-child") ){//if parent is last child
											$("div[role=main]").find('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').first().focus();
										}
										else{//else
											$(n.target).closest("li.open").next().find('button, a[href]').first().focus();
										}
									}
								}
								else{
									$(n.target).closest("li.menu-item").next().find('button, a[href]').first().focus();
								}
							}	
						}
					}
					if(n.which==37 || n.which==38){ //left arrow
						n.preventDefault();
						if( $(n.target).closest("li.menu-item").is(":first-child") ){//is first child
							if( $(n.target).closest(".sub-menu").length==0 ){//top level
								if( $(".et_slide_menu_top").length>0  ){//focusable items above menu
									$(".et_slide_menu_top").find('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').last().focus();
								}
								else{
									$(".mobile_menu_bar").focus();
								}
							}
							else{//sub menu first child
								$(n.target).closest("li.open").find('button, a[href]').first().focus();
							}
						}
						else{//not first child
							$(n.target).closest("li.menu-item").prev().find('button, a[href]').first().focus();
						}
					}
					if(n.which==9){ //tab
						n.preventDefault();
						if(n.shiftKey){
							if( $(n.target).closest("li.menu-item").is(":first-child") ){//is first child
								if( $(n.target).closest(".sub-menu").length==0 ){//top level
									if( $(".et_slide_menu_top").length>0  ){//focusable items above menu
										$(".et_slide_menu_top").find('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').last().focus();
									}
									else{
										$(".mobile_menu_bar").focus();
									}
								}
								else{//sub menu first child
									$(n.target).closest("li.open").find('button, a[href]').first().focus();
								}
							}
							else{//not first child
								$(n.target).closest("li.menu-item").prev().find('button, a[href]').first().focus();
							}
						}
					}
				}
				
				if( activeElement == "BUTTON" || activeElClass == "screen-reader-text" || activeElClass == "fd-open" || activeElClass == "fd-close"){
					if(n.keyCode==9 || n.keyCode==39 || n.keyCode==40){//right, down arrow
						n.preventDefault();
						if(!n.shiftKey){
							if($(n.target).hasClass("open")){
								$(n.target).closest("li.open").find(".sub-menu").find(">:first-child").find('button, a[href]').first().focus();
							}
							else{
								if( $(n.target).closest("li").is(":last-child") ){
									if($(n.target).closest(".sub-menu").length==0 ){//top level
										$("div[role=main]").find('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').first().focus();
									}
									else{//in a submenu
										if( $(n.target).parents("li.open").last().is(":last-child") ){//if parent is last child
											$("div[role=main]").find('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').first().focus();
										}
										else{//else
											$(n.target).closest("li.open").next().find('button, a[href]').first().focus();
										}
									}
								}
								else{
									$(n.target).closest("li.menu-item").next().find('button, a[href]').first().focus();
								}
							}	
						}
					}			
					if(n.which==37 || n.which==38){ //left, up arrow
						n.preventDefault();
						if ($(n.target).closest("li").find(">:first-child").hasClass("link-button-wrap")){
							$(n.target).closest("li").find(">:first-child").find(">:first-child").focus();
						}
						else{
							if($(n.target).parents(".open").length>=1){
								if ($(n.target).closest("li.open").find(">:first-child").hasClass("link-button-wrap")){
									$(n.target).closest("li.open").find(">:first-child").find(">:nth-child(2)").focus();
								}
								else {
									$(n.target).closest("li.open").find(">:first-child").focus();
								}
							}
							else{
								if( $(n.target).closest("li.menu-item").is(":first-child") ){//is first child
									if( $(n.target).closest(".sub-menu").length==0 ){//top level
										if( $(".et_slide_menu_top").length>0  ){//focusable items above menu
											$(".et_slide_menu_top").find('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').last().focus();
										}
										else{
											$(".mobile_menu_bar").focus();
										}
									}
									else{//sub menu first child
										$(n.target).closest("li.open").find('button, a[href]').first().focus();
									}
								}
								else{//not first child
									$(n.target).closest("li.menu-item").prev().find('button, a[href]').first().focus();
								}
							}
						}
					}
					if(n.which==9){ //tab
						n.preventDefault();
						if(n.shiftKey){
							if ($(n.target).closest("li").find(">:first-child").hasClass("link-button-wrap")){
								$(n.target).closest("li").find(">:first-child").find(">:first-child").focus();
							}
							else{
								if($(n.target).parents(".open").length>=1){
									if ($(n.target).closest("li.open").find(">:first-child").hasClass("link-button-wrap")){
										$(n.target).closest("li.open").find(">:first-child").find(">:nth-child(2)").focus();
									}
									else {
										$(n.target).closest("li.open").find(">:first-child").focus();
									}
								}
								else{
									if( $(n.target).closest("li.menu-item").is(":first-child") ){//is first child
										if( $(n.target).closest(".sub-menu").length==0 ){//top level
											if( $(".et_slide_menu_top").length>0  ){//focusable items above menu
												$(".et_slide_menu_top").find('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').last().focus();
											}
											else{
												$(".mobile_menu_bar").focus();
											}
										}
										else{//sub menu first child
											$(n.target).closest("li.open").find('button, a[href]').first().focus();
										}
									}
									else{//not first child
										$(n.target).closest("li.menu-item").prev().find('button, a[href]').first().focus();
									}
								}
							}
						}
					}
				}
			});
		}
	});
})(jQuery);
