$(document).ready(function() {
	const formElement = document.querySelector("#mainForm");
	const resultsDiv = document.querySelector("#results");
	const messageDiv = document.querySelector("#message");
	const submitButton = document.querySelector("#submit");
	
	formElement.addEventListener("change", function (e){
		const formData = new FormData(formElement);
		const req = formData.get('requirementText');
		const doc = formData.get('documentTitle');
		const sections = formData.get('sectionTitles');
		
		const formIsEmpty = isStringEmpty(req) && isStringEmpty(doc) && isStringEmpty(sections);
		
		if(formIsEmpty){
			submitButton.disabled = true;
		}
		else {	
			submitButton.disabled = false;	
		}
	})
	formElement.addEventListener("submit", function(e){
		e.preventDefault(); 
		
		setLoading(true);
		const formData = new FormData(formElement);		
		const req = formData.get('requirementText');
		const doc = formData.get('documentTitle');
		const sections = formData.get('sectionTitles');
				
		classifyRequirement({req, doc, sections})
			.then(result => {
				setLoading(false);
				let methods =  Object.keys(result);
				let htmlBuilder = "<h4>Recommender classification results</h4>";
				htmlBuilder += "<ol class='list-group list-group-numbered'>";
				methods.forEach((method,key) => {
					result[method].forEach(classification => {
						htmlBuilder += "<li class='list-group-item d-flex justify-content-between align-items-start'>";	
						htmlBuilder += "<div class='ms-2 me-auto'>";
						htmlBuilder += "<div width='80%'>";
						htmlBuilder += '<label class="form-check-label" style="padding-left:4px" for="resultsCheck">';
						htmlBuilder += `<input class="form-check-input" style="padding-right:4px" type="checkbox" value="${key}" id="resultCheck${key}" />`;
						htmlBuilder += classification["label"] + "</label></div>";
						htmlBuilder += "</div>";
						htmlBuilder += "<span class='badge bg-primary rounded-pill'>"
						htmlBuilder += "Score: " + parseFloat(classification["score"]).toFixed(2);;
						htmlBuilder += "</span>"
						htmlBuilder += "</li>"	
					});
				});
				htmlBuilder += "</ol>";
		        resultsDiv.innerHTML = htmlBuilder;
				
				messageDiv.classList.remove("hidden");
			})
			.catch(() => {
				setLoading(false);
				resultsDiv.innerHTML = "Error";
				
			});
	});
	
	formElement.addEventListener("reset", function(e){
		messageDiv.classList.add("hidden");
		resultsDiv.innerHTML = "";
		submitButton.disabled = true;
	});
});


function setLoading(isLoading) {
	const resultsDiv = document.querySelector("#results");
	let htmlBuilder = '';
	if (isLoading){
		htmlBuilder = '<div class="spinner-border text-secondary" role="status"></div>';
        htmlBuilder += '<div>Loading...</div>';
	}
	resultsDiv.innerHTML = htmlBuilder;
}

function classifyRequirement({req, doc, sections}){
	return new Promise((resolve,reject) => {
		
		$.ajax({
			url: "classifier",
			method: "POST",
			data: {
				requirement: req,
				documentTitle: doc,
				sectionsTitle: sections
			},
			success: resolve,
			error: reject
		});
	
	});
}

function isStringEmpty(str){
	return str === undefined || str === null || str === '';
}