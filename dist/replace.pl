#!/usr/bin/perl
#
# VERSION: 1.14.0
#
# This script will search and replace for the inclusion of qunit.css, qunit.js, jquery-x.js
# and replace with new locations for these files as well as inject the QUnitChainer includes
# needed for converting existing qunit test plans to use QUnitChainer.
#
# To use it you will have to customize the replacement values to match your directory tree
# structure.
#
# You must customize these variables:
# $qunit_chainer_relative_dir - specifies relative path from where you test plans are to where QUnitChainer is.
# %Replace                    - specifies regular expressions to search for and replacement strings.
# @Tests                      - specifies the test plan filenames in the order they should be executed.
# $qunit_injection            - code to inject immediately after the place where qunit.js is in your test plans
#
# Example usage:
#
# ls -1 US14729-HTML5-Ad-Lib-Four-Device-Sizes/ | grep .html | sort | perl -pne 's{\A}{   "}xms; s{\n\z}{",\n}xms' >> replace.pl
# edit replace.pl and move the list of test plans to the  @Test variable as well as set the other variables as needed
# ./replace.pl -match US14729-HTML5-Ad-Lib-Four-Device-Sizes/US14729-Scenario01-offline.html
#   -- to see what lines of the test plan are matched
# ./replace.pl -preview US14729-HTML5-Ad-Lib-Four-Device-Sizes/US14729-Scenario01-offline.html
#   -- to preview how the matched lines will be transformed after replacement
# ./replace.pl -replace US14729-HTML5-Ad-Lib-Four-Device-Sizes/*.html
#   -- to perform the replacement on all test plan files

use strict;
use Fatal qw(open close);

# Define the relative path to QUnitChainer directory from the test plans being modified
my $qunit_chainer_relative_dir = "../../QUnitChainer";

# Define what to insert immediately after the inclusion of qunit.js in the test plan

my $qunit_injection = <<"EOJS";

<!--[if lt IE 8 ]> <script language="javascript" src="$qunit_chainer_relative_dir/json2/json2.js"></script> <![endif]-->
    <script type="text/javascript" src="$qunit_chainer_relative_dir/QUnitChainer.js"></script>
    <script type="text/javascript">
var Plan = {
  // Specify the test plan to run after this one
  nextTestPlan: '$qunit_chainer_relative_dir/0-control.html',
  '-': '-'
};
QUnitChainer.init();
    </script>
EOJS

# Define what to search for and replace with

my %Replace =
(
   'href=".*?/qunit\.css"'         => qq{href="$qunit_chainer_relative_dir/qunit/qunit.css"},
   'src=".*?/jquery.*?\.js"'       => qq{src="$qunit_chainer_relative_dir/jquery/jquery-1.6.2.min.js"},
   'src=".*?/ads-html5\.js"'       => qq{src="../../h5ads/ads.js"},
   'src=".*?/qunit\.js"></script>' => qq{src="$qunit_chainer_relative_dir/qunit/qunit.js"></script>$qunit_injection},

   # Additional changes needed for converting 0-test-bdd.html based files to work with QUnitChainer
#   'test\("given", function \(\) \{' => qq{module(TEST.title);\n\ntest("given", function () \{},
#   'var FT = FT \|\| \{\};'          => qq{TEST.title = "Test " + TEST.story + ": Scenario " + TEST.scenario;\n\nvar FT = FT || \{\};},
#   'var title = "Test " \+ TEST\.story \+ ": Scenario " \+ TEST\.scenario;' => '',
#   'jQuery\("head title"\)\.html\(title \+ ": " \+ TEST\.description\);' => qq{jQuery("head title").html(TEST.title + ": " + TEST.description);},
#   'jQuery\("#qunit-header"\)\.html\(title\);' => qq{jQuery("#qunit-header").html(TEST.title);},


   # Some search/replace needed on test plans to make jsLint happy
   ' type="text/javascript"' => '',
#   '\t' => '   ',
#   '/\*globals' => '/*global',
   '[ \t]+\n' => '\n',
);

# @Tests is the list of tests to run in the desired order easily generated with a command like so:
# ls -1 US14729-HTML5-Ad-Lib-Four-Device-Sizes/ | grep .html | sort | perl -pne 's{\A}{   "}xms; s{\n\z}{",\n}xms' >> replace.pl

