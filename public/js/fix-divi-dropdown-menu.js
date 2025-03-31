(function($) {
	$(document).ready(function(){
		if( !$("body").hasClass("et-tb-has-header") ){
			// Set up dropdown toggle buttons for main menu items with children
			$("#top-menu.nav .menu-item-has-children > a").each(function(){
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

			//add support for arrow controls
			$("#top-menu>li").on("keydown", "a", function(n){
				if( n.keyCode==39){ //right arrow
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
				if(n.keyCode==37 ){ //left arrow
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

			$("#top-menu>li").on("keydown", "button", function(n){
				if(n.keyCode==39){ //right arrow
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
							$(this).parent().parent().next().find(">:first-child").find(">:first-child").focus();   
						}
						else{						
							$(this).parent().next().find(">:first-child").focus(); 
						}
					}
				}			
				if(n.keyCode==37 ){ //left arrow
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

			//open/close submenu
			$(".menu-trigger").on("click", function() {
				if($(this).hasClass("open")){
					if($(this).hasClass("menu-trigger-with-link")){
						$(this).parent().parent().removeClass("open");
					}
					else{
						$(this).parent().removeClass("open");
					}
					$(this).attr("aria-expanded","false");
					$(this).find(".fd-open").attr("aria-hidden","false");
					$(this).find(".fd-close").attr("aria-hidden","true");
					$(this).removeClass("open");	
				}
				else{
					if($(this).hasClass("menu-trigger-with-link")){
						$(this).parent().parent().addClass("open");
					}
					else{
						$(this).parent().addClass("open");
					}
					$(this).attr("aria-expanded","true");
					$(this).find(".fd-open").attr("aria-hidden","true");
					$(this).find(".fd-close").attr("aria-hidden","false");
					$(this).addClass("open");
				}
			});

			//keyboard controls to open/close submenu
			$(".menu-trigger").on("keydown",function(e){
				if(e.which==27){//Escape
					$(this).removeClass("open");
					if($(this).hasClass("menu-trigger-with-link")){
						$(this).parent().parent().removeClass("open");
					}
					else{
						$(this).parent().removeClass("open");
					}
					$(this).attr("aria-expanded","false");
					$(this).find(".fd-close").attr("aria-hidden","false");
					$(this).find(".fd-open").attr("aria-hidden","true");
				}
				if(e.which==37){//left arrow
					$(this).removeClass("open");
					if($(this).hasClass("menu-trigger-with-link")){
						$(this).parent().parent().removeClass("open");
					}
					else{
						$(this).parent().removeClass("open");
					}
					$(this).attr("aria-expanded","false");
					$(this).find(".fd-close").attr("aria-hidden","false");
					$(this).find(".fd-open").attr("aria-hidden","true");	
				}
				if(e.which==39){//right arrow
					$(this).removeClass("open");
					if($(this).hasClass("menu-trigger-with-link")){
						$(this).parent().parent().removeClass("open");
					}
					else{
						$(this).parent().removeClass("open");
					}
					$(this).attr("aria-expanded","false");
					$(this).find(".fd-close").attr("aria-hidden","false");
					$(this).find(".fd-open").attr("aria-hidden","true");
				}
				if(e.which==40){//Down arrow
					$(this).addClass("open");
					if($(this).hasClass("menu-trigger-with-link")){
						$(this).parent().parent().addClass("open");
					}
					else{
						$(this).parent().addClass("open");
					}
					$(this).attr("aria-expanded","true");
					$(this).find(".fd-close").attr("aria-hidden","true");
					$(this).find(".fd-open").attr("aria-hidden","false");
					if($(this).hasClass("menu-trigger-with-link")){
						$(this).parent().next().find("li:first-child a").focus();
					}
					else{
						$(this).next().find("li:first-child a").focus();
					}
				}
				if(e.which==38){//up arrow
					$(this).removeClass("open");
					if($(this).hasClass("menu-trigger-with-link")){
						$(this).parent().parent().removeClass("open");
					}
					else{
						$(this).parent().removeClass("open");
					}
					$(this).attr("aria-expanded","false");
					$(this).find(".fd-close").attr("aria-hidden","false");
					$(this).find(".fd-open").attr("aria-hidden","true");
				}
			});

			//submenu controls	
			$(".sub-menu li").on("keydown",function(e){
				if(e.which==27){//Escape	
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
				if(e.which==39 || e.which==40){//right and down arrow
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
				if(e.which==37 || e.which==38){//left and up arrow
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
