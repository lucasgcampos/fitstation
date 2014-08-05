'struct'

$(document).ready(function() {
	$("#peso").on('change', function() {
	    localStorage.setItem('weight', $("#peso").val());
	});
	$("#peso").val(localStorage.getItem('weight'));
});
