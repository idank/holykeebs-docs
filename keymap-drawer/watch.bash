#!/bin/bash

find . | entr -s 'keymap -c config.yaml draw lily58.yaml > ../keymaps/lily58.svg'
