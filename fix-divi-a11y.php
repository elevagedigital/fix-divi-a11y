<?php
/**
 * Plugin Name:       Fix Divi A11y
 * Plugin URI:https://elevagedigital.com/fix-divi-a11y/?utm_source=wordpress&utm_medium=referral&utm_campaign=fixdivi
 * Description:       Fix Accessibility Issues in Divi Theme and Page Builder
 * Requires at least: 6.3
 * Requires PHP:      8.1
 * Version:           1.3
 * Author:            Elevage Digital
 * Author URI:https://elevagedigital.com/?utm_source=wordpress&utm_medium=referral&utm_campaign=fixdivi
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
    Fix Divi A11y is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 2 of the License, or any later version. 
    Fix Divi A11y is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. 
    You should have received a copy of the GNU General Public License along with Fix Divi A11y. If not, see https://www.gnu.org/licenses/gpl-2.0.html. 
 * Text Domain:       fix-divi
 *
 * @package           Fix_Divi
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! defined( 'FDA11Y_VERSION' ) ) {
	define( 'FDA11Y_VERSION', '1.3' );
}

// Used for referring to the plugin file or basename.
if ( ! defined( 'FDA11Y_FILE' ) ) {
	define( 'FDA11Y_FILE', plugin_basename( __FILE__ ) );
}

// Used for referring to the plugin base path.
if ( ! defined( 'FDA11Y_PATH' ) ) {
	define( 'FDA11Y_PATH', plugin_dir_path( __FILE__ ) );
}

// Theme Fixes
require 'public/general.php';

// Pagebuilder Fixes
require 'public/pagebuilder.php';

// Menu Fixes
require 'public/menu.php';

// =============================================================================
// SETTINGS PAGE
// =============================================================================
// NOTE: All settings page code should now be in 'admin/settings-page.php'.
// Please ensure you have REMOVED any functions that create a settings page
// (like `add_options_page`) from other files like 'public/general.php' to avoid duplicates.
if ( is_admin() ) {
	require_once FDA11Y_PATH . 'admin/settings-page.php';
}

// =============================================================================
// PLUGIN ACTION LINKS
// =============================================================================
/**
 * Add a "Settings" link to the plugin's action links on the plugins page.
 *
 * @param array $links An array of plugin action links.
 * @return array An array of plugin action links.
 */
function fda11y_add_action_links( $links ) {
	$settings_link = '<a href="' . admin_url( 'options-general.php?page=fix-divi-a11y' ) . '">' . __( 'Settings', 'fix-divi' ) . '</a>';
	// Add the settings link to the beginning of the links array.
	array_unshift( $links, $settings_link );
	return $links;
}
add_filter( 'plugin_action_links_' . FDA11Y_FILE, 'fda11y_add_action_links' );


// =============================================================================
// FRONT-END STYLES
// =============================================================================
/**
 * Get saved settings and output custom CSS to the front end.
 */
function fda11y_output_custom_styles() {
	// Get our saved options.
	$options = get_option( 'fda11y_settings' );

	// Get the focus indicator color, or fall back to a default high-contrast blue if not set.
	if( !isset($options['focus_indicator_style']) ){ $options['focus_indicator_style']='simple'; }
	$focus_indicator_color = ! empty( $options['focus_indicator_color'] ) ? $options['focus_indicator_color'] : '#3333FF';
	$focus_indicator_color2 = ! empty( $options['focus_indicator_color2'] ) ? $options['focus_indicator_color2'] : '#3333FF';

	// Always generate the focus indicator style since we now have a default color.
	if( $options['focus_indicator_style']=='simple' ) {
	$inline_css = "
		*:focus {
			    outline: 2px solid {$focus_indicator_color};
    			outline-offset: 2px; 
		}
		*:focus:not(:focus-visible) {
			box-shadow: none;
			outline: none;
		}
	";		
	}
	
	if( $options['focus_indicator_style']=='two') {
	$inline_css = "
		*:focus {
			/* inner indicator */
			outline: 2px {$focus_indicator_color} solid;
			outline-offset: 0;
			/* outer indicator */
			box-shadow: 0 0 0 4px {$focus_indicator_color2};
		}
		*:focus:not(:focus-visible) {
			box-shadow: none;
			outline: none;
		}
		.logo_container>a:focus{
		outline: none !important;
		box-shadow: none!important;
		}
		.logo_container>a:focus>img{
		outline: 2px {$focus_indicator_color} solid;
		box-shadow: 0 0 0 4px {$focus_indicator_color2};
		}
	";		
	}
	
	if( $options['focus_indicator_style']=='advanced' ) {
	$inline_css = "
		*:focus {
			box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000, 0 0 4px 8px {$focus_indicator_color};
			outline: none; /* Ensure no default outline interferes */
		}
		*:focus:not(:focus-visible) {
			box-shadow: none;
			outline: none;
		}
		.logo_container>a:focus{
		outline: none !important;
		box-shadow: none!important;
		}
		.logo_container>a:focus>img{
		box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000, 0 0 4px 8px {$focus_indicator_color};
		}
	";		
	}
	
	wp_add_inline_style( 'divi-style', $inline_css );
}
add_action( 'wp_enqueue_scripts', 'fda11y_output_custom_styles', 20 ); // High priority to override other styles.
