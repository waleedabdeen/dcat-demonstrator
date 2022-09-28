package se.bth.dipt.recommenderdemonstrator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RecommenderDemonstratorApplication {

	public static void main(String[] args) {
		System.out.println("loading requirements");
		Requirements.getRequirements();
		SpringApplication.run(RecommenderDemonstratorApplication.class, args);
	}

}
