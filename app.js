
$(document).ready(function() {

var nums = {1: '0', 2: '0', 3: '0', 4: '0', 5: '0', 6: '0'}
var randomColors = ["#1ABC9C", "#2ECC71", "#3498DB", "#9B59B6", "#34495E", "#16A085", "#27AE60", "#2980B9", "#8E44AD", "#2C3E50", "#F1C40F", "#E67E22", "#E74C3C", "#F39C12", "#D35400", "#C0392B"];

function getRandomInt(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// start off with a random background color. give the first input focus
function randomStartingBackgroundColor(){
	var randomColor = randomColors[getRandomInt(0, 15)];

	var arr = randomColor.split('');

	// update dom
	$('#1').val(arr[1]);
	$('#2').val(arr[2]);
	$('#3').val(arr[3]);
	$('#4').val(arr[4]);
	$('#5').val(arr[5]);
	$('#6').val(arr[6]);

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
		$('#' + i).val('0');
	}

	$('#rgb').val('rgb(0,0,0)');
	$('body').css('background-color', 'black');
	$('#1').focus().select();
}

// only update nums if a valid hex character inputted
// autotab to next input and focus and select it
function setUpHexNums(e) { 
	var input = e.target;
	var id = input.id;

	// check if value and the key pressed are both one valid hex character
	// if statements split up for readability
	if (e.key.length === 1) {
		if (/([0-9a-fA-F]){1}/.test(input.value) && /([0-9a-fA-F]){1}/.test(e.key)) {
			nums[id] = input.value.toUpperCase();
			$('#' + id).next().focus().select();
		}
	}
}

// calculates rgb from 6 input values and return rgb string
function calculateRGB() {
	// pair 1 - R
	var domNum1 = parseInt(nums[1], 16);
	var domNum2 = parseInt(nums[2], 16);
	var pair1 = (domNum1 * 16) + domNum2;
	
	// pair 2 - G
	var domNum3 = parseInt(nums[3], 16);
	var domNum4 = parseInt(nums[4], 16);
	var pair2 = (domNum3 * 16) + domNum4;

	//  pair 3 - B
	var domNum5 = parseInt(nums[5], 16);
	var domNum6 = parseInt(nums[6], 16);
	var pair3 = (domNum5 * 16) + domNum6;

	return 'rgb(' + pair1 + ',' + pair2 + ',' + pair3 + ')';
}

// updates background and the text showing the rgb conversion
function updateBackgroundColor(){
	var rgb = calculateRGB();
	$('#rgb').val(rgb);
	$('body').css('background-color', rgb);
}

function bindEvents() {
	$('input').on('keyup', setUpHexNums);
	$('input').on('keyup', updateBackgroundColor);
	$('#reset').on('click', reset);
}

function init(){
	bindEvents();
	reset();
	randomStartingBackgroundColor();
	updateBackgroundColor();
}

init();
});