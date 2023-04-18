import React from "react";

import "./ProjectDescription.css";
import InputBlock from "./InputBlockWithButton";

const ProjectDescription = () => {
  const [formStatus, setFormStatus] = React.useState("Saved");
  const onSave = (e) => {
    console.log(e);

    setFormStatus("Saving...");

    // TODO fill out project info as other elements change
    /*
    let projectInfo = {
      title: e.target.title.value,
      description: e.target.description.value,
      // TODO parse stakeholders into a list
      stakeholders: e.target.stakeholders.value,
      // TODO parse impacts into lists
      positiveImpacts: e.target.positiveImpacts.value,
      negativeImpacts: e.target.negativeImpacts.value,
    };
    console.log(projectInfo);*/

    setFormStatus("Saved");
  };
  const onBlur = (e) => {};

  const onChange = (e) => {
    // TODO prevent closing page without saving
    setFormStatus("Save");
  };

  return (
    <div className="container-sm mt-5">
      <h3 className="mb-3">AI Project Plan</h3>
      <div className="project-description">
        <input
          className="project-description-edit inplace-input"
          placeholder="Project Title"
          id="title"
          onBlur={onBlur}
          onChange={onChange}
        />
        <InputBlock
          inputtype="textarea"
          label="Description"
          id="description"
          placeholderText="What does your project do? How do you imagine it being used?"
          onBlur={onBlur}
          onChange={onChange}
        />
        <InputBlock
          inputtype="textarea"
          label="Stakeholders"
          id="stakeholders"
          placeholderText="Which individuals, groups, or organizations might be impacted by your project?"
          onBlur={onBlur}
          onChange={onChange}
        />
        <div className="description-block">
          <p className="mb-3 col-sm-12 project-sublabel">Potential Impacts</p>

          <div className="description-subblock col-lg-6">
            <InputBlock
              inputtype="textarea"
              label="Positive"
              id="positiveImpacts"
              placeholderText="What are the potential benefits of your project?"
              onBlur={onBlur}
              onChange={onChange}
            />
          </div>
          <div className="description-subblock col-lg-6">
            <InputBlock
              inputtype="textarea"
              label="Negative"
              id="negativeImpacts"
              placeholderText="What are the potentially harmful consequences of your project?"
              onBlur={onBlur}
              onChange={onChange}
            />
          </div>
        </div>
        <button
          className="btn btn-primary btn-large"
          size="lg"
          disabled={formStatus !== "Save"}
          inputtype="submit"
          onClick={onSave}
        >
          {formStatus}
        </button>
      </div>
    </div>
  );
};
export default ProjectDescription;
