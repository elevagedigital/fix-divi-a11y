// JavaScript Document

jQuery(document).ready(function($) {
	
	/*add role=main*/
	if($("#main-content")){
		$("#main-content").attr("role","main");
	} else{
		$("#et-main-area").attr("role","main");
	}
	
	/*move skip link to main landmark div*/
	$("#skip-link").on("click", function(){
		$('[role="main"]').attr("tabIndex", "0").focus();
	})
	
	/*add aria role for sidebar*/
	$("#sidebar").attr("role","complimentary");

	/*no tab/screen reader to hidden search*/
	$(".et_search_outer").attr("aria-hidden","true");
	$(".et_search_outer .et-search-form input").each(function(){
		$(this).attr("tabIndex","-1");
	});
	$(".et_search_outer .fd-close-search").attr("tabIndex","-1");
	
	/*open search field*/
	$(".fd-access-search").on("click", function(n){
		n.preventDefault();
		$(".et_search_outer").attr("aria-hidden","false");
		$(".et_search_outer .et-search-form input").each(function(){
		$(this).attr("tabIndex","0");
		});
		$(".et_search_outer .fd-close-search").attr("tabIndex","0");
		$(this).hide();
		$(".fd-close-search").show();
		$(".et_menu_container").addClass("et_pb_menu_hidden et_pb_no_animation").removeClass("et_pb_menu_visible");
		$(".et_search_outer .et_search_form_container").addClass("et_pb_search_visible et_pb_no_animation").removeClass("et_pb_search_form_hidden");
		setTimeout(function () {
			$(".et-search-field").focus();
		}, 100);
		
	});
	
	$(".fd-access-search").on("keydown", function(n){
		if(n.keyCode==13){ //enter
			n.preventDefault();
			$(".et_search_outer").attr("aria-hidden","false");
			$(".et_search_outer .et-search-form input").each(function(){
			$(this).attr("tabIndex","0");
			});
			$(".et_search_outer .fd-close-search").attr("tabIndex","0");
			$(this).hide();
			$(".fd-close-search").show();
			$(".et_menu_container").addClass("et_pb_menu_hidden et_pb_no_animation").removeClass("et_pb_menu_visible");
			$(".et_search_outer .et_search_form_container").addClass("et_pb_search_visible et_pb_no_animation").removeClass("et_pb_search_form_hidden");
			setTimeout(function () {
				$(".et-search-field").focus();
			}, 100);
		}
	});
	
	/*close search form*/
	$(".fd-close-search").on("click", function(n){
		n.preventDefault();
		$(".et_search_outer").attr("aria-hidden","true");
		$(".et_search_outer .et-search-form input").each(function(){
		$(this).attr("tabIndex","-1");
		});
		$(".et_search_outer .fd-close-search").attr("tabIndex","-1");
		$("et_search_outer .et_search_form_container").addClass("et_pb_search_hidden").removeClass("et_pb_search_form_visible");
		setTimeout(function () {
			$(".fd-access-search").show().focus();
		}, 100);
	});
	
	$(".fd-close-search").on("keydown", function(n){
		if(n.keyCode==13 || n.keyCode==27 || n.keyCode==35 || n.keyCode==36){ //enter, esc, end, home
			n.preventDefault();
			$(".et_search_outer").attr("aria-hidden","true");
			$(".et_search_outer .et-search-form input").each(function(){
				$(this).attr("tabIndex","-1");
			});
			$(".et_search_outer .fd-close-search").attr("tabIndex","-1");
			$(this).hide();
			$(".et_menu_container").removeClass("et_pb_menu_hidden et_pb_no_animation").addClass("et_pb_menu_visible");
			$(".et_search_outer .et_search_form_container").removeClass("et_pb_search_visible et_pb_no_animation").addClass("et_pb_search_form_hidden");
			setTimeout(function () {
				$(".fd-access-search").show().focus();
			}, 100);
		}
		
		if(n.keyCode==9 || n.keyCode==39 || n.keyCode==40){//tab, right, down
			$(".et-search-field").focus();
		}
	});
	
	/*add aria-label for read more link*/
	$(".more-link").each(function(){
		var linkText = $(this).text();
		if (linkText.toLowerCase()=='read more'){
			var itemTitle=$(this).parent().parent().find(".entry-title a").text();
			var ariaLabel = linkText + " of " + itemTitle.trim();
			$(this).attr("aria-label", ariaLabel);
		}
	});
	
});
