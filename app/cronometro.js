var tempo = 0;
var segundos = 0;

function formatatempo(segs) {
	window.minutos = 0;
	hora = 0;
	
	while(segs >= 60) {
		if (segs >= 60) {
			segs = segs - 60;
			window.minutos = window.minutos + 1;
		}
	}

	while(window.minutos >= 60) {
		if (window.minutos >= 60) {
			window.minutos = window.minutos - 60;
			hora = hora + 1;
		}
	}

	if (hora < 10) {
		hora = "0" + hora;
	}
	if (window.minutos < 10) {
		window.minutos = "0" + window.minutos;
	}
	if (segs < 10) {
		segs = "0" + segs;
	}
	cronometro = hora + ":" + window.minutos + ":" + segs;
	
	return cronometro;
}

function conta() {
	segundos++;
	document.getElementById("counter").innerHTML = formatatempo(segundos);
}

function inicia(){
	interval = setInterval("conta();",1000);
}

function para(){
	clearInterval(interval);
}

function zera(){
	tempo = cronometro;
	clearInterval(interval);
	segundos = 0;
	document.getElementById("counter").innerHTML = formatatempo(segundos);
}

/**
 * Imprime os dados na tela 
 */
function printData() {
	document.getElementById("distance").innerHTML = window.distancia.toFixed(1);
	document.getElementById("caloria").innerHTML = window.caloria;
	document.getElementById("tempo").innerHTML = tempo;
}

/**
 * Desliga o rastreamento, zera o cronômetro e finaliza a corrida.
 */
function end() {
	window.caloria = calcularCalorias();
	para();
	zera();
	navigator.geolocation.clearWatch(watch);
	watch = null;
	$("#rota").remove();
	$("#dados").show();
	printData();
}