---
title: I have a blog
date: 2024-12-26
---

Not sure what to write about at the moment, but I can demo some fun features of the website that I've implemented!

# Fancy and fun header formatting

Heading indicators appear in the left margin of the page (if the browser window is large enough). The number of dots corresponds to the heading level---1 for a level 1 heading, 2 for a level 2 heading, and 3 for a level 3 heading. This doesn't appear on mobile devices and cases where the window is too small to fit this information.

# Margin notes

This isn't the only information that appears in the margin of the page! I've also added [margin notes](https://kennethfriedman.org/thoughts/2019/marginal-notes/) to this page;
<span class="aside">
Here are some margin notes on the page! On large windows with lots of room, this will appear next to the content, while on mobile devices and smaller windows, this will appear as content placed inline with the flow of the text.
</span>
notice the notes to the left of this sentence. It doesn't have to appear in between paragraphs either!

These margin notes can support text, images, media---whatever!

# What am I listening to?

If you go back to the [home page of the blog](/) and look at the top left corner, the website should show the last song that I was listening to! This pulls data from my [last.fm account](https://last.fm/user/justdecaf), using a [Netlify function](https://andrewford.co.nz/articles/lastfm-widget-netlify-functions/) to pull this information from the last.fm API and display it on my website, even though it's a statically generated site.
