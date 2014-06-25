GmapsModule.factory('GeocodingService', ['$http','$q', '$window', function($http,$q,$window){
		
		var geo = function(){
			gmapService = this;
			this.loadDeferred = $q.defer();
			//window.addEventListener('load',jQuery.proxy(this.init,this),false);
			//jQuery(window).load(jQuery.proxy(this.init,this));
			this.loadGoogleMaps();
		};

		geo.prototype.init = function(){
			this.geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(-34.397, 150.644);
			var mapOptions = {
				zoom :8,
				center:latlng
			};
			if ( jQuery('#map-canvas').length == 0)
				jQuery('body').append('<div id="map-canvas" style="display:none;"></div>');
			if (typeof document.getElementById('map-canvas') !== 'undefined' && 
				document.getElementById('map-canvas') !== null){
				this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				this.apiKey = 'AIzaSyBjleysc7ZBJdUdGgeUxTQgbMEer-yFBfU';
			}
			this.loadDeferred.resolve();
		};

		geo.prototype.loadGoogleMaps = function(){
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.src = 'http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false&callback=googleMapsLoaded';
			document.body.appendChild(script);

		};

		geo.prototype.ready = function(){
			return this.loadDeferred.promise;
		};

		geo.prototype.geocodeAddress = function(address){
			var deferred = $q.defer();
			this.geocoder.geocode({'address':address},function(results,status){
				if (status == google.maps.GeocoderStatus.OK){
					deferred.resolve(results);
				}else{
					deferred.reject(status);
				}
			});
			return deferred.promise;
		};

		geo.prototype.reverseGeocode = function(latitude,longitude){
			var deferred = $q.defer();
			var latlng = new google.maps.LatLng(latitude,longitude);
			this.geocoder.geocode({'latlng':latlng},function(results,status){
				if (status = google.maps.GeocoderStatus.OK){
					deferred.resolve(results);
				}else{
					
				}
			});
			return deferred.promise;
		};

		geo.prototype.reverseGeocode = function(latlng){
			var deferred = $q.defer();
			this.geocoder.geocode({'latLng':latlng},function(results,status){
				if (status == google.maps.GeocoderStatus.OK){
					deferred.resolve(results);
				}else{
					deferred.reject(status);
				}
			});
			return deferred.promise;
		};
		return new geo();
}]);