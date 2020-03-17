//let destinationArray = [1, 2, 3, 4, 5, 6];

//function checkMatch() {
//	var x;
//	var y;
//	x = (destinationArray.length - 1)
//	y = (destinationArray.length - 2)
//	console.log(x);
//	console.log(destinationArray[y]);
//};

//if (destinationArray.length % 2 === 0) {
//	var x = (destinationArray.length - 1);
//	var y = (destinationArray.length - 2);
//	if (destinationArray[x] === destinationArray[y]) {
//			alert("Match Found");
//	} else {
//			alert("Match not found, please try again")
//}}

document.getElementById("submit").addEventListener("click", submit)

function submit() {
	workTime = document.getElementById("sTime")
	console.log(workTime)
}