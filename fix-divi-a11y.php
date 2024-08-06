<?php
/**
 * Plugin Name:       Fix Divi A11y
 * Plugin URI:https://elevagedigital.com/fix-divi-a11y/?utm_source=wordpress&utm_medium=referral&utm_campaign=fixdivi
 * Description:       Fix Accessibility Issues in Divi Theme and Page Builder
 * Requires at least: 6.3
 * Requires PHP:      8.1
 * Version:           1.1
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
	define( 'FDA11Y_VERSION', '1.1' );
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
