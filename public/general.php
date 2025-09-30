<?php
/**
 * Theme fixes.
 *
 * @since      1.0.0
 *
 * @package    Fix_Divi
 * @subpackage Fix_Divi/public
 */

	/**
	*
	* Enable zooming in/out - Credit: CampusPress
	*
	**/

	function accessible_viewport_meta() {
		remove_action( 'wp_head', 'et_add_viewport_meta' );
		echo '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />';
	}

	/**
	*
	* Add Custom CSS
	*
	**/
	function add_fix_divi_styles_css(){
		wp_enqueue_style('fix_divi_styles_css', plugin_dir_url( __FILE__ ) . 'css/fix-divi-styles.css');
	}

	/**
	*
	* Add Custon JS
	*
	**/
	function add_fix_divi_general_js(){
		wp_enqueue_script( 'fix_divi_general_js', plugins_url( '/js/fix-divi-general.js' , __FILE__ ), array( 'jquery' ), '1.0', true );
	}

	/**
	*
	* Add Skip to Content link - use #et-main-area because #main-content is not always present (ex. if you use The Event Calendar) but focus will move to whichever element has role="main"
	*
	**/
	function add_skip_link() {
		echo '<a class="screen-reader-text" href="#et-main-area" id="skip-link">Skip to content</a>';
	}

	/**
	*
	* Prevent WordPress from adding a unique ID to nav menu - Credit: CampusPress
	*
	**/
	function remove_duplicate_menu_ids() {
		add_filter( 'nav_menu_item_id', '__return_null', 1000 );
	}

	add_action( 'wp_head', 'accessible_viewport_meta', 9 );
	add_action( 'wp_enqueue_scripts', 'add_fix_divi_styles_css');
	add_action( 'wp_enqueue_scripts', 'add_fix_divi_general_js' );
	add_action( 'wp_body_open', 'add_skip_link' );
	add_filter( 'init', 'remove_duplicate_menu_ids');
	
