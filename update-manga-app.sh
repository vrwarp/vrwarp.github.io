#!/bin/sh
cd manga-app &&
git pull &&
bower update &&
cd - &&
git add manga-app &&
git commit -a -m "pull" &&
git push
