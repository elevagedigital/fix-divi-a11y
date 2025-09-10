<?php
/**
 * Plugin Name:       Fix Divi A11y
 * Plugin URI:        https://elevagedigital.com/fix-divi-a11y/?utm_source=wordpress&utm_medium=referral&utm_campaign=fixdivi
 * Description:       Fix Accessibility Issues in Divi Theme and Page Builder
 * Requires at least: 6.3
 * Requires PHP:      8.1
 * Version:           1.3
 * Author:            Elevage Digital, modified by SeaMonster Studios
 * Author URI:        https://elevagedigital.com/?utm_source=wordpress&utm_medium=referral&utm_campaign=fixdivi
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
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

	// Get the brand color, or fall back to a default high-contrast blue if not set.
	$brand_color = ! empty( $options['brand_color'] ) ? $options['brand_color'] : '#0073aa'; // Default: WordPress Admin Blue.
	$custom_css  = ! empty( $options['custom_css'] ) ? $options['custom_css'] : '';

	// Always generate the focus indicator style since we now have a default color.
	$inline_css = "
		*:focus {
			box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000, 0 0 4px 8px {$brand_color};
			outline: none; /* Ensure no default outline interferes */
		}
		*:focus:not(:focus-visible) {
			box-shadow: none;
			outline: none;
		}
	";

	// Add any custom CSS from the textarea.
	if ( $custom_css ) {
		$inline_css .= "\n/* Custom Accessibility Styles */\n" . $custom_css;
	}

	// A safe handle to attach our inline styles to. Divi's main style is a good candidate.
	wp_add_inline_style( 'divi-style', $inline_css );
}
add_action( 'wp_enqueue_scripts', 'fda11y_output_custom_styles', 20 ); // High priority to override other styles.

