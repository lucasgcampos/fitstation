function sugerirRefeicao() {			  
	var id ="17939bf7";
	var key = "a0373061d12211c62b7677efc236e2b1";
	var query = selecionarRefeicao();
	$.getJSON("https://api.yummly.com/v1/api/recipes?_app_id=" + id + "&_app_key=" + key + "&q="+ query +"&requirePictures=true&callback=?", function(data) {
		var i = 0;
		    $.each(data.matches, function() {
		    if(i == 0) {
				i++;
				$('#yummies')
					.append('<img src="' + this.smallImageUrls[0] + '" />' )
					.append('<h3 style="font-size: 3em">' + query + '</h3>')
					.append('<p style="font-size: 2em">' + this.ingredients + '</p>').appendTo('#yummies').fadeIn();
			}
	    });
	});
}

function selecionarRefeicao() {
	if(window.caloria < 101) {
		return "Easy Chicken Lettuce Wraps";				  
	} else if(window.caloria > 100 && window.caloria < 200) {
		return "Healthier Eggs Benedict";  
	} else {
		return "Rich Homemade Ricotta";
	}
}