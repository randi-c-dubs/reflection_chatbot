const Contexts = {
      Start: Symbol("start"),
      RequestApiKey: Symbol("request api key"),

      HelpStart: Symbol("get help"),

      FeedbackStart: Symbol("get feedback"),
      FeedbackStakeholders: Symbol("stakeholders"),
      FeedbackHarms: Symbol("harms"),
      FeedbackBenefits: Symbol("benefits"),
      FeedbackFeatures: Symbol("fearures"),

      DesignStart: Symbol("add to design journal"),
      DesignProblemDef: Symbol("problem defintion"),
      DesignAlgorithmDesign: Symbol("algorithm design"),
      DesignDeployment: Symbol("project deployment"),
}

export default Contexts;