/*
 * 1.14.0
 *
 * Test plan file containing FAILING tests
 * QUnit + QUnitChainer Sample Test plan
 *
 * https://github.com/bcowgill/QUnitChainer
 * http://www.swift-lizard.com/2009/11/24/test-driven-development-with-jquery-qunit/
 * http://net.tutsplus.com/tutorials/javascript-ajax/how-to-test-your-javascript-code-with-qunit/
 * http://twoguysarguing.wordpress.com/2010/11/02/make-javascript-tests-part-of-your-build-qunit-rhino/
 * http://martinfowler.com/articles/nonDeterminism.html
 *
 * BDD
 * https://github.com/joshuaclayton/specit
 */

/*jslint browser: true, sloppy: true, white: true, nomen: false, plusplus: false, maxerr: 1000, indent: 3 */

/*properties
    cleanTestPlan, cleanUserAgent, extraTests, ready, replace, result, setup,
    teardown
*/

/*global QUnitChainer, asyncTest, divide, document, equal, expect, jQuery, module, ok, run_tests, deepEqual, setTimeout, start, test
*/

// Clean up the user agent and test plan name for storage
QUnitChainer.cleanUserAgent = function (/* userAgent */) {
   return 'mozilla';
};
QUnitChainer.cleanTestPlan = function (testPlan) {
   testPlan = testPlan.replace('http://sandbox.bsac.com/ipad-testing/', '');
   return testPlan;
};

function run_tests() {
   module("Basic Unit Test");

   test("Sample test", function()
   {
      expect(1);
      var expected = 2,  result = divide(4,2);
      equal(result, expected, 'divide(4,2) should be ' + expected);
   });

   test("Sample test repeat", function()
   {
      expect(1);
      var expected = 2,  result = divide(4,2);
      equal(result, expected, 'divide(4,2) should be ' + expected);
   });

   module("Failing Unit Test with setup and teardown code", {
      setup: function() {
         this.extraTests = 2;
         this.result = divide(4,2);
         ok(true, "setup tests: one extra assert per test");
      },
      teardown: function() {
         ok(true, "teardown tests: and one extra assert after each test");
      }
   });

   test("Sample test fails", function()
   {
      expect(1 + this.extraTests);
      var expected = 3;
      equal(this.result, expected, 'divide(4,2) should be ' + expected);
   });

   test("Sample test fails again", function()
   {
      expect(1 + this.extraTests);
      var expected = 3;
      equal(this.result, expected, 'divide(4,2) should be ' + expected);
   });

   module("Broken Unit Test");

   test("Sample test count wrong", function()
   {
      expect(2);
      var expected = 2,  result = divide(4,2);
      equal(result, expected, 'divide(4,2) should be ' + expected);
   });

   function myAjax(rcCallback, delay) {
      setTimeout(function () {
         rcCallback(true);
      }, delay);
   }

   module("Asynchronous Test (ajax, etc)");
   asyncTest("Delayed action tests", function()
   {
      // How long to wait for tests to complete before resume testing
      var WAIT = 200;
      // Number of assertions to expect before the timeout
      expect(2);

      myAjax(function (value) {
         deepEqual(true, value, 'ajax result should be');
      }, 100);
      myAjax(function (value) {
         deepEqual(true, value, 'another ajax result should be');
      }, 10000);

      // Wait for the tests to complete before continuing on the test plan
      setTimeout(function () {
         start();
      }, WAIT);
   });
}

jQuery(document).ready(function() {
   run_tests();
});
