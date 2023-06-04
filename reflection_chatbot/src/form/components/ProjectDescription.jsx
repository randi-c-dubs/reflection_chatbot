import React, { useState } from "react";

import "./ProjectDescription.css";
import InputAndChat from "./InputBlockWithChat";

const ProjectDescription = () => {
  const [formStatus, setFormStatus] = useState("Saved");
  // project info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stakeholders, setStakeholders] = useState("");
  const [positiveImpacts, setPositiveImpacts] = useState("");
  const [negativeImpacts, setNegativeImpacts] = useState("");

  const onSave = (e) => {
    console.log(e);

    setFormStatus("Saving...");
    
    let projectInfo = {
      title: title,
      description: description,
      // TODO parse stakeholders into a list?
      stakeholders: stakeholders,
      // TODO parse impacts into lists?
      positiveImpacts: positiveImpacts,
      negativeImpacts: negativeImpacts,
    };
    console.log(projectInfo);

    setFormStatus("Saved");
  };

  const handleFormChange = (e) => {
    // TODO prevent closing page without saving
    // TODO save differences to storage
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
          onBlur={handleFormChange}
          onChange={setTitle}
        />
        <InputAndChat
          inputtype="textarea"
          label="Description"
          id="description"
          placeholderText="What does your project do?"
          onBlur={handleFormChange}
          onChange={(e) => {setDescription(e.target.value); handleFormChange();}}
        />
        <InputAndChat
          inputtype="textarea"
          label="Stakeholders"
          id="stakeholders"
          placeholderText="Which individuals, groups, or organizations might be impacted by your project?"
          onBlur={handleFormChange}
          onChange={setStakeholders}
        />
        <div className="description-block">
          <p className="mb-3 col-sm-12 project-sublabel">Potential Impacts</p>

          <div className="description-subblock col-lg-6">
            <InputAndChat
              inputtype="textarea"
              label="Positive"
              id="positiveImpacts"
              placeholderText="What are the potential benefits of your project?"
              onBlur={handleFormChange}
              onChange={setPositiveImpacts}
            />
          </div>
          <div className="description-subblock col-lg-6">
            <InputAndChat
              inputtype="textarea"
              label="Negative"
              id="negativeImpacts"
              placeholderText="What are the potentially harmful consequences of your project?"
              onBlur={handleFormChange}
              onChange={setNegativeImpacts}
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
