Prism-Hacktionary.js
====================

Prism-Hacktionary.js is a plugin for [Lea Verou's Prism.JS][prismjs] syntax highlighter.

It uses Mozilla's [Hacktionary][hacktionary], a list of short HTML/CSS definitions from MDN,
to add popovers explaining terms code when they are clicked. If Bootstrap is installed, it
will use Bootstrap popovers. If not, it will create its own popovers. Requires jQuery. Based
on the [Web Platform Docs][wpd] plugin for Prism.

Demo:
------

- [With bootstrap](http://decodedco.github.io/prism-hacktionary.js/demo/with-bootstrap.html).
- [Without bootstrap](http://decodedco.github.io/prism-hacktionary.js/demo/without-bootstrap.html).

Usage:
------
Include `prism-hacktionary.js`, `hacktionary.js` and `prism-hacktionary.css` in your HTML file, along
with jquery and the normal Prism stuff. Your HTML and CSS files will now have Hacktionary definitions!

If you aren't using Bootstrap, you can customise `.prism-hacktionary-popover` to change how your popovers
look. The `.hidden` class is used to show/hide the popovers.

[prismjs]: http://prismjs.com/ "Prism is a lightweight, robust, elegant syntax highlighting library."
[hacktionary]: https://github.com/brianloveswords/hacktionary
[wpd]: https://github.com/LeaVerou/prism/tree/gh-pages/plugins/wpd
