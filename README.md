
= generic-ranking-methods

node.js implementation to generate sports rankings


# Documentation

##Getting Started

- Provide two arrays: an array of teams [example/team_array.json] & an array of games [example/schedule.json]
- call Run(team_array, schedule_array) method
- if schedule is well-connected, this method will return an array of scores in the same order as the team array you passed in

# Installation

    npm install generic-ranking-methods

# Usage

This project was created for my college football ratings system, which can be found at http://www.jamesrengland.com/Rank. This section is simply all of the complicated matrix math that is required to turn your game results into an array of weighted ratings. These 'games' could be sporting events or any comparison between two objects

# Changelog

## 1.0.3
- added example folder with basic 4-team schedule/results
- created sorting method within index.js that allows team array to be sorted by generated ratings

## 1.0.1 - 1.0.2
- fixed small bugs to allow project to run without original code
- changes to readme, getting GIT and NPM docs coordinated
- Basically learning how to contribute to GitHub and npm

## 1.0.0
- pulled code from personal project

# License

This project is released under The MIT License

Copyright (c) 2014, James R England

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
