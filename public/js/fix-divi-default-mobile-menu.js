(function($) {	
	$(document).ready(function() {
		if( !$("body").hasClass("et-tb-has-header") ){
			
			$(".et_mobile_menu .menu-item-has-children > a").each(function(){
				var buttonHtml;
				var linkText = $(this).text();
				if($(this).attr("href")=="#"){
					buttonHtml = '<span class="non-link-label">'+linkText+'</span>';
					$(this).replaceWith(buttonHtml);
				}
			});
			
			$("#mobile_menu").attr({"role":"navigation", "aria-label":"Primary"});

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
			
			$(".et_mobile_menu").children().on("keydown", function(n){
				if(n.keyCode==27){ //esc
					$(".mobile_menu_bar").attr("aria-expanded","false");
					$(".mobile_nav").removeClass("opened").addClass("closed");
					$(".et_mobile_menu").attr("style","display:none");
					$(".mobile_menu_bar").focus();
				}
			});

			//keyboard control for mobile menu bar (toggle)
			$(".mobile_menu_bar").on("keydown",function(n){		
				if(n.keyCode==13 || n.keyCode==32){  //enter, spacebar
					if($(".et_mobile_menu").is(":hidden")){
						$(".mobile_menu_bar").attr("aria-expanded","true");
						$(".mobile_nav").removeClass("closed").addClass("opened");
						$(".et_mobile_menu").attr("style","display:block");
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
