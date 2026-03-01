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
		
	$(document).ready(function(){
		if( !$("body").hasClass("et-tb-has-header") ){
			$("#top-menu.nav .menu-item-has-children > a").each(function(){
				var buttonHtml;
				var linkText = $(this).text();
				if($(this).attr("href")=="#"){
					buttonHtml = '<button class="menu-trigger menu-trigger-without-link" aria-expanded="false" aria-haspopup="true"><span class="btn-label">' + linkText + '</span><span class="icon-holder"><i class="fd-open" aria-hidden="false"><span class="screen-reader-text">' + linkText +' Submenu</span></i><i class="fd-close" aria-hidden="true"><span class="screen-reader-text">' + linkText +' Submenu</span></i></span></button>';
					$(this).replaceWith(buttonHtml);
				}
				else{
					var spanHtml = '<span class="link-button-wrap"></span>';
					buttonHtml = '<button class="menu-trigger menu-trigger-with-link" aria-expanded="false" aria-haspopup="true"><i class="fd-open" aria-hidden="false"><span class="screen-reader-text">' + linkText +' Submenu</span></i><i class="fd-close" aria-hidden="true"><span class="screen-reader-text">' + linkText +' Submenu</span></i></button>';
					$(this).wrap(spanHtml);
					$(buttonHtml).insertAfter($(this));
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
			$("#top-menu>li").on("keydown", function(n){
				
				var activeElement = document.activeElement.tagName;
				var activeElClass = document.activeElement.className;
				
				if( activeElement == 'A'){
					if(n.keyCode==39){ //right arrow
						if( $(n.target).next("button").length > 0){
							$(n.target).next("button").focus();
						}
						else{
							$(n.target).closest("li.menu-item").next().find('button, a[href]').first().focus();
						}
					}
					if(n.keyCode==37){ //left arrow
						n.preventDefault();
						if( $(n.target).closest("li.menu-item").prev().find('.link-button-wrap').length>0 ){
							$(n.target).closest("li.menu-item").prev().find('.link-button-wrap').first().find(">:nth-child(2)").focus();
						}
						else{
							$(n.target).closest("li.menu-item").prev().find(">:first-child").focus();
						}
					}
				}
				
				if( activeElement == "BUTTON" || activeElClass == "screen-reader-text" || activeElClass == "fd-open" || activeElClass == "fd-close"){
					if(n.keyCode==39){ //right arrow
						$(n.target).closest("li.menu-item").next().find('button, a[href]').first().focus();
					}			
					if(n.keyCode==37){ //left arrow
						n.preventDefault();
						if( $(n.target).closest(".link-button-wrap").length>0){
								$(n.target).closest(".link-button-wrap").find("a").focus();
						}
						else{
							if( $(n.target).closest("li.menu-item").prev().find('.link-button-wrap').length>0 ){
								$(n.target).closest("li.menu-item").prev().find('.link-button-wrap').first().find(">:nth-child(2)").focus();
							}
							else{
								$(n.target).closest("li.menu-item").prev().find(">:first-child").focus();
							}
						}
					}
					if(n.keyCode==27){//ESC
						menuTriggerClose($(this).find(".menu-trigger"));
					}
					if(n.keyCode==40 ){//Down arrow
						menuTriggerOpen($(this).find(".menu-trigger"));
					}
					if(n.keyCode==38){//up arrow
						menuTriggerClose($(this).find(".menu-trigger"));
					}
				}
			});

			//submenu controls	
			$("#top-menu .sub-menu li").on("keydown",function(e){
				e.stopPropagation();
				var activeElement = document.activeElement.tagName;
				var activeElClass = document.activeElement.className;
				if(e.which==27){//Escape	
					menuTriggerClose(activeElement);
				}
				if( ( e.which==39 || e.which==40) && e.which!=16  ){//right and down arrow
					e.preventDefault();
					if($(this).is(":last-child")){
						if( activeElement == 'A'){
							if( $(this).find(">:first-child").hasClass("link-button-wrap")){
								$(this).find(">:first-child").find(">:nth-child(2)").focus();
							}
							else{
								if($(this).parents(".open").length>=1){
									if($(this).closest("li.open").not(":last-child")){
										$(this).closest("li.open").next("li").find('button, a[href]').first().focus();
									}
									else{
										$(this).parents("li.open").first().next("li").find('button, a[href]').first().focus();
									}
								}
								else{
									//move to next focusable on page
								}
							}
						}
						if( activeElement == "BUTTON" || activeElClass == "screen-reader-text" || activeElClass == "fd-open" || activeElClass == "fd-close"){
							if($(this).hasClass("open")){
								$(this).closest("li.open").find(".sub-menu").find(">:first-child").find('button, a[href]').first().focus();
							}
							else{
								if (e.which==9 && !e.which==16){//tab
									if ($(this).closest("li.open").not(":last-child")){
										$(this).closest("li.open").next("li").find('button, a[href]').first().focus();
										
										}
										else{
											$(this).parennts("li.open").first().next("li").find('button, a[href]').first().focus();
										}
								}
								else{
									if(e.which==39 || e.which==40){//right, down arrows
										menuTriggerOpen($(this).find(".menu-trigger"));
									}
								}
							}	
						}
					}	
					else{
						if( activeElement == 'A'){
							if( $(this).find(">:first-child").hasClass("link-button-wrap")){
								$(this).find(">:first-child").find(">:nth-child(2)").focus();
							}
							else if ( $(this).next().find(">:first-child").hasClass("link-button-wrap") ){
								$(this).next().find(">:first-child").find(">:first-child").focus();
							}
							else {
								$(this).next().find(">:first-child").focus();
							}
						}
						if( activeElement == "BUTTON" || activeElClass == "screen-reader-text" || activeElClass == "fd-open" || activeElClass == "fd-close"){
							if($(this).hasClass("open")){
								$(this).closest("li.open").find(".sub-menu").find(">:first-child").find(">:first-child").focus();
							}
							else{
								if (e.which==9 && e.which!=16){//tab
									if ( $(this).next().find(">:first-child").hasClass("link-button-wrap") ){
										$(this).next().find(">:first-child").find(">:first-child").focus();
									}
									else {
										$(this).next().find(">:first-child").focus();
									}
								}
								else{
									if(e.which==39 || e.which==40){//right,down arrows
										menuTriggerOpen( $(this).find(".menu-trigger"));
									}
								}
							}
						}
					}
				}
				
				if(e.which==37 || e.which==38 || (e.which==16 && e.which==9)){//left, up arrow or shift/tab
					e.preventDefault();
					if($(this).is(":first-child")){
						if( activeElement == 'A'){
							if($(this).parents(".open").length>=1){
								if ($(this).closest("li.open").find(">:first-child").hasClass("link-button-wrap")){
									$(this).closest("li.open").find(">:first-child").find(">:nth-child(2)").focus();
								}
								else  {
									$(this).closest("li.open").find(">:first-child").focus();
								}
							}
							else{
								//do nothing
							}
						}
						if( activeElement == "BUTTON" || activeElClass == "screen-reader-text" || activeElClass == "fd-open" || activeElClass == "fd-close"){
							if($(this).hasClass("open")){
								menuTriggerClose( $(this).find(".menu-trigger"));
							}
							else{
								if ($(this).closest("li").find(">:first-child").hasClass("link-button-wrap")){
									$(this).closest("li").find(">:first-child").find(">:first-child").focus();
								}
								else{
									if($(this).parents(".open").length>=1){
										if ($(this).closest("li.open").find(">:first-child").hasClass("link-button-wrap")){
											$(this).closest("li.open").find(">:first-child").find(">:nth-child(2)").focus();
										}
										else  {
											$(this).closest("li.open").find(">:first-child").focus();
										}
									}
									else{
										//do nothing
									}
								}
							}
						}	
					}
						
					else{
						if( activeElement == 'A'){
							if ( $(this).prev().find(">:first-child").hasClass("link-button-wrap") ){
								$(this).prev().find(">:first-child").find(">:nth-child(2)").focus();
							}
							else {
								$(this).prev().find(">:first-child").focus();
							}
						}
						if( activeElement == "BUTTON" || activeElClass == "screen-reader-text" || activeElClass == "fd-open" || activeElClass == "fd-close"){
							if ($(this).find(">:first-child").hasClass("link-button-wrap")){
								$(this).find(">:first-child").find(">:first-child").focus();
							}
							else if($(this).prev().find(">:first-child").hasClass("link-button-wrap")){
								$(this).prev().find(">:first-child").find(">:nth-child(2)").focus();
							}
							else{
								$(this).prev().find(">:first-child").focus();
							}
						}
					}	
				}
			});
			
			$(document).on("focusin", function(e){
				e.stopPropagation();
				if( $(document.activeElement).closest('#top-menu').length==0 && $(".menu-item-has-children").hasClass("open") ){
					$(".menu-item-has-children.open").each(function(){
					$(this).removeClass("open");
					$(this).find(".menu-trigger").removeClass("open").attr("aria-expanded","false");
					$(this).find(".fd-close").attr("aria-hidden","false");
					$(this).find(".fd-open").attr("aria-hidden","true");
					});
				}
			});
			$(document).on("click", function(e){
				e.stopPropagation();
				if( $(document.activeElement).closest('#top-menu').length==0 && $(".menu-item-has-children").hasClass("open") ){
					$(".menu-item-has-children.open").each(function(){
					$(this).removeClass("open");
					$(this).find(".menu-trigger").removeClass("open").attr("aria-expanded","false");
					$(this).find(".fd-close").attr("aria-hidden","false");
					$(this).find(".fd-open").attr("aria-hidden","true");
					});
				}
			});
		}
	});
})(jQuery);	
