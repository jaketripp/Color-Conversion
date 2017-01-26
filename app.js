
jQuery(function ($) {
var App = {
	nums: {
		1: '0', 2: '0', 3: '0', 4: '0', 5: '0', 6: '0',
	},
	init: function() {
		this.bindEvents();
		this.resetHexNums();
	},
	setUpHexNums: function(e) { 

		if ((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 70) || (e.which >= 96 && e.which <= 105)) {
			for (var i in this.nums) {
				this.nums[i] = $("#" + i).val().toUpperCase();
			}
		}
		console.log(Object.values(this.nums));
	},
	autoTab: function(e) {
		var inputID = e.target.id
		if (((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 70) || (e.which >= 96 && e.which <= 105)) && $('#' + inputID).val().length === 1) {
          	$('#' + inputID).next().focus().select();
    	}
    },
	updateDOMInputs: function(e) {
		for (var i in this.nums) {
			if ($('#' + i).val().length > 0) {
				$('#' + i).val(this.nums[i]);
			}  
		}
	},
	resetHexNums: function() {
		for (var i in this.nums) {
			this.nums[i] = '0'
			$('#' + i).val('0')
		}

		$('#rgb').val('rgb(0,0,0)');
		$('body').css('background-color', 'black');
		$('#1').focus().select();
	},
	calculateRGB: function() {
		// pair 1 - R
		var domNum1 = parseInt($('#1').val(), 16);
		var domNum2 = parseInt($('#2').val(), 16);

		this.pair1 = (domNum1 * 16) + domNum2;
		
		// pair 2 - G
		var domNum3 = parseInt($('#3').val(), 16);
		var domNum4 = parseInt($('#4').val(), 16);

		this.pair2 = (domNum3 * 16) + domNum4;

		//  pair 3 - B
		var domNum5 = parseInt($('#5').val(), 16);
		var domNum6 = parseInt($('#6').val(), 16);

		this.pair3 = (domNum5 * 16) + domNum6;


		var RGBString = 'rgb(' + this.pair1 + ',' + this.pair2 + ',' + this.pair3 + ')'
		$('#rgb').val(RGBString);
		$('body').css('background-color', RGBString);
	},
	bindEvents: function() {
		$('input').on('keyup', this.setUpHexNums.bind(this));
		$('input').on('keyup', this.autoTab.bind(this));
		$('input').on('keyup', this.calculateRGB.bind(this));
		$('input').on('blur', this.updateDOMInputs.bind(this));
		$('#reset').on('click', this.resetHexNums.bind(this));
	}
};

App.init();
});