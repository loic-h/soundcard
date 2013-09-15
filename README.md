soundcard
=========

Soundcard is a web application which allow you to put sound on your pictures.

It uses Instagram and Soundcloud public libraries.

This version is a functional prototype, but misses a lot of functionnalities :
- the possibility to save your soundcard
- a gallery to explore all the users cards
- a pause function
- the possibility to skip to a chosen moment of the sound
- the possibility to move, delete, edit a new track
- ...

There is stille an unsolved minor bug with the waveform display on the picture.

Design
------

The art direction has been made to correspond to the Soundcloud identity. It uses the Interstate font, the characteristic header of the Soundcloud (websites), and the adequate colors.
The application has been designed to take place only in the Instagram picture format (612 x 612 px).
The different plans come in front of the picture by a set of opacities. The idea was to keep the image on the background in sight, and to make the different elements the most discreet possible.

Code
----

The application is purely client-side. A potential gallery would need a server-side development.
The javascript is based on the Asynchronous Module Definition (AMD) API by using [requireJS](http://requirejs.org/). The application is therefore cut in many modules easing the code updating and the factorization. 
Here is an overview of the structure :

- App
	- Factory
		-FactoryImageManager
		-FactorySoundManager
			- FactoryTrack
			- TrackResult
				- Sound
					- Wave
		- SearchManager

The application also use the following libraries :
- [jQuery](http://jquery.com/) for DOM manipulation.
- [wafeform.js](http://waveformjs.org/) for wave displaying
- [mustache](http://mustache.github.io/) for templating
- [js-signals](http://millermedeiros.github.io/js-signals/) for event managing.



Enjoy this application !