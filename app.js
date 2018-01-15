$(document).ready(function() {
	var nums = {1: '0', 2: '0', 3: '0', 4: '0', 5: '0', 6: '0'};
	var randomColors = ["#1ABC9C", "#2ECC71", "#3498DB", "#9B59B6", "#34495E", "#16A085", "#27AE60", "#2980B9", "#8E44AD", "#2C3E50", "#F1C40F", "#E67E22", "#E74C3C", "#F39C12", "#D35400", "#C0392B", "#CD5C5C", "#F08080", "#FA8072", "#E9967A", "#FFA07A", "#DC143C", "#FF0000", "#B22222", "#8B0000", "#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#C71585", "#DB7093", "#FFA07A", "#FF7F50", "#FF6347", "#FF4500", "#FF8C00", "#FFA500", "#FFD700", "#FFFF00", "#F0E68C", "#BDB76B", "#D8BFD8", "#DDA0DD", "#EE82EE", "#DA70D6", "#FF00FF", "#FF00FF", "#BA55D3", "#9370DB", "#663399", "#8A2BE2", "#9400D3", "#9932CC", "#8B008B", "#800080", "#4B0082", "#6A5ACD", "#483D8B", "#7B68EE", "#ADFF2F", "#7FFF00", "#7CFC00", "#00FF00", "#32CD32", "#98FB98", "#90EE90", "#00FA9A", "#00FF7F", "#3CB371", "#2E8B57", "#228B22", "#008000", "#006400", "#9ACD32", "#6B8E23", "#808000", "#556B2F", "#66CDAA", "#8FBC8B", "#20B2AA", "#008B8B", "#008080", "#00FFFF", "#00FFFF", "#AFEEEE", "#7FFFD4", "#40E0D0", "#48D1CC", "#00CED1", "#5F9EA0", "#4682B4", "#B0C4DE", "#87CEEB", "#87CEFA", "#00BFFF", "#1E90FF", "#6495ED", "#7B68EE", "#4169E1", "#0000FF", "#0000CD", "#00008B", "#000080", "#191970"];

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	// start off with a random background color. give the first input focus
	function randomStartingBackgroundColor(){
		var randomColor = randomColors[getRandomInt(0, 103)];

		var arr = randomColor.split('');

		// update dom
		$('#1').attr('value', arr[1]).val(arr[1]);
		$('#2').attr('value', arr[2]).val(arr[2]);
		$('#3').attr('value', arr[3]).val(arr[3]);
		$('#4').attr('value', arr[4]).val(arr[4]);
		$('#5').attr('value', arr[5]).val(arr[5]);
		$('#6').attr('value', arr[6]).val(arr[6]);

		// update nums
		nums[1] = arr[1];
		nums[2] = arr[2];
		nums[3] = arr[3];
		nums[4] = arr[4];
		nums[5] = arr[5];
		nums[6] = arr[6];

		$('#1').focus().select();
	}

	// reset nums obj, dom inputs, rgb text box, background color, and gives first input focus
	function reset() {
		for (var i in nums) {
			nums[i] = '0';
			$('#' + i).val('0').attr('value', '0');
		}

		$('#rgb').text('rgb(0,0,0)');
		$('body').css('background-color', 'black');
		$('#1').focus().select();
	}

	// only update nums if a valid hex character inputted
	// autotab to next input and focus and select it
	function setUpHexNums(e) { 
		var id = e.target.id;
		var input = $('#' + id);
		var key = e.originalEvent.data;

		if (/^([0-9a-f]){1}$/i.test(key) && input.val().length === 1) {
			nums[id] = key.toUpperCase();
			// input.attr('value', nums[id]);
			var nextInput = input.next();
			setTimeout(() => {
				nextInput.focus().select();
			}, 0);
		} else {
			input.val('');
		}	
	}

	function calculateRGBPair(num1, num2) {
		var domNum1 = parseInt(num1, 16);
		var domNum2 = parseInt(num2, 16);
		return (domNum1 * 16) + domNum2;
	}

	// calculates rgb from 6 input values and return rgb string
	function calculateRGB() {
		// pair 1 - R
		var pair1 = calculateRGBPair(nums[1], nums[2]);
		// pair 2 - G
		var pair2 = calculateRGBPair(nums[3], nums[4]);
		//  pair 3 - B
		var pair3 = calculateRGBPair(nums[5], nums[6]);
		
		return 'rgb(' + pair1 + ',' + pair2 + ',' + pair3 + ')';
	}

	function repopulateEmptyInput(e) {
		var id = e.target.id;
		if ($('#' + id).val() === '') {
			$('#' + id).val(nums[id]);
		}
	}

	// updates background and the text showing the rgb conversion
	function updateBackgroundColor(){
		var rgb = calculateRGB();
		$('#rgb').text(rgb);
		$('body').css('background-color', rgb);
	}

	function bindEvents() {
		$('input').on('input', setUpHexNums);
		$('input').on('input', updateBackgroundColor);
		$('#reset').on('click', reset);
		$('input').on('blur', repopulateEmptyInput);
		$('input').on('focus', function(e){
			e.preventDefault();
			$(this).select();
		})
	}

	function init(){
		bindEvents();
		reset();
		randomStartingBackgroundColor();
		updateBackgroundColor();
	}

	init();
});