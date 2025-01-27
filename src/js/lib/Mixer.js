"use strict";
let a = new AudioContext();
let o = a.createOscillator();
o.connect(a.destination);
o.start();
