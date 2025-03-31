# fix-divi-a11y

Version 1.2
======================================
*Significant update to menu styling to better support combinations of links and buttons within dropdown menus.  Button styles now reflect the link styles that are set within the Appearance > Customize > Header & Navigation settings.  These changes apply to the five standard Divi heading styles: Default, Centered, Centered Inline Logo, Slidein, and Full Screen. If you are using the Divi Theme Builder to create a custom header, you will need to use custom CSS to style any buttons that open dropdown menus.

Version 1.1.03
======================================
*Updated lines 159 and 167 in fix-divi-tabs-accordions-toggles.js so that id and aria-labelledby attributes correctly match and corrected the spelling of "aria-labelledby".

Version 1.1.02
======================================
*header-new.php: Added aria label of "Primary Menu" to nav tags on lines 204 and 279.  This label can be changed to whatever is most appropriate for your design
*footer-new: added footer-new file to replace footer.php in child theme.  If there is a menu associated with the Footer Menu location, it will be wrapped in a nav tag and that nav tag will have an aria label of "Footer Menu".  This value can be changed to whatever is most appropriate to your design.
*theme-header-new.php: If adding header.php to your child theme doesn't work, try using theme-header.php instead

Version 1.1.01
======================================
*update CSS to include .screen-reader-text:focus and show label for password protection form

Version 1.1
=======================================
*Update menu.php to pull header style from Divi settings

Version 1.0 Plugin Features
=========================================
* Replaces default meta viewport tag with one that allows zooming in/out
* Adds focus indicator (with custom color selection)
* Adds screen-reader-text css class
* Add prefers-reduced-motion media query to minimize animation
* Adds keyboard support for drop-down and mobile navigation**
* Adds buttons to open/close drop-down menus
* If parent of a drop-down menu has href="#", it is coded as a button, not a link
* Updates labels for social media icons
* Adds keyboard support for accordions, tabs and toggles
* Adds aria-label to the "Read More" link in the blog module to be "Read More" + the title of the post
* Prevents keyboard and screen reader users from accessing hidden search form

** requires changes to header.php file
changes to header.php also recommended for the search form.


Directions
====================================================
1. Install plugin
2. Go to Settings > Fix Divi A11y to set your focus indicator color
3. Copy the contents of header-new.php (based on Divi version 4.25.2) to your header.php file
