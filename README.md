# D-CAT Demonstrator
This is a demonstrator for the hierarchical classification of requiremnets. The purpose of this demonstrator is to show how reqirements can be classified using a classification system.

## Instruments
   - CS: SB11
   - Table: byggdelar
   - Classified data: requirements

## Configuration

The following needs to be configured for the demonstrator to work.

   1. In `conf/configuration.properties` set the property `cogcomp.esa.simple.wikiIndex` to the directory of wikipedia index.
   2. Put the SB11 classification system in `data/sb11/raw`.
   3. Make sure that SB11 concepts tree file is set in `data/sb11/output/tree.sb11.simple.esa.concepts.newrefine.500.Byggdelar`. This file is generated from the classifier source code.

## How to run?
   1. Clone the code to your machine.
   2. Make sure that java is configured correctly.
   3. Open the source code with eclipse (or any IDE of your choice).
   4. Run `RecommenderDemonstratorApplication` as java applicaion.
   5. The server will run on `http://localhost:8080/`, then either:
      a. Navigate to `http://localhost:8080/labeld-data` to see the recommendations vs. the true labels
      b. Navigate to `http://localhost:8080/classifier` to classify your own requirement/text. At least one of the boxes needs to be filled for the classifier to work.