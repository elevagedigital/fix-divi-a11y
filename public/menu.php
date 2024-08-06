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

	if (  $header === false || $header == 'left' || $header == 'centered' || $header == 'split' ){
		add_action( 'et_header_top', 'et_add_navigation_default', 9 );
	}

	/**
	*
	* Fix Menu  -- Slide
	*
	**/

	function add_fix_divi_slide_mobile_menu(){
		wp_enqueue_script( 'fix_divi_slide_mobile_menu', plugins_url( '/js/fix-divi-slide-mobile-menu.js' , __FILE__ ), array( 'jquery' ), '1.0', true );
	}
	
	if ( $header !== false && $header == 'slide'){
		add_action( 'wp_enqueue_scripts', 'add_fix_divi_slide_mobile_menu' );
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
	
