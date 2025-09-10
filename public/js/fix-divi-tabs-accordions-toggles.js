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
	* Accordions & Toggles - Credit: CampusPress, modified by SeaMonster Studios
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
			'aria-controls': 'et_pb_accordion_content_' + e,
			'id': 'et_pb_accordion_control_' + e,
			'tabindex': '0'
		});							  
	});
	
	$('.et_pb_toggle_item .et_pb_toggle_title').each(function (e) {
		$(this).attr({
			'aria-controls': 'et_pb_toggle_content_' + e,
			'id': 'et_pb_toggle_control_' + e,
			'tabindex': '0'
		});							  
	});
	
	
	$('.et_pb_toggle_open .et_pb_toggle_title').each(function () {
		$(this).attr('aria-expanded', 'true');
	});
	
	$('.et_pb_toggle_close .et_pb_toggle_title').each(function () {
		$(this).attr('aria-expanded', 'false');
	});
	
	$('.et_pb_accordion_item .et_pb_toggle_content').each(function (e){
		$(this).attr({
			'id':'et_pb_accordion_content' + e,
			'role': 'region',
			'aria-labeledby': 'et_pb_accordion_control_' + e
		});
	});
	
	$('.et_pb_toggle_item .et_pb_toggle_content').each(function (e){
		$(this).attr({
			'id':'et_pb_toggle_content' + e,
			'role': 'region',
			'aria-labeledby': 'et_pb_toggle_control_' + e
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
	$('.et_pb_accordion_item .et_pb_toggle_title').on('click', function() {
		var $accordion_container = $(this).closest('.et_pb_accordion');

		setTimeout(function() {
			$accordion_container.find('.et_pb_toggle_title').each(function() {
				var $this_item = $(this).closest('.et_pb_accordion_item');

				if ($this_item.hasClass('et_pb_toggle_open')) {
					$(this).attr('aria-expanded', 'true');
					$(this).next('.et_pb_toggle_content').attr('aria-hidden', 'false');
				} else {
					$(this).attr('aria-expanded', 'false');
					$(this).next('.et_pb_toggle_content').attr('aria-hidden', 'true');
				}
			});
		}, 750); 
	});
	
	/* control with enter or space */
	$('.et_pb_accordion_item .et_pb_toggle_title').on('keyup', function(n){
		if(n.keyCode==13 || n.keyCode==32){ //enter and space bar
			n.preventDefault();
			$(this).trigger('click');
		}
	});	
	
	/* click events - toggle */
	$('.et_pb_toggle_item .et_pb_toggle_title').on('click', function() {
		var $this_toggle_title = $(this);
		var $this_item = $this_toggle_title.closest('.et_pb_toggle_item');

		// Use a short delay to allow Divi's animation and classes to be applied first
		setTimeout(function() {
			// Check if Divi has marked this item as open
			if ($this_item.hasClass('et_pb_toggle_open')) {
				$this_toggle_title.attr('aria-expanded', 'true');
				$this_toggle_title.next('.et_pb_toggle_content').attr('aria-hidden', 'false');
			} else {
				$this_toggle_title.attr('aria-expanded', 'false');
				$this_toggle_title.next('.et_pb_toggle_content').attr('aria-hidden', 'true');
			}
		}, 750); 
	});
	
	/* control with enter or space */
	$('.et_pb_toggle_item .et_pb_toggle_title').on('keyup', function(n){
		if(n.keyCode==13 || n.keyCode==32){ //enter and space bar
			$(this).trigger('click');
		}
	});	
});