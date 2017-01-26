
jQuery(function ($) {
var App = {
	nums: {
		1: '0',
		2: '0',
		3: '0',
		4: '0',
		5: '0',
		6: '0',
	},
	init: function() {
		this.bindEvents();
		this.resetHexNums();
	},
	setUpHexNums: function(e) { 
		console.log(e.which)
		if ((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 70) || (e.which >= 96 && e.which <= 105)) {
			for (var i in this.nums) {
				this.nums[i] = $("#" + i).val();
			}
		}
	},
	autoTab: function(e) {
		var inputID = e.target.id
		if (((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 70) || (e.which >= 96 && e.which <= 105)) && $('#' + inputID).val().length === 1) {
          	$('#' + inputID).next().focus().select();
    	}
    },
	updateDOMInputs: function(e) {
		// run on blur 
		// find out how to automatic tab
		for (var i in this.nums) {
			if ($('#' + i).val().length === 1) {
				$('#' + i).val(this.nums[i]);
			}  
		}
		console.log(Object.values(this.nums));
	},
	resetHexNums: function() {
		for (var i in this.nums) {
			this.nums[i] = '0'
			$('#' + i).val('0')
		}
	},
	calculateRGB: function() {
		var domNum1 = $('#1').val();
		var domPair2 = $('#2').val();
		var domPair3 = $('#3').val();
		// you're HERE

	},
	bindEvents: function() {
		$('input').on('keyup', this.setUpHexNums.bind(this));
		$('input').on('keyup', this.autoTab.bind(this));
		$('input').on('blur', this.updateDOMInputs.bind(this));
		$('#reset').on('click', this.resetHexNums.bind(this));
	}
	


};

App.init();
});