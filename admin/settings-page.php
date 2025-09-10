<?php
/**
 * Admin Settings Page for Fix Divi A11y.
 *
 * @package Fix_Divi
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Adds a new settings page under the main "Settings" menu in WordPress admin.
 */
function fda11y_add_settings_page() {
	add_options_page(
		'Fix Divi A11y Settings',      // Page title
		'Fix Divi A11y',               // Menu title
		'manage_options',              // Capability required
		'fix-divi-a11y',               // Menu slug
		'fda11y_render_settings_page'  // Callback function to render the page HTML
	);
}
add_action( 'admin_menu', 'fda11y_add_settings_page' );

/**
 * Renders the HTML for the settings page.
 */
function fda11y_render_settings_page() {
	?>
	<div class="wrap">
		<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
		<p>This plugin helps resolve common accessibility (a11y) issues found in the Divi theme and page builder. Use the settings below to customize the fixes for your site.</p>
		
		<form action="options.php" method="post">
			<?php
			// Outputs the necessary hidden fields (nonce, action, etc.).
			settings_fields( 'fda11y_settings_group' );
			// Renders the settings sections and their fields.
			do_settings_sections( 'fix-divi-a11y' );
			// Renders the submit button.
			submit_button( 'Save Settings' );
			?>
		</form>
	</div>
	<?php
}

/**
 * Registers the settings, sections, and fields for the page.
 */
function fda11y_register_settings() {
	// Register the main setting group. This will store all our options in a single array
	// in the wp_options table.
	register_setting(
		'fda11y_settings_group',     // Option group
		'fda11y_settings',           // Option name
		'fda11y_sanitize_settings'   // Sanitization callback
	);

	// Add the main settings section.
	add_settings_section(
		'fda11y_styles_section',          // ID
		'Custom Styles',                  // Title
		'fda11y_render_styles_section_text', // Callback to render section description
		'fix-divi-a11y'                   // Page slug
	);

	// Add the Brand Color field.
	add_settings_field(
		'fda11y_brand_color',         // ID
		'Brand Color for Focus Indicator', // Title
		'fda11y_render_brand_color_field', // Callback to render the field HTML
		'fix-divi-a11y',              // Page slug
		'fda11y_styles_section'       // Section ID
	);

	// Add the Custom CSS field.
	add_settings_field(
		'fda11y_custom_css',
		'Additional Custom CSS',
		'fda11y_render_custom_css_field',
		'fix-divi-a11y',
		'fda11y_styles_section'
	);
}
add_action( 'admin_init', 'fda11y_register_settings' );

/**
 * Renders the descriptive text for the styles section.
 */
function fda11y_render_styles_section_text() {
	echo '<p>Customize the focus indicator and add your own CSS for accessibility improvements.</p>';
}

/**
 * Renders the Brand Color input field.
 */
function fda11y_render_brand_color_field() {
	$options = get_option( 'fda11y_settings' );
	$color   = ! empty( $options['brand_color'] ) ? $options['brand_color'] : '#0073aa';
	// Use a simple text field instead of the color picker.
	echo '<input type="text" name="fda11y_settings[brand_color]" value="' . esc_attr( $color ) . '" class="regular-text" />';
	echo '<p class="description">Enter your main brand color (e.g., #9553E6) to be used for the enhanced keyboard focus indicator.</p>';
}

/**
 * Renders the Custom CSS textarea field.
 */
function fda11y_render_custom_css_field() {
	$options = get_option( 'fda11y_settings' );
	$css     = isset( $options['custom_css'] ) ? $options['custom_css'] : '';
	echo '<textarea name="fda11y_settings[custom_css]" rows="10" cols="50" class="large-text">' . esc_textarea( $css ) . '</textarea>';
	echo '<p class="description">Add any other custom CSS for accessibility here. This is useful for things like hiding icons from screen readers or adjusting font sizes.</p>';
}

/**
 * Sanitizes the settings input before saving to the database.
 *
 * @param array $input The raw input from the settings form.
 * @return array The sanitized input.
 */
function fda11y_sanitize_settings( $input ) {
	$sanitized_input = array();

	if ( isset( $input['brand_color'] ) ) {
		// Check if it's a valid hex color. If so, save it. Otherwise, save nothing.
		if ( preg_match( '/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/', $input['brand_color'] ) ) {
			$sanitized_input['brand_color'] = $input['brand_color'];
		}
	}

	if ( isset( $input['custom_css'] ) ) {
		// Sanitize the custom CSS. This removes any dangerous HTML tags.
		$sanitized_input['custom_css'] = wp_strip_all_tags( $input['custom_css'] );
	}

	return $sanitized_input;
}

// NOTE: The function to enqueue the color picker script has been removed as it is no longer needed.

