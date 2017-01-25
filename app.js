
jQuery(function ($) {
var App = {
	pair1: '',
	pair2: '',
	pair3: '',

	init: function() {
		this.bindEvents();
	},
	setUpHexPairs: function(e) { 
		
		if ((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 70) ) {
			this.pair1 = $("#1").val();
			this.pair2 = $("#2").val();
			this.pair3 = $("#3").val();
		}


		if (this.pair1.length === 1) {
			this.pair1 += this.pair1;
		} 
		if (this.pair2.length === 1) {
			this.pair2 += this.pair2;
		}
		if (this.pair3.length === 1) {
			this.pair3 += this.pair3;
		}
	},
	autoTab: function(e) {
		var inputID = e.target.id
		if ( $('#' + inputID).val().length === 2 && $('#' + inputID).val() !== '00') {
          	$('#' + inputID).next().select();
    	}
    },
	updateDOMInputs: function(e) {
		// run on blur 
		// find out how to automatic tab
		if ($('#1').val().length === 1) {
			$('#1').val(this.pair1);
		} 
		if ($('#2').val().length === 1) {
			$('#2').val(this.pair2);
		}
		if ($('#3').val().length === 1) {
			$('#3').val(this.pair3);
		}		
		console.log(this.pair1, this.pair2, this.pair3)
	},
	clearHexPairs: function() {
		this.pair1 = '00';
		this.pair2 = '00';
		this.pair3 = '00';
	},
	bindEvents: function() {
		$('input').on('keyup', this.setUpHexPairs.bind(this));
		$('input').on('keyup', this.autoTab.bind(this));
		$('input').on('blur', this.updateDOMInputs.bind(this));
		$('#reset').on('click', this.clearHexPairs.bind(this));
	}
	


};

App.init();
});