jQuery(document).ready(function($) {

	/**
	*
	* Tabs - Credit: CampusPress
	*
	*/
	
	/* set roles and attributes */
	
	$('.et_pb_tabs').each(function (e) {
		$(this).attr('id', 'et_pb_tab_module_' + e);
	});
	
	$('.et_pb_tabs_controls').each(function () {
		$(this).attr('role', 'tablist');
	});
	
	$('.et_pb_tabs_controls li').each(function () {
		$(this).attr('role', 'presentation');
	});
	
	$('.et_pb_tabs_controls li.et_pb_tab_active a').each(function () {
		$(this).attr({
			'aria-selected': 'true',
			'aria-expanded': 'true',
			tabindex: 0
		});
	});
	
	$('.et_pb_tabs_controls li:not(.et_pb_tab_active) a').each(function () {
		$(this).attr({
			'aria-selected': 'false',
			'aria-expanded': 'false',
			tabindex: -1
		});
	});
	
	$('.et_pb_tabs_controls a').each(function (e) {
		$(this).attr({
			'role': 'tab',
			id: 'et_pb_tab_control_' + e,
			'aria-controls': 'et_pb_tab_panel_' + e
		});
	});
	
	$('.et_pb_tab').each(function (e) {
		$(this).attr({
			'role': 'tabpanel',
			id: 'et_pb_tab_panel_' + e,
			'aria-labelledby': 'et_pb_tab_control_' + e
		});
	});
	
	$('.et_pb_tab.et_pb_active_content').each(function () {
		$(this).attr({'aria-hidden':'false', 'tabIndex': '0'});
	});

	$('.et_pb_tab:not(.et_pb_active_content)').each(function () {
		$(this).attr({'aria-hidden':'true', 'tabIndex': '-1'});
	});

	
	/* click events */
	
	$('.et_pb_tabs_controls a').on('click', function () {
		var thisId = $(this).attr('id');
		var tabsId = $(this).closest('.et_pb_tabs').attr('id');
		
		$('[id="' + tabsId + '"] .et_pb_tabs_controls a').attr({
			'aria-selected': 'false',
			'aria-expanded': 'false',
			tabindex: -1
		});
		
		$(this).attr({
			'aria-selected': 'true',
			'aria-expanded': 'true',
			tabindex: 0
		});
		
		$('#' + tabsId + ' .et_pb_tab').attr({'aria-hidden':'true', 'tabIndex': '-1'});
		$('[aria-labelledby="' + thisId + '"]').attr({'aria-hidden':'false', 'tabIndex': '0'});
	});

	/* Use arrows to move between tabs */ 
	
	$('.et_pb_tabs_controls a').keyup(function (e) {
		var tabsId = $(this).closest('.et_pb_tabs').attr('id');
		var module = $('[id="' + tabsId + '"]');
		if (e.which === 39) { // right arrow
			var next = module.find('li.et_pb_tab_active').next();
			if (next.length > 0) {
				next.find('a').trigger('click').focus();
			} else {
				module.find('li:first a').trigger('click').focus();
			}
		} else if (e.which === 37) { // left arrow
			next = module.find('li.et_pb_tab_active').prev();
			if (next.length > 0) {
				next.find('a').trigger('click').focus();
			} else {
				module.find('li:last a').trigger('click').focus();
			}
		}
	});
	
	/**
	*
	* Accordions & Toggles - Credit: CampusPress
	*
	**/
	
	/* set roles and attributes */
	
	$('.et_pb_accordion').each(function (e) {
		$(this).attr('id', 'et_pb_accordion_module_' + e);
	});
	
	$('.et_pb_accordion_item').each(function (e) {
		$(this).attr('id', 'et_pb_accordion_item_' + e);
	});
	
	$('.et_pb_accordion_item .et_pb_toggle_title').each(function (e) {
		$(this).attr({
			'role':'button',
			'aria-controls': 'et_pb_accordion_content_' + e,
			'id': 'et_pb_accordion_control_' + e,
			'tabindex': '0'
		});							  
	});
	
	$('.et_pb_toggle_item .et_pb_toggle_title').each(function (e) {
		$(this).attr({
			'role':'button',
			'aria-controls': 'et_pb_toggle_content_' + e,
			'id': 'et_pb_toggle_control_' + e,
			'tabindex': '0'
		});							  
	});
	
	
	$('.et_pb_toggle_open .et_pb_toggle_title').each(function () {
		$(this).attr({
			'aria-expanded': 'true',
			'aria-disabled': 'true'
		});
	});
	
	$('.et_pb_toggle_close .et_pb_toggle_title').each(function () {
		$(this).attr({
			'aria-expanded': 'false',
			'aria-disabled': 'false'
		});
	});
	
	$('.et_pb_accordion_item .et_pb_toggle_content').each(function (e){
		$(this).attr({
			'id':'et_pb_accordion_content_' + e,
			'role': 'region',
			'aria-labelledby': 'et_pb_accordion_control_' + e
		});
	});
	
	$('.et_pb_toggle_item .et_pb_toggle_content').each(function (e){
		$(this).attr({
			'id':'et_pb_toggle_content_' + e,
			'role': 'region',
			'aria-labelledby': 'et_pb_toggle_control_' + e
		});
	});
	
	$('.et_pb_toggle_open .et_pb_toggle_content').each(function () {
		$(this).attr({
			'aria-hidden': 'false'
		});
	});
	
	$('.et_pb_toggle_close .et_pb_toggle_content').each(function () {
		$(this).attr({
			'aria-hidden': 'true'
		});
	});
	
	
	/* click events - accordion */
	$('.et_pb_accordion_item .et_pb_toggle_title').on('click', function (e) {
		e.preventDefault();
		var thisID = "#" + $(this).attr("id");
		if($(this).attr("aria-disabled")=="false"){
			$(".et_pb_accordion .et_pb_toggle_title").each(function(){
				$(this).attr({'aria-expanded': 'false','aria-disabled': 'false'});
				$(this).parent().addClass("et_pb_toggle_close").removeClass("et_pb_toggle_open");
			});
			$(".et_pb_accordion .et_pb_toggle_content").each(function(){
				$(this).attr('aria-hidden', 'true');
			});
			$(thisID).next().attr('aria-hidden', 'false');
			$(thisID).attr({'aria-expanded': 'true','aria-disabled': 'true'});
			$(thisID).parent().addClass("et_pb_toggle_open").removeClass("et_pb_toggle_close");
		}
	});
	
	/* control with enter or space */
	$('.et_pb_accordion_item .et_pb_toggle_title').on('keyup', function(n){
		if(n.keyCode==13 || n.keyCode==32){ //enter and space bar
			n.preventDefault();
			$(this).trigger('click');
		}
	});	
	
	/* click events - toggle */
	$('.et_pb_toggle_item .et_pb_toggle_title').on('click', function () {
		var thisID = "#" + $(this).attr("id");
		if($(this).attr("aria-expanded")=="false"){
			$(thisID).next().attr('aria-hidden', 'false');
			$(thisID).attr({'aria-expanded': 'true','aria-disabled': 'false'});
		}
		else{
			$(thisID).next().attr('aria-hidden', 'true');
			$(thisID).attr({'aria-expanded': 'false','aria-disabled': 'false'});
		}
	});
	
	/* control with enter or space */
	$('.et_pb_toggle_item .et_pb_toggle_title').on('keyup', function(n){
		if(n.keyCode==13 || n.keyCode==32){ //enter and space bar
			$(this).trigger('click');
		}
	});	
});
