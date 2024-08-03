# fix-divi-a11y

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
2. Go to Settings > Fix Divi A11y to set your heading style and focus indicator color
3. Copy the contents of header-new.php (based on Divi version 4.25.2) to your header.php file
