/*
   Testing functions which could be useful elsewhere.
*/

/*jslint browser: true, sloppy: true, white: false, plusplus: true, maxerr: 1000, indent: 3 */
/*global cmpHTML, QUnitChainer, expect, getKeys, it, itShouldHaveCheckBox, jQuery, testCheckBoxFalse, testCheckBoxTrue */
/*properties
    browserIsIE, checked, html, replace, toEqual,
*/

function getKeys(rObj) {
   var key = '', Keys = [];
   for (key in rObj) {
      if (rObj.hasOwnProperty(key)) {
         Keys.push(key);
      }
   }
   return Keys;
}

function cmpHTML(html) {
   var bDebug = false, idx = 0, search, replace, Tags = ['hr', 'b', 'pre', 'br'];

   // Compress spaces in output for easier comparisons, preserve newlines
   html = html.replace(/\n+/g, '--[CR]--');
   html = html.replace(/\s+/g, ' ');
   html = html.replace(/--\[CR\]--/g, '\n');

   // in IE only we sometimes have leading/trailing spaces on html() content so we strip them
   html = html.replace(/^\s+/, '');
   html = html.replace(/\s+$/, '');

   // in IE only, HTML tags are uppercased!! so sanitize any HTML you are comparing
   // this code only handle simple open/close tags in the Tags list provided
   for (idx = 0; idx < Tags.length; ++idx) {
      // opening tag
      search = '<' + Tags[idx] + '>';
      replace = search.toUpperCase();
      search = new RegExp(search, 'g');
      html = html.replace(search, replace);

      // closing tag
      search = '</' + Tags[idx] + '>';
      replace = search.toUpperCase();
      search = new RegExp(search, 'g');
      html = html.replace(search, replace);
   }

   // Non IE browsers don't include the spaces and newline
   if (!QUnitChainer.browserIsIE()) {
      html = html.replace(/<HR> \n<B>/, '<HR><B>');
   }

   if (bDebug) {
      // make spaces and newlines visible when debugging the comparison of output
      html = html.replace(/\n/g, '[CR]');
      html = html.replace(/\s/g, '[S]');
   }
   return html;
}

function itShouldHaveCheckBox(name, id) {
   it('should have a ' + id + ' checkbox on the page', function () {
      expect(jQuery('input[type="checkbox"][name="' + id + '"][id="' + id + '"]').length).toEqual(1);
   });
   it('should have a label for the ' + name + ' checkbox', function () {
      expect(jQuery('label[for="' + id + '"]').html()).toEqual(name);
   });
}

function testCheckBoxFalse(key) {
   it("should have checkbox " + key + " UNCHECKED", function () {
      expect(key + ' ' + jQuery('input[type="checkbox"][name="' + key + '"]')[0].checked).toEqual(key + ' false');
   });
}

function testCheckBoxTrue(key) {
   it("should have checkbox " + key + " CHECKED", function () {
      expect(key + ' ' + jQuery('input[type="checkbox"][name="' + key + '"]')[0].checked).toEqual(key + ' true');
   });
}

