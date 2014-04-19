'strict';

var peso = 60;
var startLatitude = 0;
var startLongitude = 0;
var currentLatitude = 0; 
var currentLongitude = 0;
var map;
var watch;
window.distancia = 0;
window.caloria;
var overlay = 0;

function mapear() {
    if (navigator.geolocation) {
    	getInitLocal();
    	
		watch = navigator.geolocation.watchPosition(function(position) {
			currentLatitude = position.coords.latitude;
			currentLongitude = position.coords.longitude;
			window.distancia += calculateDistance(startLatitude, startLongitude, currentLatitude, currentLongitude);
			configurarMapeamento();
		});
    }  
    exibirMapa();
  $('ul').hide();
};

/**
 * Pega a posição (longitude e a longitude) inicial do usuário
 */
function getInitLocal() {
	navigator.geolocation.getCurrentPosition(function(position) {
		startLatitude = position.coords.latitude;
		startLongitude = position.coords.longitude;
	}, function(error) {
	alert("Error occurred. Error code: " + error.code);
	 // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
	});
}

/**
 * Exibir mapa com ponto centralizado na localização do usuário
 */
function configurarMapeamento() {
	map.travelRoute({
    	origin: [startLatitude, startLongitude],
    	destination: [currentLatitude, currentLongitude],
    	travelMode: 'driving',
    	step: function(e){
    		desenharRota(e);
    	}
    });
	if(overlay == 0 && startLatitude != 0) {
		overlay++;
		map.addMarker({
			lat: startLatitude,
			lng: startLongitude,
			title: 'Largada!',
			click: function(e) {
				alert('Ponto de Largada!');
			}
		});
	}
}

/**
 * Desenha a roto percorrida pelo usuário em tempo real
 */
function desenharRota(e) {
	$('#instructions').append('<li>'+e.instructions+'</li>');
	$('#instructions li:eq('+e.step_number+')').delay(0*e.step_number).fadeIn(200, function(){
        map.setCenter(e.end_location.lat(), e.end_location.lng());
        map.drawPolyline({
            path: e.path,
            strokeColor: '#131540',
            strokeOpacity: 0.6,
            strokeWeight: 6,
      });
     
      startLatitude = currentLatitude;
      startLongitude = currentLongitude;
	});
}

/**
 * Exibir mapa com ponto centralizado na localização do usuário
 */
function exibirMapa() {
	prettyPrint();
    map = new GMaps({  
	      div: '#map',
//	      zoom: 17,
	      lat: startLatitude,
	      lng: startLongitude,
    });
}

/**
 * Calcula o gasto de calorias do usuário após uma corrida 
 */
function calcularCalorias() {
	return (peso * minutos * 0.133).toFixed(2);
}

/**
 * Calcula a distância percorrida pelo usuário 
 */
//Reused code - copyright Moveable Type Scripts - retrieved May 4, 2010.
//http://www.movable-type.co.uk/scripts/latlong.html
//Under Creative Commons License http://creativecommons.org/licenses/by/3.0/
function calculateDistance(lat1, lon1, lat2, lon2) {
	var R = 6371;
	var dLat = (lat2 - lat1).toRad();
	var dLon = (lon2 - lon1).toRad(); 
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
		Math.sin(dLon / 2) * Math.sin(dLon / 2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
	var d = R * c;
	return d;
}
Number.prototype.toRad = function() {
	return this * Math.PI / 180;
};