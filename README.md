# instructions

This book uses mdbook to create static files. 
- Source files are in ./src
- the html is in ./book


# Installation

## install rust
## on mac/linux the following works:
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## install mdbook packages using cargo
## NOTE: a new shell might need to be started
```
cargo install mdbook
```

## install additional packages
```
cargo install mdbook-admonish #for the example, note, quiz kind of blocks
cargo install mdbook-mermaid # for the diagrams
cargo install --git "https://github.com/lzanini/mdbook-katex"
```

# Getting started
## make any changes to the source files in ./src
## to view the changes + create html run the following
```
mdbook watch --open
```
