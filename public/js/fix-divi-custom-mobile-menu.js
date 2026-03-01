(function($) {
	$(document).ready(function() {
		
		if( $("body").hasClass("et-tb-has-header") ){
			
			//add aria for menu toggle
			$(".mobile_menu_bar").attr({role:"button", "aria-expanded":"false", "aria-label":"Menu Toggle", tabindex:0});

			$(".mobile_menu_bar").on("click",function(){
				if($(".et_mobile_menu").is(":hidden")){
					$(".mobile_menu_bar").attr("aria-expanded","true");
					$(".et_mobile_menu>li:first-child").addClass("first");
					if( $(".et_mobile_menu>li:last-child").find(".sub-menu").length>0 ){
						$(".et_mobile_menu>li:last-child .sub-menu>li:last-child").addClass("last");
					}
					else{
						$(".et_mobile_menu>li:last-child").addClass("last");
					}
					setTimeout(function () {
						$(".mobile_menu_bar").focus();
						$(".et_mobile_menu .menu-trigger").each(function(){
							$(this).removeClass("open").attr({'aria-expanded':'false'});
							$(this).find(".fd-close").attr("aria-hidden","true");
							$(this).find(".fd-open").attr("aria-hidden","false");
						})
					}, 100);
				}
				else{
					$(".mobile_menu_bar").attr("aria-expanded","false");
					$(".mobile_menu_bar").focus();
				}
			});
			
			//keyboard control for mobile menu
			$(".mobile_menu_bar").on("keydown",function(n){		
				if(n.keyCode==13 || n.keyCode==32){  //enter
					if($(".et_mobile_menu").is(":hidden")){
						$(".mobile_menu_bar").attr("aria-expanded","true");
						$(".mobile_nav").removeClass("closed").addClass("opened");
						$(".et_mobile_menu").attr("style","display:block");
						$(".et_mobile_menu>li:first-child").addClass("first");
						if( $(".et_mobile_menu>li:last-child").find(".sub-menu").length>0 ){
							$(".et_mobile_menu>li:last-child .sub-menu>li:last-child").addClass("last");
						}
						else{
							$(".et_mobile_menu>li:last-child").addClass("last");
						}
						setTimeout(function () {
							$(".mobile_menu_bar").focus();
							$(".et_mobile_menu .menu-trigger").each(function(){
								$(this).removeClass("open").attr({'aria-expanded':'false'});
								$(this).find(".fd-close").attr("aria-hidden","true");
								$(this).find(".fd-open").attr("aria-hidden","false");
							});
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
					$(this).removeClass("open");
					$(this).find(".fd-open").attr("aria-hidden","false");
					$(this).find(".fd-close").attr("aria-hidden","true");
					$(this).attr("aria-expanded","false");

					if($(this).hasClass("menu-trigger-with-link")){
						$(this).parent().next("ul.sub-menu").attr({'style':'display: none !important; visibility: hidden !important;'});
					}
					else{
						$(this).next("ul.sub-menu").attr({'style':'display: none !important; visibility: hidden !important;'});
					}	
				}
				else{
					$(this).addClass("open");
					$(this).find(".fd-open").attr("aria-hidden","true");
					$(this).find(".fd-close").attr("aria-hidden","false");
					$(this).attr("aria-expanded","true");
					if($(this).hasClass("menu-trigger-with-link")){
						$(this).parent().next("ul.sub-menu").attr({'style':'display: block !important; visibility: visible !important;'}); 
					}
					else{
						$(this).next("ul.sub-menu").attr({'style':'display: block !important; visibility: visible !important;'});
					}	
				}
			});


			$(".mobile_nav").on("keydown", "button", function(n){
				if(n.keyCode==13 || n.keyCode==32){//enter, space bar - open/close submenu
					n.preventDefault();
					if($(this).hasClass("open")){
						$(this).removeClass("open");
						$(this).find(".fd-open").attr("aria-hidden","false");
						$(this).find(".fd-close").attr("aria-hidden","true");
						$(this).attr("aria-expanded","false");

						if($(this).hasClass("menu-trigger-with-link")){
							$(this).parent().next("ul.sub-menu").attr({'style':'display: none !important; visibility: hidden !important;'});
						}
						else{
							$(this).next("ul.sub-menu").attr({'style':'display: none !important; visibility: hidden !important;'}); 
						}	
					}
					else{
						$(this).addClass("open");
						$(this).find(".fd-open").attr("aria-hidden","true");
						$(this).find(".fd-close").attr("aria-hidden","false");
						$(this).attr("aria-expanded","true");
						if($(this).hasClass("menu-trigger-with-link")){
							$(this).parent().next("ul.sub-menu").attr({'style':'display: block !important; visibility: visible !important;'});
						}
						else{
							$(this).next("ul.sub-menu").attr({'style':'display: block !important; visibility: visible !important;'});
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
						if ($(this).closest("li").hasClass("last")){// move out of nav
							$("div[role='main']").find('a[href], button, :input, [tabindex]:not([tabindex="-1"])').first().focus()
						}
						else{
							if($(this).closest("li").is(".sub-menu li:last-child")){//if last item in submenu
								$(this).closest("li").parent().parent().next().find('a[href], button').first().focus();
							}
							else{//else
								if($(this).closest("li").find(".sub-menu").is(":visible")){//if has open submenu
									$(this).closest("li").find(".sub-menu").find(">:first-child").find('a[href], button').first().focus();
								}
								else{//else
									if($(this).parent().hasClass("link-button-wrap")){
										$(this).parent().parent().next().find('a[href], button').first().focus();
									}
									else{
										$(this).parent().next().find('a[href], button').first().focus();
									}
								}
							}
						}	
					}
				}
				
				if(n.keyCode==37 || n.keyCode==38){ //up arrow, left arrow
					if( $(this).closest("li").hasClass("first")){
						$(".mobile_menu_bar").focus();
					}
					else{
						if($(this).closest("li").is(".sub-menu li:first-child")){//if first item in submenu, move to parent
							$(this).closest("li").parent().parent().find('a[href], button').first().focus();
						}		
						else{//else	
							if($(this).closest("li").prev().find(".sub-menu").length > 0){//if has submenu
								if($(this).closest("li").prev().find(".sub-menu").is(":visible")){//open submenu
									$(this).closest("li").prev().find(".sub-menu").find(">:last-child").find('a[href], button').first().focus();
								}
								else{
									$(this).closest("li").prev().find('a[href], button').first().focus();
								}
							}
							else{//else
								if($(this).parent().hasClass("link-button-wrap")){	
									$(this).parent().parent().prev().find('a[href], button').last().focus();
								}
								else{
									$(this).parent().prev().find('a[href], button').last().focus();
								}
							}
						}
					}	
				}
			});

			$(".mobile_nav").on("keydown", "button", function(n){
				if(n.keyCode==39 || n.keyCode==40){ //right arrow, down arrow
					if(!$(this).hasClass("open")){//if closed, open
						$(this).addClass("open").attr({'aria-expanded':'true'});
						$(this).find(".fd-open").attr("aria-hidden","true");
						$(this).find(".fd-close").attr("aria-hidden","false");
						$(this).closest("li").find(">.sub-menu").attr({'style':'display:block !important; visibility:visible !important;'});
					}
					else{//else
						if($(this).closest("li").hasClass("last")){
							//do nothing
						}
						else{
							if($(this).closest("li").find(".sub-menu").is(":visible")){//if has submenu, move to first submenu item	
								$(this).closest("li").find(".sub-menu").find(">:first-child").find('a[href], button').first().focus();
							}
							else{//else
								if($(this).parent().hasClass("link-button-wrap")){
									$(this).parent().parent().next().find('a[href], button').first().focus();   
								}
								else{
									$(this).parent().next().find('a[href], button').first().focus();
								}
							}
						}
					}
				}
				
				if(n.keyCode==37 || n.keyCode==38){ //up arrow, left arrow
					//if open, close
					if($(this).hasClass("open")){//if closed, open
						$(this).removeClass("open").attr({'aria-expanded':'false'});
						$(this).find(".fd-open").attr("aria-hidden","false");
						$(this).find(".fd-close").attr("aria-hidden","true");
						$(this).closest("li").find(">.sub-menu").attr({'style':'display:none !important; visibility:hidden !important;'});
					}
					else{//else
						if( $(this).prev("a").length > 0){
							$(this).prev("a").focus();   
						}
						else{
							if( $(this).closest("li").hasClass("first")){
								$(".mobile_menu_bar").focus();
							}
							else{
								if($(this).closest("li").prev().find(".sub-menu").length > 0){//if has submenu
									if($(this).closest("li").prev().find(".sub-menu").is(":visible")){//open submenu
										$(this).closest("li").prev().find(".sub-menu").find(">:last-child").find('a[href], button').first().focus();
									}
									else{
										$(this).closest("li").prev().find('a[href], button').first().focus();
									}
								}
								else{//else
									if($(this).parent().hasClass("link-button-wrap")){	
										$(this).parent().parent().prev().find('a[href], button').last().focus();
									}
									else{
										$(this).parent().prev().find('a[href], button').last().focus();
									}
								}
							}
						}
					}
				}
			});
			
			$(document).on("focusin", function(e){
				e.stopPropagation();
				if( $(document.activeElement).closest('.mobile_nav').length==0 && $(".mobile_nav").hasClass("opened") ){
					$(".mobile_menu_bar").attr("aria-expanded","false");
					$(".mobile_nav").removeClass("opened").addClass("closed");
					$(".et_mobile_menu").attr("style","display:none");
				}
			});
			$(document).on("click", function(e){
				e.stopPropagation();
				if( $(document.activeElement).closest('.mobile_nav').length==0 && $(".mobile_nav").hasClass("opened") ){
					$(".mobile_menu_bar").attr("aria-expanded","false");
					$(".mobile_nav").removeClass("opened").addClass("closed");
					$(".et_mobile_menu").attr("style","display:none");
				}
			});
		}
	});
})(jQuery);
