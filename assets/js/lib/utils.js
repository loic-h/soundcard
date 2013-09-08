
if(typeof window.debug === "undefined") {
	var debug =  (function() {
		var slice = Array.prototype.slice,
			dg = function(str) {
				if(window.console) console.log(str);
			};
		
		return function() {
			if(arguments.length > 1) {
				var argsInitiaux = slice.call(arguments),
					str = argsInitiaux.join(" ");
			}
			else str = arguments[0];
			dg(str);
		} 
	}) ();
}


if(typeof window.confirme === 'undefined') {
	window.confirme = function(target, type, param) {
		switch(type) {
			case 'delete':
				var sentence = "Voulez-vous vraiment supprimer l'élément "+param+" ?";
			break;
		}
		return confirm(sentence);
	};
}


/*
 *	Héritage de classes
 *
 *	On étend l'objet Function avec une fonction inherit
 *
 *	classeFille.inherit(classeMere);
 *
 */

if (typeof Function.prototype.inherit === 'undefined') {
	Function.prototype.inherit =  (function () {
		var F = function () {};
		return function(P) {
			F.prototype = P.prototype;
			this.prototype = new F();
			this.baseCtor = P;
			this.base = P.prototype;
			this.prototype.constructor = this;
		};
	})();
}


if (typeof window.extend === 'undefined') {
	extend = function(Parent, Child, prototype) {
		//Child.prototype = new Parent();
		Child.prototype = Object.create(Parent.prototype);
		Object.keys(prototype).forEach(function(k) {
			Child.prototype[k] = prototype[k];
		});
	};
}

if(typeof Object.create === "undefined") {
	Object.create = function(o) {
		if(arguments.length > 1) {
			throw new Error('Object.create implementation only accepts the first parameter.');
		}
		function F() {}
		F.prototype = o;
		return new F();
	}
}

/*
 *	Bind de fonction
 *
 *	Change la référence de this
 *	Etend l'objet Function
 *
 *	function.bind(new_this);
 *
 */
 
if (typeof Function.prototype.bind === "undefined") {
	Function.prototype.bind = function(valeurThis) {
		var func = this,
			slice = Array.prototype.slice,
			argsInitiaux = slice.call(arguments, 1);

		return function() {
			var nouveauxArgs = slice.call(arguments),
				tousLesArgs = argsInitiaux.concat(nouveauxArgs);
				
			func.apply(valeurThis, tousLesArgs);
		};
	}
}

/*
if (typeof Function.prototype.enableEvents === 'undefined') {
	Function.prototype.enableEvents = (function() {
		var addEvent, removeEvent;

		if (typeof window.addEventListener !== 'undefined') {
			addEvent = function(object, type, listener, useCapture) {
				object.addEventListener(type, listener, useCapture);
			};
			removeEvent = function(object, type, listener, useCapture) {
				object.removeEventListener(type, listener, useCapture);
			};
		}
		else if (typeof window.attachEvent !== 'undefined') {
			addEvent = function(object, type, listener, useCapture) {
				object.attachEvent(type, listener);
			};
			removeEvent = function(object, type, listener, useCapture) {
				object.detachEvent(type, listener);
			};
		}
		else {
			throw "No Event Method Found";
		}
		
		return function() {
			this.addEvent = addEvent;
			this.removeEvent = removeEvent;
		}
	}) ();
}
*/

if (typeof window.enableEvents == "undefined") {
	var enableEvents = (function() {
		var addEvent, removeEvent;

		if (typeof window.addEventListener !== 'undefined') {
			addEvent = function(type, listener, useCapture) {
				this.addEventListener(type, listener, useCapture);
			};
			removeEvent = function(type, listener, useCapture) {
				this.removeEventListener(type, listener, useCapture);
			};
		}
		else if (typeof window.attachEvent !== 'undefined') {
			addEvent = function(type, listener, useCapture) {
				this.attachEvent('on'+type, listener);
			};
			removeEvent = function(type, listener, useCapture) {
				this.detachEvent('on'+type, listener);
			};
		}
		else {
			throw "No Event Method Found";
		}
		
		return function() {
			for(var i = 0; i < arguments.length; i++) {
				arguments[i].addEvent = addEvent.bind(arguments[i]);
				arguments[i].removeEvent = removeEvent.bind(arguments[i]);
			}
		};
	}) ();
}

if (typeof window.winSize === "undefined") {
	var winSize = (function() {
		var getWidth, getHeight;

		// //IE 6+ in 'standards compliant mode'
		if (document.documentElement && (document.documentElement.offsetWidth || document.documentElement.offsetHeight)) {
			getWidth = function() {
				return document.documentElement.offsetWidth;
			}
			getHeight = function() {
				return document.documentElement.offsetHeight;
			}
		}
		//IE 4 compatible
		else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
			getWidth = function() {
				return  document.body.clientWidth;
			}
			getHeight = function() {
				return document.body.clientHeight;
			}
		}
		// Most others browsers
		else if (typeof window.innerWidth == 'number') {
			getWidth = function() {
				return  window.innerWidth;
			}
			getHeight = function() {
				return window.innerHeight;
			}
		}
		else throw 'No window sizing method found';
		
		return function() {
			return {
				'width': getWidth.call(),
				'height': getHeight.call()
			}
		};
	}) ();
}


/*
 *	Event wrapper
 *
 *	Wrap les handler des events
 *	=> Tests navigateurs, stop event e.stop() cross browser et plus si affinité…
 *	
 *	
 */

