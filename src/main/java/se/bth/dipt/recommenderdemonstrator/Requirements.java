package se.bth.dipt.recommenderdemonstrator;

import java.util.List;
import java.util.stream.Collectors;

import edu.illinois.cs.cogcomp.classification.hierarchy.dataprocess.sb11.SB11TopicHierarchy;
import edu.illinois.cs.cogcomp.classification.hierarchy.run.ml.sb11.SB11ExperimentConfig;
import edu.illinois.cs.cogcomp.classification.hierarchy.run.preparedata.sb11.DataParser;
import se.bth.serl.flatclassifier.utils.NLP.Language;

public class Requirements {

	private static List<RequirementViewModel> allRequirements = null;
	private static SB11TopicHierarchy sb11 = new SB11TopicHierarchy("EN", SB11ExperimentConfig.sb11Taxonomy);
	
	public static List<RequirementViewModel> getRequirements () {
		if(allRequirements == null)
		{
	        DataParser p = new DataParser("data/sb11/raw/general_requirements_20220910.csv");
	        p.parse();
	        allRequirements = p.getRequirements()
	        		.stream()
	        		.map(e -> { 
	        			RequirementViewModel rvm = new RequirementViewModel(e, Language.EN);
	        			rvm.setTrueLabels(rvm
	        					.getTrueLabels()
	        					.stream()
	        					.map(t -> t + " - " + sb11.getLabelName(t))
	        					.collect(Collectors.toList()));
	        			return rvm;
	        		})
	        		.collect(Collectors.toList());
	        System.out.println(allRequirements.size() + " requirements loaded");
		}
		return allRequirements;
	}
}
