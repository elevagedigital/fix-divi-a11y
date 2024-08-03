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
	* Settings
	*
	**/
	function fix_divi_add_settings_page() {
		add_options_page( 'Fix Divi A11y Settings', 'Fix Divi A11y', 'manage_options', 'fix-divi-plugin', 'fix_divi_render_plugin_settings_page' );
	}
	add_action( 'admin_menu', 'fix_divi_add_settings_page' );

	function fix_divi_render_plugin_settings_page() {
    ?>
    <h1>Fix Divi A11y Settings</h1>
    <form action="options.php" method="post">
        <?php 
        settings_fields( 'fix_divi_plugin_options' );
        do_settings_sections( 'fix_divi_plugin' ); ?>
        <input name="submit" class="button button-primary" type="submit" value="<?php esc_attr_e( 'Save' ); ?>" />
    </form>
    <?php
	}

	function fix_divi_register_settings() {
    register_setting( 'fix_divi_plugin_options', 'fix_divi_plugin_options', 'fix_divi_plugin_options_validate' );
    add_settings_section( 'divi_menu_style', 'Divi Header Style', '', 'fix_divi_plugin' );

    add_settings_field( 'fix_divi_plugin_setting_menu_style', 'Header Style', 'fix_divi_plugin_setting_menu_style', 'fix_divi_plugin', 'divi_menu_style' );
		
	add_settings_section( 'divi_focus_indicator', 'Focus Indicator Color', '', 'fix_divi_plugin' );
		
	add_settings_field( 'fix_divi_plugin_setting_focus_indicator', 'Select Focus Indicator Color', 'fix_divi_plugin_setting_focus_indicator', 'fix_divi_plugin', 'divi_focus_indicator' );
		
	}
	add_action( 'admin_init', 'fix_divi_register_settings' );

	function fix_divi_plugin_options_validate( $input ) {
		$newinput['menu_style'] = $input['menu_style'];
		$newinput['focus_indicator'] = $input['focus_indicator'];
		return $newinput;
	}

	function fix_divi_plugin_setting_menu_style() {
		$options = get_option( 'fix_divi_plugin_options' );
		if (!isset($options['menu_style']))
		{
			$options['menu_style']='default';
		}
		?>
		<input type="radio" id="default" name="fix_divi_plugin_options[menu_style]" value="default"   
		<?php if($options['menu_style']=='default'){echo "checked";} ?>>
		<label for="default">Default/Centered</label><br>
		<input type="radio" id="slide" name="fix_divi_plugin_options[menu_style]" value="slide" <?php if($options['menu_style']=='slide'){echo "checked";} ?>>
		<label for="slide">Slide In</label><br>
		<input type="radio" id="slide" name="fix_divi_plugin_options[menu_style]" value="fullwidth" <?php if($options['menu_style']=='fullwidth'){echo "checked";} ?>>
		<label for="slide">Fullwidth</label><br>
		<input type="radio" id="custom" name="fix_divi_plugin_options[menu_style]" value="custom" <?php if($options['menu_style']=='custom'){echo "checked";} ?>>
		<label for="custom">Custom (using Custom Page Builder Header)</label>
		<?php
	}

	function fix_divi_plugin_setting_focus_indicator() {
		$options = get_option( 'fix_divi_plugin_options' );
		if (  !isset($options['focus_indicator']) )
		{
			$options['focus_indicator']='#3333FF';
		}
		?>
		<label for="focus_indicator">Color:</label>
		<input type="color" id="focus_indicator" name="fix_divi_plugin_options[focus_indicator]" value="<?php echo $options['focus_indicator']; ?>">
		<?php
	}

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

	/**
	*
	* Add Focus Indicator
	*
	**/
	function add_focus_indicator(){
		echo '<style>:focus{outline-width: 2px !important; outline-style: solid !important; outline-offset: 2px !important; outline-color:'.get_option('fix_divi_plugin_options')['focus_indicator'].';}</style>';
	}
	
	add_action( 'wp_head', 'accessible_viewport_meta', 9 );
	add_action( 'wp_head', 'add_focus_indicator');
	add_action( 'wp_head', 'add_fix_divi_styles_css');
	add_action( 'wp_enqueue_scripts', 'add_fix_divi_general_js' );
	add_action( 'wp_body_open', 'add_skip_link' );
	add_filter( 'init', 'remove_duplicate_menu_ids');
	