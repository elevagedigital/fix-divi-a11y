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
			$(".mobile_menu_bar").attr({role:"button", "aria-expanded":"false", "aria-label":"Menu Toggle", tabindex:0});
			
			$(".et_slide_in_menu_container").attr({"role":"dialog", "aria-modal":"true","aria-label":"navigation modal"});

			$(".mobile_menu_bar").on("click",function(){
				if($(".mobile_menu_bar").attr("aria-expanded")=="false"){
					$(".mobile_menu_bar").attr("aria-expanded","true");
					setTimeout(function () {
						$(".et_slide_in_menu_container .et_toggle_fullscreen_menu").focus();
					}, 100);
				}
				else{
					$(".mobile_menu_bar").attr("aria-expanded","false");
					setTimeout(function () {
						$("#et-top-navigation .mobile_menu_bar").focus();
					}, 100);
				}
			});

			//keyboard control for mobile menu
			$(".mobile_menu_bar").on("keydown",function(n){		
				if(n.which==13 || n.which==32){  //enter, spacebar
					setTimeout(function () {
						$("#et-top-navigation .mobile_menu_bar").click();
					}, 100);
				}
				if(n.which==9){//tab
					if(n.shiftKey){
						setTimeout(function () {
							$("#et-top-navigation .mobile_menu_bar").click();
						}, 100);
					}
				}
			});

			$(".et_slide_in_menu_container").children().on("keydown", function(n){
				if(n.which==27 || n.which==35 || n.which==36){ //esc, end, home
					setTimeout(function () {
						$("#et-top-navigation .mobile_menu_bar").click();
					}, 100);
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
			
			//add support for arrow controls	
			$(".et_pb_fullscreen_nav_container").on("keydown", function(n){
				var activeElement = document.activeElement.tagName;
				var activeElClass = document.activeElement.className;
	
				if( activeElement == 'A'){
					if( n.which==9 || n.which==39 || n.which==40 ){ //tab, right, down arrow
						n.preventDefault();
						if(!n.shiftKey){
							if( $(n.target).next("button").length > 0){
								$(n.target).next("button").focus();
							}
							else{
								if( $(n.target).closest("li").is(":last-child") ){
									if($(n.target).closest(".sub-menu").length==0 ){
										$(".et_slide_in_menu_container .et_toggle_fullscreen_menu").focus();
									}
									else{
										if($(n.target).parents("li.open").length>1){//sub-sub menu
											$(n.target).parents("li.open").last().next("li").find('button, a[href]').first().focus();
										}
										else{
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
						if( $(n.target).closest("li").is(":first-child") ){
							if($(n.target).closest(".sub-menu").length==0 ){
								$(".et_slide_in_menu_container .et_toggle_fullscreen_menu").focus();
							}
							else{
								$(n.target).closest("li.open").prev().find('button, a[href]').first().focus();
							}
						}
						else{
							$(n.target).closest("li.menu-item").prev().find('button, a[href]').first().focus();
						}
					}
					if(n.which==9){ //tab
						n.preventDefault();
						if(n.shiftKey){
							if( $(n.target).closest("li").is(":first-child") ){
								if($(n.target).closest(".sub-menu").length==0 ){
									$(".et_slide_in_menu_container .et_toggle_fullscreen_menu").focus();
								}
								else{
									$(n.target).closest("li.open").prev().find('button, a[href]').first().focus();
								}
							}
							else{
							$(n.target).closest("li.menu-item").prev().find('button, a[href]').first().focus();
							}
						}
					}
				}
				
				if( activeElement == "BUTTON" || activeElClass == "screen-reader-text" || activeElClass == "fd-open" || activeElClass == "fd-close"){
					if( n.which==9 || n.which==39 || n.which==40 ) {//tab, right, down arrow
						n.preventDefault();
						if(!n.shiftKey){
							if($(n.target).hasClass("open")){
								$(n.target).closest("li.open").find(".sub-menu").find(">:first-child").find('button, a[href]').first().focus();
							}
							else{
								if( $(n.target).closest("li").is(":last-child") ){
									if($(n.target).closest(".sub-menu").length==0 ){
										$(".et_slide_in_menu_container .et_toggle_fullscreen_menu").focus();
									}
									else{
										if($(n.target).parents("li.open").length>1){//sub-sub menu
											$(n.target).parents("li.open").last().next("li").find('button, a[href]').first().focus();
										}
										else{
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
					if(n.which==37 || n.which==38){ //up, left arrow
						n.preventDefault();
						if ($(n.target).closest("li").find(">:first-child").hasClass("link-button-wrap")){
							$(n.target).closest("li").find(">:first-child").find(">:first-child").focus();
						}
						else{
							if( $(n.target).closest("li").is(":first-child") ){
								if($(n.target).closest(".sub-menu").length==0 ){
									$(".et_slide_in_menu_container .et_toggle_fullscreen_menu").focus();
								}
								else{
									$(n.target).closest("li.open").find('button, a[href]').first().focus();
								}
							}
							else{
								if($(n.target).parents(".open").length>=1){
									if ($(n.target).closest("li.open").find(">:first-child").hasClass("link-button-wrap")){
										$(n.target).closest("li.open").find(">:first-child").find(">:nthchild(2)").focus();
									}
									else {
										$(n.target).closest("li.open").find(">:first-child").focus();
									}
								}
								else{
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
								if( $(n.target).closest("li").is(":first-child") ){
									if($(n.target).closest(".sub-menu").length==0 ){
										$(".et_slide_in_menu_container .et_toggle_fullscreen_menu").focus();
									}
									else{
										$(n.target).closest("li.open").find('button, a[href]').first().focus();
									}
								}
								else{
									if($(n.target).parents(".open").length>=1){
										if ($(n.target).closest("li.open").find(">:first-child").hasClass("link-button-wrap")){
											$(n.target).closest("li.open").find(">:first-child").find(">:nthchild(2)").focus();
										}
										else {
											$(n.target).closest("li.open").find(">:first-child").focus();
										}
									}
									else{
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
