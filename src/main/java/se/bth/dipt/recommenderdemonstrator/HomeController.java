package se.bth.dipt.recommenderdemonstrator;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import edu.illinois.cs.cogcomp.classification.hierarchy.datastructure.LabelKeyValuePair;
import edu.illinois.cs.cogcomp.classification.hierarchy.run.ml.sb11.Demonstrator;

@Controller
public class HomeController {

	@GetMapping("/labeled-data")
	public String getLabeledData(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", name);
		model.addAttribute("data", Requirements.getRequirements());
		return "labeled-data";
	}
	
	@PostMapping("/labeled-data")
	public ResponseEntity<HashMap<String, List<LabelKeyValuePair>>> postLabeledData(
			@RequestParam(name="requirement", required=true) String requirement, 
			@RequestParam(name="documentTitle", required=true) String documenTitle,
			@RequestParam(name="sectionsTitle", required=true) String sectionsTitle,
			Model model) {
		HashMap<String, List<LabelKeyValuePair>> results = Demonstrator.classifyReq(requirement, 
				documenTitle, sectionsTitle, "Byggdelar", 5);
		return ResponseEntity.ok(results);
	}
	
	@GetMapping("/classifier")
	public String getClassifier(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", name);
		model.addAttribute("data", Requirements.getRequirements());
		return "classifier";
	}
	
	@PostMapping("/classifier")
	public ResponseEntity<HashMap<String, List<LabelKeyValuePair>>> postClassifier(
			@RequestParam(name="requirement", required=true) String requirement, 
			@RequestParam(name="documentTitle", required=true) String documenTitle,
			@RequestParam(name="sectionsTitle", required=true) String sectionsTitle,
			Model model) {
		HashMap<String, List<LabelKeyValuePair>> results = Demonstrator.classifyReq(requirement, 
				documenTitle, sectionsTitle, "Byggdelar", 5);
		return ResponseEntity.ok(results);
	}

}