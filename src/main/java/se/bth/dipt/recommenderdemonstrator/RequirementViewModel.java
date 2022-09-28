package se.bth.dipt.recommenderdemonstrator;

import java.util.List;
import java.util.stream.Collectors;

import edu.illinois.cs.cogcomp.classification.hierarchy.run.preparedata.sb11.Requirement;
import edu.illinois.cs.cogcomp.classification.hierarchy.run.preparedata.sb11.Annotation.ClassificationSystem;
import se.bth.serl.flatclassifier.utils.NLP;

public class RequirementViewModel {
	
	private String sampleId;
	private String documentId;
	private String documentTitle;
	private String reqId;
	private String sectionTitles;
	private String text;
	private String advice;
	private List<String> labels;
	
	public RequirementViewModel (Requirement req, NLP.Language lang) {		
			sampleId = req.getSampleId();
			documentId = req.getDocumentId();
			documentTitle = req.getDocumentTitle(lang);
			reqId = req.getReqId();
			sectionTitles = req.getSectionTitlesString(lang);
			text = req.getText(lang);
			advice = req.getAdvice(lang);
			labels = req.getLabels(ClassificationSystem.SB11, lang, "Byggdelar")
					.stream()
					.distinct()
					.collect(Collectors.toList());
	}

	public String getSampleId() {
		return sampleId;
	}

	public void setSampleId(String sampleId) {
		this.sampleId = sampleId;
	}

	public String getDocumentId() {
		return documentId;
	}

	public void setDocumentId(String documentId) {
		this.documentId = documentId;
	}

	public String getDocumentTitle() {
		return documentTitle;
	}

	public void setDocumentTitle(String documentTitle) {
		this.documentTitle = documentTitle;
	}

	public String getReqId() {
		return reqId;
	}

	public void setReqId(String reqId) {
		this.reqId = reqId;
	}

	public String getSectionTitles() {
		return sectionTitles;
	}

	public void setSectionTitles(String sectionTitles) {
		this.sectionTitles = sectionTitles;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getAdvice() {
		return advice;
	}

	public void setAdvice(String advice) {
		this.advice = advice;
	}

	public List<String> getTrueLabels() {
		return labels;
	}

	public void setTrueLabels(List<String> labels) {
		this.labels = labels;
	}
}
