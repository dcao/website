---
title: "Seascape: a smarterer CAPE"
date: 2019-09-09T11:59:05-07:00
---

**[Seascape](http://seascape.cao.sh)** is a new website for finding and
comparing courses and professors at UCSD. It uses existing professor/course
quality data and provides metrics and graphs which makes it easier to compare
and quantify the quality of different professors/courses.

# The problem

UCSD has a system for evaluating courses and professors called
[CAPE](cape.ucsd.edu), based on a set of quarterly surveys given to students
regarding class and professor quality. While this info can be super useful for
finding the right classes to register for, there are many problems with its
current implementation which make it harder to make the right course decisions:

  - Nothing is aggregated - each term is listed individually, and there's no way
    to get averages for classes/professors across all terms

  - Numbers aren't contextualized, so what might look like a good statistic can
    actually be secretly damning for a professor/course
    
  - It looks kinda ugly (:/), and it's unintuitive to use at times: for instance,
    columns can't be sorted in the main search screen.
  
In practice, this means a lot of tabs juggled, repeated searches, and hair pulled
over trying to compare six different professors for MATH 20C because the CAPE
website shows every term for every MATH 20C professor and comparing any of that
info is impossible <del>god damnit why is this so frustrating</del>

As a result, comparing classes and making the right professor choice can be more
difficult than it needs to be. And while [Smarter CAPEs](http://smartercapes.com)
can be a helpful tool, it also hides a lot of info which might be useful in service
of summarizing a course and its professors.
  
# Seascape

As part of [SPIS](https://sites.google.com/a/eng.ucsd.edu/spis/home) this year,
we were required to make a final project; this seemed like a good opportunity to
address some of the holes of CAPE. Enter Seascape: the Super Extra Awesome
Spicier CAPE. Not only does this project attempt to package CAPE data in a nicer
looking website, but it also adds a few features to aid class comparison.

## Averaging

To remove the clutter of having all terms of a course/professor combo listed
separately, Seascape averages out all terms for a specific combo. This small
UX change makes course information much easier to digest and compare.

## Percentiles

For each metric, Seascape provides a percentile value, both among all courses
and among courses in the same department (i.e. the percent of classes, either
throughout UCSD or throughout a certain department, which have a value for that
metric lower than the selected class), for all reported metrics. So if a class
had a 96.7% approval rating and this was the 79th percentile for all classes, this
would mean that 79% of all classes have an approval rating of below 96.7%.

This metric contextualizes values by showing how different classes compare to
the whole population. A class with an 80% approval rating might sound nice, but
if only 10% of classes have a lower approval rating, it might sound so nice
anymore.

## Graphs

To aid comparison of professors for a specific course, Seascape currently
provides two scatter plots on every course/professor combo page: Proportion of
Instructor Approvals vs Proportion of Class Approvals and GPA vs Hours per Week.
Each point on these plots represents a professor teaching that specific course,
and each graph tells a different story:

  - The first graph not only compares generally how enjoyable students found
    each professor, but also how much they felt the professor's teaching improved
    or reduced the quality of the course.
    
  - The second graph provides insight to the difficulty of a professor. Some
    professors are easier, giving out less work and higher grades, while others are
    harder, giving out more work and lower grades. Still others fall somewhere in
    between, rewarding hard work with higher grades or giving out fewer, more
    challenging assignments.

## Predictions

Finally, for each metric, Seascape predicts the value of that metric for the next
term (currently Fall 2019) using a linear regression model (basically a machine-
learning-powered trendline creator). Although this model is relatively simple
and potentially a little inaccurate, it provides a good general idea of if the
course/professor is getting worse or better over time.

# The future

There's still plenty of functionality which could be added to Seascape in the
future:

  - Right now, Seascape only uses the summary data available from the CAPE
    search results screen, due to limitations of the data scraping script. In
    the future, we'll have even more metrics to show and analyze.
  
  - Seascape currently doesn't have dedicated pages for professors and courses,
    only for professor/course combos; we have a page for "Gary Gillespie
    teaching CSE 11," but not "all courses taught by Gary Gillespie" or "all CSE
    11 courses."
  
  - There are a few ways we could improve the visualizations: making them more
    interactive so that a user could see more than just other professors teaching
    the same course, creating visualizations separate from the professor/course
    combo pages, and adding more visualizations in general.
    
But for now, Seascape is a plenty useful tool which can help compare professors
and classes. So [try it out](http://seascape.cao.sh), and if you have any comments
or concerns, [leave some feedback on Github](https://github.com/dcao/seascape/issues)!