my @Tests = (
   "US14729-Scenario01-offline.html",
   "US14729-Scenario02-set-zone.html",
   "US14729-Scenario03-small-lib-two-banners.html",
   "US14729-Scenario04-small-lib-no-mpu.html",
   "US14729-Scenario05-small-lib-page-counters-in-call.html",
   "US14729-Scenario06-small-lib-page-counters-increment.html",
   "US14729-Scenario07-small-lib-page-counters-wrap.html",
   "US14729-Scenario08-medium-lib-two-bigger-banners.html",
   "US14729-Scenario09-mediuml-lib-no-mpu.html",
   "US14729-Scenario10-medium-lib-page-counters-in-call.html",
   "US14729-Scenario11-medium-lib-page-counters-increment.html",
   "US14729-Scenario12-medium-lib-page-counters-wrap.html",
   "US14729-Scenario13-large-lib-one-big-banner-only.html",
   "US14729-Scenario13.1-large-wide-lib-one-big-banner-only.html",
   "US14729-Scenario14-large-lib-no-banlb2.html",
   "US14729-Scenario14.1-large-wide-lib-no-banlb2.html",
   "US14729-Scenario15-large-lib-one-mpu.html",
   "US14729-Scenario15.1-large-wide-lib-one-mpu.html",
   "US14729-Scenario16-large-lib-one-hlfmpu.html",
   "US14729-Scenario16.1-large-wide-lib-one-hlfmpu.html",
   "US14729-Scenario17-large-lib-page-counters-in-call.html",
   "US14729-Scenario18-large-lib-page-counters-increment.html",
   "US14729-Scenario19-large-lib-page-counters-wrap.html",
   "US14729-Scenario20-small-site-name-ok.html",
   "US14729-Scenario21-small-site-name-test-env-ok.html",
   "US14729-Scenario22-medium-site-name-ok.html",
   "US14729-Scenario23-large-site-name-ok.html",
   "US14729-Scenario24-large-wide-site-name-ok.html",
   "US14729-Scenario25-unknown-screen-goes-offline.html",
   "US14729-Scenario26-ad-calls-ord-on-same-page.html",
   "US14729-Scenario27-ad-calls-ord-on-different-page.html",
   "US14729-Scenario28-FTQA-cookie-override.html",

   "$qunit_chainer_relative_dir/sample/q-test.html",
   "$qunit_chainer_relative_dir/0-control.html"
);

sub usage
{
   my ($message) = @_;

   print <<"EOUSAGE";
$0: [-match] [-preview] [-replace] file ...

This script will search and replace for the inclusion of qunit.css, qunit.js,
jquery.js and replace with new locations for these files as well as inject the
QUnitChainer includes needed for converting existing qunit test plans to use
QUnitChainer.

To use it you will have edit it to customize the replacement values to match
your directory tree and test plan order.

-replace  This options causes the listed files to be modified. It is the
          default option.
-match    This option will not change the files listed.  It only searches
          them and shows you what lines would be matched and modified.
-preview  This option will not change the files listed.  It searches and
          shows you what the changes would be.

EOUSAGE
   print "$message\n" if ($message);
   exit(1);
}

sub main
{
   my (@args) = @_;
   my $processed = 0;
   my $show_matches = 0;
   my $replace = 1;

   foreach my $arg (@args)
   {
      if ($arg =~ s{\A-+}{}xms)
      {
         if ($arg eq 'match')
         {
            $show_matches = 1;
            $replace = 0;
         }
         elsif ($arg eq 'preview')
         {
            $show_matches = 1;
            $replace = 1;
         }
         elsif ($arg eq 'replace')
         {
            $show_matches = 0;
            $replace = 1;
         }
         else
         {
            usage("Invalid command line option: -$arg.");
         }
      }
      else
      {
         ++$processed;
         print "Processing $arg\n";
         search($show_matches, $replace, $arg);
      }
   }
   unless ($processed)
   {
      usage("You must supply a file to modify.");
   }
}

sub search
{
   my ($show_matches, $replace, $file) = @_;
   my $next_test_plan = get_next_test_plan($file);

   my $line;
   my $raFile = read_file($file);
   my @Output = ();
   my $overwrite = $replace && !$show_matches;
   foreach my $line (@$raFile)
   {
      # If only showing matches, assume we won't print
      my $print = 0;
      foreach my $regex (keys %Replace)
      {
         if ($line =~ /$regex/)
         {
            # Matched one of our search strings.
            $print = 1 if $show_matches;
            if ($replace)
            {
               my $replacement = $Replace{$regex};
               $replacement =~ s{$qunit_chainer_relative_dir/0-control\.html}{$next_test_plan}xms;
               $line =~ s/$regex/$replacement/;
            }
         }
      }
      if ($overwrite)
      {
         push(@Output, $line);
      }
      print "$line\n" if $print && !$overwrite;
   }
   if ($overwrite)
   {
      write_file($file, join("\n", @Output));
   }
}

sub get_next_test_plan
{
   my ($file) = @_;
   my $next_plan = "$qunit_chainer_relative_dir/0-control.html";
   for (my $idx = 0; $idx < scalar(@Tests) - 1; ++$idx)
   {
      my $plan = $Tests[$idx];
      if ($file =~ /$plan/)
      {
         $next_plan = $Tests[$idx + 1];
         last;
      }
   }
   return $next_plan;
}

sub read_file
{
   my ($file) = @_;
   local $/ = undef;
   my $fh;
   open($fh, "<", $file);
   my $content = <$fh>;
   close($fh);
   my @File = split(/\n/, $content);
   return \@File;
}

sub write_file
{
   my ($file, $content) = @_;
   my $fh;
   open($fh, ">", $file);
   print $fh $content;
   close($fh);
}

main(@ARGV);

