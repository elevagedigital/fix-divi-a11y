<?php
/**
 * Menu functions.
 *
 * @since      1.0.0
 *
 * @package    Fix_Divi
 * @subpackage Fix_Divi/public
 */

	if ( isset(get_option('et_divi')['header_style'] )) {
		$header = get_option('et_divi')['header_style'];
	}
	else {
		$header='left';
	}




	/**
	*
	* Fix Menu  -- Default/Centered
	*
	**/

	function et_add_navigation_default(){
		wp_enqueue_script( 'fix_divi_default_mobile_menu', plugins_url( '/js/fix-divi-default-mobile-menu.js' , __FILE__ ), array( 'jquery' ), '1.0', true );
		wp_enqueue_script( 'fix_divi_default_menu', plugins_url( '/js/fix-divi-dropdown-menu.js' , __FILE__ ), array( 'jquery' ), '1.0', true );
	}

	function custom_nav_styles(){
		
		$customstyle="";
		$customstylechild="";
		$customstyleactive="";
		$customstylemobile="";
		
		
		if ( isset(get_option('et_divi')['primary_nav_font']) && get_option('et_divi')['primary_nav_font'] != "" ) {
			$customstyle = $customstyle . "font-family: " . get_option('et_divi')['primary_nav_font'] ." !important;";
		}
		if ( isset(get_option('et_divi')['primary_nav_font_size']) && get_option('et_divi')['primary_nav_font_size'] !="14" ) {
			$customstyle = $customstyle . "font-size: " . get_option('et_divi')['primary_nav_font_size'] ."px !important;";
		}
		if ( isset(get_option('et_divi')['primary_nav_font_spacing']) && get_option('et_divi')['primary_nav_font_spacing'] != '0') {
			$customstyle = $customstyle . "letter-spacing: " . get_option('et_divi')['primary_nav_font_spacing'] ."px !important;";
		}
		if ( isset(get_option('et_divi')['primary_nav_font_style'])) {
			$fontstyle = get_option('et_divi')['primary_nav_font_style'];
		}
		if ( str_contains($fontstyle,'bold') ){
			$customstyle = $customstyle . "font-weight: bold !important;";
		}
		if ( str_contains($fontstyle,'italic') ){
			$customstyle = $customstyle . "font-style: italic !important;";
		}
		if ( str_contains($fontstyle,'uppercase') ){
			$customstyle = $customstyle . "text-transform: uppercase !important;";
		}
		if ( str_contains($fontstyle,'underline') ){
			$customstyle = $customstyle . "text-decoration: underline !important;";
		}
		if ( isset(get_option('et_divi')['menu_link'])) {
			$customstyle = $customstyle . "color: ". get_option('et_divi')['menu_link']. " !important;";
			$customstylemobile = $customstylemobile . "color: ". get_option('et_divi')['menu_link']. " !important;";
		}
		if ( isset(get_option('et_divi')['menu_link_active'])) {
			$customstyleactive = $customstyleactive . "color: ". get_option('et_divi')['menu_link_active']. " !important;";
		}
		else{
			$customstyleactive = $customstyleactive . "color: #2ea3f2 !important;";
		}
		
		if ( isset(get_option('et_divi')['primary_nav_dropdown_link_color'])) {
			$customstylechild = $customstylechild . "color: ". get_option('et_divi')['primary_nav_dropdown_link_color']. " !important;";
		}
		else{
			$customstylechild = $customstylechild . "color: rgba(131,0,233,0.6) !important;";
		}
		
		echo("<style>#top-menu li button{". $customstyle ."} #top-menu li.current-menu-item .link-button-wrap a, #top-menu li.current-menu-item .link-button-wrap button, #top-menu li.current-menu-ancestor .link-button-wrap a, #top-menu li.current-menu-ancestor .link-button-wrap button{". $customstyleactive. "} #top-menu li li button, #top-menu li.current-menu-item li .link-button-wrap a, #top-menu li.current-menu-item li .link-button-wrap button  {". $customstylechild ."} .et_mobile_menu li button .btn-label{". $customstylemobile . "}</style>");
	}

	if (  $header === false || $header == 'left' || $header == 'centered' || $header == 'split' ){
		add_action( 'et_header_top', 'et_add_navigation_default', 9 );
		add_action( 'wp_body_open', 'custom_nav_styles' );
	}

	

	/**
	*
	* Fix Menu  -- Slide
	*
	**/

	function add_fix_divi_slide_mobile_menu(){
		wp_enqueue_script( 'fix_divi_slide_mobile_menu', plugins_url( '/js/fix-divi-slide-mobile-menu.js' , __FILE__ ), array( 'jquery' ), '1.0', true );
	}

	function custom_slide_nav_styles(){
		$customstyleslide="";
		$customstyleslideactive="";

		if ( isset(get_option('et_divi')['slide_nav_font']) && get_option('et_divi')['slide_nav_font'] != "" ) {
			$customstyleslide = $customstyleslide . "font-family: " . get_option('et_divi')['slide_nav_font'] ." !important;";
		}
		if ( isset(get_option('et_divi')['slide_nav_font_size']) && get_option('et_divi')['slide_nav_font_size'] !="14" ) {
			$customstyleslide = $customstyleslide . "font-size: " . get_option('et_divi')['slide_nav_font_size'] ."px !important;";
		}
		if ( isset(get_option('et_divi')['slide_nav_font_spacing']) && get_option('et_divi')['slide_nav_font_spacing'] != '0') {
			$customstyleslide = $customstyleslide . "letter-spacing: " . get_option('et_divi')['slide_nav_font_spacing'] ."px !important;";
		}
		if ( isset(get_option('et_divi')['slide_nav_font_style'])) {
			$fontstyleslide = get_option('et_divi')['slide_nav_font_style'];
		}
		if ( str_contains($fontstyleslide,'bold') ){
			$customstyleslide = $customstyleslide . "font-weight: bold !important;";
		}
		if ( str_contains($fontstyleslide,'italic') ){
			$customstyleslide = $customstyleslide . "font-style: italic !important;";
		}
		if ( str_contains($fontstyleslide,'uppercase') ){
			$customstyleslide = $customstyleslide . "text-transform: uppercase !important;";
		}
		if ( str_contains($fontstyleslide,'underline') ){
			$customstyleslide = $customstyleslide . "text-decoration: underline !important;";
		}
		if ( isset(get_option('et_divi')['slide_nav_links_color'])) {
			$customstyleslide = $customstyleslide . "color: ". get_option('et_divi')['slide_nav_links_color']. " !important;";
		}
		if ( isset(get_option('et_divi')['slide_nav_links_color_active'])) {
			$customstyleslideactive = $customstyleslideactive . "color: ". get_option('et_divi')['slide_nav_links_color_active']. " !important;";
		}
		else{
			$customstyleslideactive = $customstyleslideactive . "color: #FFFFFF !important;";
		}
		
		echo("<style>.et_slide_in_menu_container .et_mobile_menu li button {". $customstyleslide ."} .et_slide_in_menu_container .et_mobile_menu li.current-menu-item button {".$customstyleslideactive."} </style>");
		
	}
	
	if ( $header !== false && $header == 'slide'){
		add_action( 'wp_enqueue_scripts', 'add_fix_divi_slide_mobile_menu' );
		add_action( 'wp_body_open', 'custom_slide_nav_styles' );
	}

	/**
	*
	* Fix Menu  -- Fullwidth
	*
	**/

	function add_fix_divi_fullwidth_mobile_menu(){
		wp_enqueue_script( 'fix_divi_fullwidth_mobile_menu', plugins_url( '/js/fix-divi-fullwidth-mobile-menu.js' , __FILE__ ), array( 'jquery' ), '1.0', true );
	}
	
	if ( $header !== false && $header == 'fullscreen'){
		add_action( 'wp_enqueue_scripts', 'add_fix_divi_fullwidth_mobile_menu' );
		add_action( 'wp_body_open', 'custom_slide_nav_styles' );
	}
	
	
	/**
	*
	* Fix Menu  -- Custom
	*
	**/

	function add_fix_divi_custom_mobile_menu(){
		wp_enqueue_script( 'fix_divi_custom_mobile_menu', plugins_url( '/js/fix-divi-custom-mobile-menu.js' , __FILE__ ), array( 'jquery' ), '1.0', true );
		wp_enqueue_script( 'fix_divi_custom_dropdown_menu', plugins_url( '/js/fix-divi-custom-dropdown-menu.js' , __FILE__ ), array( 'jquery' ), '1.0', true );
	}

	//if ( $header !== false && $header !== 'fullscreen' && $header !== 'slide' && $header !== 'split' && $header !== 'centered' && $header !='left'){
	add_action( 'wp_enqueue_scripts', 'add_fix_divi_custom_mobile_menu' );
	//}
	
