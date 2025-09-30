<?php
/**
 * Admin Settings Page for Fix Divi A11y - Credit: SeaMonster Studios
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

	// Add the Focus Indicator Style field.
	add_settings_field(
		'focus_indicator_style',         // ID
		'Style for Focus Indicator', // Title
		'fda11y_render_focus_indicator_style_field', // Callback to render the field HTML
		'fix-divi-a11y',              // Page slug
		'fda11y_styles_section'       // Section ID
	);
	
	// Add the Focus Indicator Color field.
	add_settings_field(
		'focus_indicator_color',         // ID
		'Color for Focus Indicator', // Title
		'fda11y_render_focus_indicator_color_field', // Callback to render the field HTML
		'fix-divi-a11y',              // Page slug
		'fda11y_styles_section'       // Section ID
	);
	
	// Add the 2nd Focus Indicator Color field.
	add_settings_field(
		'focus_indicator_color2',         // ID
		'Second Color for Focus Indicator - if using 2 color indicator style', // Title
		'fda11y_render_focus_indicator_color2_field', // Callback to render the field HTML
		'fix-divi-a11y',              // Page slug
		'fda11y_styles_section'       // Section ID
	);
	
}
add_action( 'admin_init', 'fda11y_register_settings' );

/**
 * Renders the descriptive text for the styles section.
 */
function fda11y_render_styles_section_text() {
	echo '<p>Customize the focus indicator color and style. If you use the Simple indicator style, your focus indicator color must have a 3:1 contrast ratio with all adjacent background colors. If using the Two-color indicator style, at least one of the colors must have a 3:1 contrast ratio with all adjacent background colors. </p>';
}

/**
 * Renders the Focus Indicator Syle field.
 */
function fda11y_render_focus_indicator_style_field(){
	$options = get_option( 'fda11y_settings' );
	$style	= ! empty( $options['focus_indicator_style']) ? $options['focus_indicator_style'] : 'simple';
	$output = '<fieldset>
<legend>Choose a style:</legend><input type="radio" id="simple" name="fda11y_settings[focus_indicator_style]" value="simple" onclick="radioChange(\'simple\')"';
	if($style=='simple'){$output = $output . 'checked="true"';} 
	$output = $output .'><label for="simple">Simple - One Color</label><br><input type="radio" id="two" name="fda11y_settings[focus_indicator_style]" value="two" onclick="radioChange(\'two\')"';
	if($style=='two'){$output = $output . 'checked="true"';}	
	$output = $output .'><label for="two">Two Colors</label><br><input type="radio" id="advanced" name="fda11y_settings[focus_indicator_style]" value="advanced" onclick="radioChange(\'advanced\')"';
	if($style=='advanced'){$output = $output . 'checked="true"';}
	$output = $output .'><label for="advanced">Advanced - Primary Inticator Color plus Box Shadow</label></fieldset>';
	$output = $output .'<script>function radioChange(x){
	const radios = document.getElementsByName(\'fda11y_settings[focus_indicator_style]\'); 
	Array.from(radios).forEach((element, index)=>{
	element.checked=false;});
	document.getElementById(x).checked = true;}
	
	</script>';
	echo $output;
 }


/**
 * Renders the Focus Indicator Color input field.
 */
function fda11y_render_focus_indicator_color_field() {
	$options = get_option( 'fda11y_settings' );
	$color   = ! empty( $options['focus_indicator_color'] ) ? $options['focus_indicator_color'] : '#3333FF';
	echo '<label for="focus_indicator_color">Color Code 1:</label><input type="text" id="focus_indicator_color" name="fda11y_settings[focus_indicator_color]" value="' . esc_attr( $color ) . '" class="regular-text" size="10" onblur="document.getElementById(\'hexColor\').value = this.value" /><label for="hexColor" class="screen-reader-text">Color selector 1</label><input type="color" name="hexColor" id="hexColor" value="'.esc_attr( $color ).'" onchange="document.getElementById(\'focus_indicator_color\').value = this.value" />';
	echo '<p class="description">Enter your focus indicator color hexcode (e.g., #3333FF).</p>';
}

/**
 * Renders the Focus Indicator Color input field.
 */
function fda11y_render_focus_indicator_color2_field() {
	$options = get_option( 'fda11y_settings' );
	$color2   = ! empty( $options['focus_indicator_color2'] ) ? $options['focus_indicator_color2'] : '#3333FF';
	echo '<label for="focus_indicator_color2">Color Code 2:</label><input type="text" id="focus_indicator_color2" name="fda11y_settings[focus_indicator_color2]" value="' . esc_attr( $color2 ) . '" class="regular-text" size="10" onblur="document.getElementById(\'hexColor2\').value = this.value" /><label for="hexColor2" class="screen-reader-text">Color selector 2</label><input type="color" name="hexColor2" id="hexColor2" value="'.esc_attr( $color2 ).'" onchange="document.getElementById(\'focus_indicator_color2\').value = this.value" />';
	echo '<p class="description">Enter your 2nd focus indicator color hexcode (e.g., #3333FF). This color should be on the opposite of the light/dark spectrum from your first indicator color.</p>';
}


/**
 * Sanitizes the settings input before saving to the database.
 *
 * @param array $input The raw input from the settings form.
 * @return array The sanitized input.
 */
function fda11y_sanitize_settings( $input ) {
	$sanitized_input = array();

	if ( isset( $input['focus_indicator_color'] ) ) {
		// Check if it's a valid hex color. If so, save it. Otherwise, save nothing.
		if ( preg_match( '/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/', $input['focus_indicator_color'] ) ) {
			$sanitized_input['focus_indicator_color'] = $input['focus_indicator_color'];
		}
	}
	
	if ( isset( $input['focus_indicator_color2'] ) ) {
		// Check if it's a valid hex color. If so, save it. Otherwise, save nothing.
		if ( preg_match( '/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/', $input['focus_indicator_color2'] ) ) {
			$sanitized_input['focus_indicator_color2'] = $input['focus_indicator_color2'];
		}
	}

	$sanitized_input['focus_indicator_style'] = $input['focus_indicator_style'];

	return $sanitized_input;
}
