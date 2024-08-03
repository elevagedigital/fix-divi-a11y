<?php
/**
 * Pagebuilder fixes.
 *
 * @since      1.0.0
 *
 * @package    Fix_Divi
 * @subpackage Fix_Divi/public
 */


	/**
	* Fixes for Tabs, Accordions and Toggles.
	*
	* @package    Fix_Divi
	* @subpackage Fix_Divi/public
	*
	**/

	function add_fix_divi_tabs_accordions_toggles(){
		wp_enqueue_script( 'fix_divi_tabs', plugins_url( '/js/fix-divi-tabs-accordions-toggles.js' , __FILE__ ), array( 'jquery' ), '1.0', true );
	}

	add_action( 'wp_enqueue_scripts', 'add_fix_divi_tabs_accordions_toggles' );
