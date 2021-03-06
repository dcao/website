---
title: "announcing elba"
date: 2018-08-13T00:53:02-07:00
description: "A new package manager for Idris."
toc: true
categories: ["elba"]
draft: true
---

[Idris](https://www.idris-lang.org/) is a pretty neat language. But it doesn't have a package manager, which means managing large projects becomes a bit of a chore.

So, in my spare time, I've worked on a package manager of my own. It's called [**elba**](https://github.com/elba/elba) and it takes heavy inspiration from the likes of Cargo, Pub, and Cabal. It's still very early days, and there are probably bugs hiding everywhere, but in this dev's humble opinion, it's good enough for experimentation and small-to-medium-sized projects: it features robust dependency resolution, build caching, and fully-functional package building, testing, and installation.

# Getting started

Binary releases are available via GitHub Releases. Just download the archive corresponding to the platform of your choice, put the executable somewhere in your path, add `~/.elba/bin` to your PATH and you should be good to go.

Alternatively, if you'd prefer to build the project yourself, you'll need to have the Rust toolchain installed, as elba is written in Rust (more on that later). After that, installation is a piece of cake:

```shell
$ cargo install elba
# remember to add `~/.elba/bin` to your PATH afterwards!
```

From there, all the typical package-manager-y commands should work as you'd expect:

```shell
$ elba new me/test # all names in elba are namespaced
$ cd test
$ elba build 
$ elba repl
```

A short demo of some of elba's basic functionality is [available on asciinema](https://asciinema.org/a/196230), and more detailed documentation is also available online in the form of [a guide](https://elba.readthedocs.io).

# Motivation

elba exists because trying to use other people's packages in Idris right now is a bit of a pain. The most comprehensive grouping of packages available for Idris is a [wiki page](https://github.com/idris-lang/Idris-dev/wiki/Libraries), and the most widely-accepted solution for dependency management is "download them yourself and hope that everything just works(tm)." Additionally, the widely-used ipkg format seems to be [more of a stop-gap solution than anything else](https://github.com/idris-lang/Idris-dev/issues/1825).

## System package manager

The first alternative to writing yet another package manager for a language is to just rely on system package managers: `apt` and `pacman` and `brew` and `dnf` and ... have already solved this problem, and `nix` is a somewhat cross-platform system package manager which provides even more fancy features (fancy configuration, completely reproducible builds, etc.). Unfortunately, relying on system package managers to host language libraries doesn't work out too well in practice:

  - Good luck using any of these on Windows without cygwin or WSL. The only vaguely-cross platform solution out of those, Nix, doesn't natively support Windows, and Windows' Chocolatey isn't meant for hosting libraries.

  - Publishing a package involves going through a multitude of different repositories with their own standards on what should[n't] be allowed, rather than just pushing to a git repo or uploading to a central repository purpose-built for package hosting.

  - It's impossible to maintain parity between platforms. What's on the AUR might not be in the Void Linux repos or the Debian repos or the Homebrew repos. Plus, different package repositories can choose to maintain whatever versions of the package they want. In the end, reproducible builds would get thrown out the window because it would be impossible to rely on the existence of a package in a certain state across OSes.

  - For a solution like Nix, the configuration language can be hard-to-master.

In short, trying to rely on system package managers to save on implementation would be more trouble than it's worth.

## Other package management attempts

elba isn't the first attempt at a package management system for Idris; as far as I know, there are two other Idris package management projects also in the works. I've previously made a [comment on comparing those two alongside elba on r/idris](https://www.reddit.com/r/Idris/comments/8zss8c/state_of_the_ecosystem/e2psdey/?context=0) wherein I tried my best to stay neutral-ish. However, since this is my blog post and my objective now is to sell out as hard as possible for my own software, I'll approach this comparison from a more biased point of view:

  - [idream](https://github.com/idream-build/idream) is currently the most robust package manager for Idris available, written in Haskell. idream and elba's design decisions conflict in a few ways:
  
    - idream takes after `psc-package` most strongly, while elba follows `cargo` and friends. This difference encompasses a few tradeoffs with regards to package sources: psc-package's "package sets" versus elba's "package indices."
    
      - In the package set system, package sets can only contain one version of a dependency, and all dependency resolution happens through the package set (the dependency name is just looked up in the set to find its source). Although this provides a strong guarantee of package compatibility for the default package set (it acts like Stackage), it greatly limits flexibility in choosing package versions and requires wholesale copying of the package set to add other dependencies not in the package set.
    
      - On the other hand, elba's package indices can contain multiple versions of a package, and elba can use multiple package indices at once, along with depending on git and path dependencies directly. This adds complexity to the system (most notably in the resolution algorithm) but ends up allowing for more flexibility: you can depend directly on git and path dependencies without creating a new package set entirely, you can choose what versions of packages you want from what sources you want, etc.

    - idream caches all of its work per-project in a local `.idream-work` folder, while elba globally caches its work in a `$HOME/.elba` folder (elba's caching mechanism ensures that builds stay reproducible even though we're using a global directory). This means that elba can avoid downloading or building a package that has already been downloaded/built for another package, which improves build speeds, among other things.

    - At the moment, elba's ergonomics are better (just a `elba build` versus `idream fetch && idream generate-ipkg && idream compile`); this isn't that big of a deal, though, since it can be added pretty easily

    - Development on idream has slowed down recently, although it looks like [this will change pretty soon](https://www.reddit.com/r/Idris/comments/8zss8c/state_of_the_ecosystem/e42f84t/).

  - [ikan](https://github.com/idris-industry/ikan) is the other contender in the Idris package management space; unlike idream and elba, it's written in Idris! The biggest issue with ikan, though, is that its implementation is still very barebones, and development hasn't moved at the fastest pace; only creating new projects and parsing ipkg files have been implemented.

## What elba does differently

So with all that complaining out of the way, the question remains: what does elba do differently?

  - **It's usable right now!**

    The basic functionality of elba has been completed, and it can already be used for (interactive) development tasks. Developing Idris code at the REPL, building libraries, running code generation on both binaries and libraries, and running test targets have all been implemented.

  - **Dependency resolution**
  
    elba uses a robust dependency resolution algorithm called **Pubgrub**, borrowed from Dart's Pub. This not only means fast dependency resolution, but it also means that when dependencies conflict, elba is able to provide clear error messages to help resolve these issues (see [the docs](https://elba.readthedocs.io/en/latest/reference/dependencies.html#dependency-resolution)).

    In elba, packages can directly depend on local directories or git repositories along with using a package index (elba's concept of a package repository) to resolve dependencies, making it easier to work with packages.

    Additionally, elba already has an [official package index on GitHub](https://github.com/elba/index). It doesn't have any packages because nobody has used elba yet, but hopefully that will change soon!

  - **Global caching of builds**

    elba globally caches most downloaded and built packages, storing them under unique folders in the global `~/.elba` directory to prevent constant rebuilding of packages. Built packages are cached based on the entire environment it was built in, ensuring that builds are reproducible.

# Limitations

This is a very early release, so there are still definite limits to what elba is capable of:

  - **Missing commands**

    Last I checked, cargo has 31 different commands built-in. npm has something like 56. elba has 11. Some of these commands are just conveniences which can be added fairly easily (e.g. an equivalent to `cargo check` and `cargo package`). Others are larger features which might take some more time to implemented (e.g. a general way to interact with package repositories from the CLI: searching, uploading, etc.).

  - **Untested behavior**

    In general, elba lacks tests where it should have them, so correctness of behavior isn't guaranteed. I've tested most of the use-cases I can think of for correctness, but even then I've missed a few spots (e.g. linking to c or js files). That's what GitHub Issues are for :)

  - **_"It's written in Rust!"_**

    Yes, elba is written in Rust, even though it's supposed to be a package manager for Idris. This isn't an ideal state of affairs for a few reasons (it makes extending and using elba in Idris harder, and it just *feels* wrong), but I would consider this the least of elba's drawbacks; using another, more stable language which a much-better-established package ecosystem has its own perks:

    - There are actively-maintained libraries for things like interacting with git repositories (git2), parsing structured configuration/metadata (toml, serde_json) and other miscellaneous stuff (url, nom), making http requests (reqwest), etc.

    - Rust itself lends itself to okay build times and fairly fast runtime performance (this is most important during dependency resolution); both of these are relative unknowns for Idris (though from personal experience I can say that code generation with Idris is *definitely* not that fast)

    - Plus, I didn't (and still don't) know that much Idris when I started working on elba, and attempting to learn the nuances of a dependently-typed language along with solving the typical package manager design concerns would make development a lot slower.

    Maybe in the far-off future the Idris package ecosystem will have matured enough so that elba can be rewritten using itself. :)

# Conclusion

If you'd like to know more about elba, there's a short lil [guide](https://elba.readthedocs.io) available online with some more details on usage and design decisions.

The best way to help out with the project is to just use it! Not only will that help with finding bugs and other missing features, but hopefully it will move the Idris package ecosystem as a whole forwards. 
