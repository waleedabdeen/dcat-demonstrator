let requirementsList;

$(document).ready(function() {
	const formElement = document.querySelector("#mainForm");
	const submitButton = document.querySelector("#submit");
	const resultsDiv = document.querySelector("#results");
	const trueLabelsDiv = document.querySelector("#trueLabels");
	const reqIdElement = document.querySelector("#reqId");
	const messageDiv = document.querySelector("#message");
	
	reqIdElement.addEventListener("change", function(e) {
		let { value } = e.target;
		let reqObject = requirementsList.filter(e => e.reqId === value)[0];
		if(reqObject === undefined){
			submitButton.disabled = true;
			formElement.elements.documentTitle.value = "";
			formElement.elements.sectionTitles.value = "";
			formElement.elements.requirementText.value = "";
		}else {
			submitButton.disabled = false;
			formElement.elements.documentTitle.value = reqObject.documentTitle;
			formElement.elements.sectionTitles.value = reqObject.sectionTitles;
			formElement.elements.requirementText.value = reqObject.text;
		}
		
		messageDiv.classList.add("hidden");
		resultsDiv.innerHTML = "";
		trueLabelsDiv.innerHTML = "";
	});
	
	formElement.addEventListener("submit", function(e){
		e.preventDefault(); 
		
		setLoading(true);
		const formData = new FormData(formElement);		
		const req = formData.get('requirementText');
		const doc = formData.get('documentTitle');
		const sections = formData.get('sectionTitles');
		const reqId= formData.get('reqId');
		
		let trueLabels = [];
		let classifiedLabels = [];
		classifyRequirement({req, doc, sections})
			.then(result => {
				setLoading(false);
				let methods =  Object.keys(result);
				let htmlBuilder = "<h4>Recommender classification results</h4>";
				htmlBuilder += "<ol class='list-group list-group-numbered'>";
				methods.forEach((method,key) => {
					classifiedLabels = result[method];
					trueLabels = requirementsList.filter(e => e.reqId === reqId)[0].trueLabels;
					let correctLabels = findCorrectLabels(trueLabels,classifiedLabels);
					
					result[method].forEach(classification => {
						if(correctLabels.includes(classification)) {
							htmlBuilder += "<li class='list-group-item d-flex justify-content-between align-items-start bg-success bg-opacity-10'>";	
						}
						else{
							htmlBuilder += "<li class='list-group-item d-flex justify-content-between align-items-start'>";	
						}
						
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

				//prepare true labels list
				let reqObject = requirementsList.filter(e => e.reqId === reqId)[0];
			    htmlBuilder = "<h4>True labels (by experts)</h4>";
				htmlBuilder += "<ol class='list-group list-group-numbered'>";
				reqObject.trueLabels.forEach(trueLabel => {
							htmlBuilder += "<li class='list-group-item d-flex justify-content-between align-items-start'>";
							htmlBuilder += "<div class='ms-2 me-auto'>";
							htmlBuilder += "<div class='fw-italic'>" + trueLabel + "</div>";
							htmlBuilder += "</div>";
							htmlBuilder += "</li>"	
						});
	            htmlBuilder += "</ol>";	
				trueLabelsDiv.innerHTML = htmlBuilder;
				
				messageDiv.classList.remove("hidden");
			})
			.catch(() => {

				setLoading(false);
				resultsDiv.innerHTML = "Error";
				trueLabelsDiv.innerHTML = "";
				
			});
	});
	
	formElement.addEventListener("reset", function(e){
		messageDiv.classList.add("hidden");
		resultsDiv.innerHTML = "";
		trueLabelsDiv.innerHTML = "";
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

function findCorrectLabels(trueLabels, classifiedLabels) {
	let trueCodes = trueLabels.map(e => e.split('-')[0]);
	return classifiedLabels.filter(e => trueCodes.includes(e.label.split('-')[0]));
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