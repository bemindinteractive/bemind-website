# Vidra Website

The new Jekyll powered website for Vidra.

## Setup

After you clone this repo run:

```
bundle install
```

That's it, you're done.

## Develop

You can use the Jekyll development server when you need to make changes to the website:

```
jekyll serve
```

## Build

To build the project for production simply run:

```
jekyll build
```

## deleting .sass-cache (se non vedi le tue modifiche al css)

- `npm install --global gulp-cli` (installa gulp)

- `npm install` (installa tutti gli altri pacchetti che servono)

- lanciare sia `jekyll serve` in un terminale sia `gulp` da un altro terminale, ma dalla stessa directory.

quando viene modificato qualcosa in `_sass`, la dir `.sass-cache` viene cancellata.
