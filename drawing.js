let isDrawing = false;
window.onload = () => {
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	const submit = document.getElementById('submit-button');

	canvas.addEventListener('mousedown', startDrawing);
	canvas.addEventListener('mouseup', stopDrawing);
	canvas.addEventListener('mousemove', (event) => draw(event, context));
	submit.addEventListener('click', saveImage);
};


//begin drawing
function startDrawing() {
	console.log('started drawing');
	isDrawing = true;
}

function stopDrawing() {
	console.log('stopped drawing');
	isDrawing = false;
}

function draw(event, context) {
	console.log('draw event');
	if (isDrawing) {
		const rect = canvas.getBoundingClientRect();
		context.fillRect(event.pageX - rect.left, event.pageY - rect.top, 3, 3);
		
	}
}

function saveImage() {
    	var dataURL = canvas.toDataURL('image/png');
	var data = "";
	$.ajax({
		type: "POST",
		url: "save.php",
		data: {
			imgBase64: dataURL
		}
	}).done(function(data) {
		console.log(data);
		submitImage(data);
	});
}

function submitImage(data) {
	var form = document.getElementById('formboi');
	var hiddenField = document.getElementById('hidden-path');

	//set image filename into hiddenField
	hiddenField.value = data;
	//post to addStars
	form.submit();
}
