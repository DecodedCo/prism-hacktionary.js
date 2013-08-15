/*jslint browser: true, indent: 2 */
/*globals self,$,Hacktionary,Prism */
(function () {
  "use strict";

  if (!self.Prism || !self.Hacktionary) {
    return;
  }

  if (Prism.languages.markup) {
    Prism.languages.markup.tag.inside.tag.inside['tag-id'] = /[\w\-]+/;
  }

  Prism.hooks.add("wrap", function (env) {
    var attr, el, elData, prop;
    if (env.language === "markup") {
      if (env.type === "tag-id") {
        // Set up for HTML tag names
        el = Hacktionary.htmlElements[env.content.toLowerCase()] || false;

        if (el !== false && el.desc !== undefined) {
          env.tag = "a";
          env.attributes.href = "#";
          env.attributes["data-hacktionary"] = "htmlElements." + env.content.toLowerCase() + ".desc";
        }
      } else if (env.type === "attr-name") {
        // Set up for HTML attributes
        attr = env.content.toLowerCase();
        el = env.parent[0].content[1].content.toLowerCase();
        elData = Hacktionary.htmlElements[el] || false;

        if (elData !== false && elData.attrs[attr] !== undefined) {
          env.tag = "a";
          env.attributes.href = "#";
          env.attributes["data-hacktionary"] = "htmlElements." + el + ".attrs." + attr;
        } else if (Hacktionary.globalAttributes[attr] !== undefined) {
          env.tag = "a";
          env.attributes.href = "#";
          env.attributes["data-hacktionary"] = "globalAttributes." + attr;
        }
      }
    } else if (env.language === "css") {
      if (env.type === "property") {
        prop = env.content.toLowerCase();

        if (Hacktionary.cssProperties[prop] !== undefined) {
          env.tag = "a";
          env.attributes.href = "#";
          env.attributes["data-hacktionary"] = "cssProperties." + prop;
        }
      }
    }
  });

  // Showing/hiding the popovers
  $(document).on("click", "[data-hacktionary]", function (e) {
    e.preventDefault();
    var $el = $(this),
      desc = $el.attr("data-hacktionary").split("."),
      ref = Hacktionary,
      i;

    for (i = 0; i < desc.length; i += 1) {
      ref = ref[desc[i]];
    }

    if ($el.data("bs.popover") === undefined && $el.data("prism-hacktionary.popover") === undefined) {
      $el.popover({
        html: true,
        content: ref,
        container: "body",
        placement: "bottom"
      });

      $el.popover("show");
    } else {
      $el.popover("destroy");
    }

    $(document).one("click", function () {
      $el.popover("destroy");
    });

  });

  // Custom popovers if there's no bootstrap:
  if ($.fn.popover === undefined) {
    $.fn.popover = function(arg) {
      var $popover;

      if (arg === "destroy") {
        $popover = this.data("prism-hacktionary.popover");
        if ($popover !== undefined) {
          $popover.remove();
          this.data("prism-hacktionary.popover", undefined);
        }
        return this;
      }

      if (arg === "show") {
        $popover = this.data("prism-hacktionary.popover");
        if ($popover !== undefined) {
          $popover.removeClass("hidden");
        }
        return this;
      }

      if (typeof arg === "object") {
        // set up popover
        $popover = $('<div class="prism-hacktionary-popover hidden"></div>');
        $popover.html(arg.content);
        $popover.css(this.offset());
        $popover.appendTo(document.body);

        this.data("prism-hacktionary.popover", $popover);

        return this;
      }
    }
  }

}());
