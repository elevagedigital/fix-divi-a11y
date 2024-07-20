# fix-divi-a11y

Plugin Features
* Replaces default meta viewport tag with one that allows zooming in/out
* Adds focus indicator
* Adds screen-reader-text css class
* Add prefers-reduced-motion media query to minimize animation
* Adds keyboard support for drop-down and mobile navigation
* Adds buttons within navigation for menu items with children without href values
* Updates labels for social media icons
* Adds keyboard support for accordions, tabs and toggles

Additional Code 

-- For Slidein Menu, add custom menu close button to header.php (approx line 95)
<div class="et_slide_in_menu_container">
<div class="a11y-close-button-wrap a11y-close-top"><button id="a11y-close-menu-top" class="a11y-close-menu" tabindex="0">Close Menu</button></div>

-- For Slidein Menu and Fullwidth Menu, add nav around mobile nav menu in header.php (approx line 167 && 186)
<nav id="mobile-menu-slide-nav">

-- For Slidein Menu and Fullwidth Menu, replace search form code in header.php (approx line 119 && approx line 295)
<form role="search" method="get" class="et-search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
  <label>
  <span class="screen-reader-text">Search for:</span>
  <input type="search" class="et-search-field" placeholder="Search …" value="<?php get_search_query() ?>" name="s">
  </label>
  <button class="search-submit" aria-label="Search">
    <svg aria-hidden="true" fill="currentColor" class="svg-icon search-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 26 28">    
      <title>Search</title>
			<path d="M18 13c0-3.859-3.141-7-7-7s-7 3.141-7 7 3.141 7 7 7 7-3.141 7-7zM26 26c0 1.094-0.906 2-2 2-0.531 0-1.047-0.219-1.406-0.594l-5.359-5.344c-1.828 1.266-4.016 1.937-6.234 1.937-6.078 0-11-4.922-11-11s4.922-11 11-11 11 4.922 11 11c0 2.219-0.672 4.406-1.937 6.234l5.359 5.359c0.359 0.359 0.578 0.875 0.578 1.406z"></path>
		</svg>
	</button>
</form>