if(typeof window.ewrap === "undefined") {
	var ewrap = function(handler) {
		return function(e) {
			e = e || window.event;
			
			e.keyCode = e.keyCode || e.which;
			
			e.stop = function() {
				if (e.stopPropagation) e.stopPropagation();
			    else e.cancelBubble = true;
			
			    if (e.preventDefault) e.preventDefault();
			    else e.returnValue = false;
			}
			
			return handler.call(this, e);
		};
	};
}

/*
 *	bool hasClass(nodeElement, String)
 *
 *	Test si une nodeElement possède une classe donnée
 *	
 */
 
if(typeof window.hasClass === "undefined") {
	var hasClass = function(el, name) {
		var pattern = new RegExp("(^| )"+name+"( |$)");
		return pattern.test(el.className);
	}
}

/*
 *	void addClass(nodeElement, String)
 *
 *	ajoute une classe
 *	
 */
 
if(typeof window.addClass === "undefined") {
	var addClass = function(el, name) {
		if(hasClass(el, name)) return;
		var classes = el.className.trim().split(' ');
		classes.push(name);
		el.className = classes.join(' ');
	}
}

/*
 *	void removeClass(nodeElement, String)
 *
 *	Test si une nodeElement possède une classe donnée
 *	
 */
 
if(typeof window.removeClass === "undefined") {
	var removeClass = function(el, name) {
		var classes = el.className.trim().split(' ');
		for(var i in classes) {
			if(classes[i] == name) delete classes[i];
		}
		el.className = classes.join(' ');
	}
}

/*
 *	String trim()
 *
 *	Etends l'objet String
 *
 *	Supprime les espaces et autres caracères avant et après
 */
 
if(typeof String.prototype.trim === "undefined") {
	String.prototype.trim = function (){
		return this.replace(/(^\s*)|(\s*$)/g,"");
	}
}


/*
 *	void preloadImages(nodeElement, function)
 *
 *	Attends le chargement de toutes les images dans un node données 
 *	puis les affiche à quand toutes sont chargée et éxécute callback
 */
 
if(typeof window.preloadImages === "undefined") {
	var preloadImages = (function(cont, cb) {

		var hide = function(img) {
			img.style.display = 'none';
		};
		
		var show = function(img) {
			img.style.display = 'inline';
		};
		
		return function(cont, cb) {
			var imgs = cont.getElementsByTagName('img');
			if(imgs.length > 0) {
				var loaded = 0,
					total = imgs.length,
					images = [],
					onLoaded = function() {
						loaded++;
						images.push(this);
						if(loaded === total) {
							images.forEach(show);
							cb();
						}
					};
				for(var i = 0; i < imgs.length; i++) {
					var img = imgs[i];
					enableEvents(img);
					hide(img);
					img.addEvent('load', onLoaded.bind(img));
					img.src = img.src; // Bug ie 8
				}	
			}
			else {
				cb();
			}
		}

	}) ();
}


/*
 *	nodeElement | false firstChild(nodeElement)
 *
 *	Renvoie le premier enfant d'un node sans tenir compte des espaces et autres
 *	
 */
 
if(typeof window.firstChild === "undefined") {
	var firstChild = (function(node) {
		
		var testNode = function(node) {
			var nodes = node.childNodes;
			for(var i = 0; i < nodes.length; i++) {
				var child = nodes[i];
				if(! /\s/.test(child.nodeValue)) return child;

			}
		};
		
		return function(node) {
			return testNode(node);
		};
		
	}) ();
}

/*
 *	String serialize(Object)
 *
 *	Renvoie un objet clef valeur en query : k1=v1&k2=v2…
 *	
 */
 
if(typeof window.serialize === "undefined") {
	var serialize = (function(obj) {
		return function(obj) {
			var qs = [];
			for(var i in obj) {
				qs.push(i+"="+obj[i]);
			}
			return qs.join("&");
		}
	}) ();
}


/*
 *	void uniqueID()
 *
 *	Renvoie un id unique
 *	
 */
 
if(typeof window.uniqueID === "undefined") {
	var uniqueID = (function() {

		var id = 0;

		return function() {
			return ++id;
		}
	}) ();
}

if(typeof window.inArray === "undefined") {
	window.inArray = function(array, p_val) {
		return array.indexOf(p_val) > -1;
	}
}

/*
 *	Object void sortBy(field:String, reverse: Boolean, primer: Function)
 *
 *	Ordonne un Objet selon un champ donné
 *	
 */

if(typeof sortBy === "undefined") {
	var sortBy = function(field, reverse, primer){

		var key = function (x) {return primer ? primer(x[field]) : x[field]};

		return function (a,b) {
			var A = key(a), B = key(b);
			return ((A < B) ? -1 : (A > B) ? +1 : 0) * [-1,1][+!!reverse];                  
		}
	}
}
/*
Examples :
var homes = [{
   "h_id": "3",
   "city": "Dallas",
   "state": "TX",
   "zip": "75201",
   "price": "162500"
}, {
   "h_id": "4",
   "city": "Bevery Hills",
   "state": "CA",
   "zip": "90210",
   "price": "319250"
}, {
   "h_id": "5",
   "city": "New York",
   "state": "NY",
   "zip": "00010",
   "price": "962500"
}];

// Sort by price high to low
homes.sort(sort_by('price', true, parseInt));

// Sort by city, case-insensitive, A-Z
homes.sort(sort_by('city', false, function(a){return a.toUpperCase()}));
*/


if(typeof antispam === "undefined") {
	var antispam = (function(cont) {
		var old = /\[at\]/,
			neu = '@';
		return function(cont) {
			var as = cont.querySelectorAll('a[href^="mailto:"]');
			for(var i = 0; i < as.length; i++) {
				as[i].innerHTML = as[i].innerHTML.replace(old, neu);
				as[i].href = as[i].href.replace(old, neu);
			}
		};
	})();
}