import React, { useState } from "react";

import KnowledgeBase from "../../chatbot/resources/KnowledgeBase";

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
          onChange={(e) => {
            setTitle(e.target.value);
            handleFormChange();
          }}
        />
        <InputAndChat
          inputType="textarea"
          label="Description"
          id="description"
          placeholderText={ KnowledgeBase[`description`].inputPlaceHolder }
          onChange={(e) => {
            setDescription(e.target.value);
            handleFormChange();
          }}
        />
        <InputAndChat
          inputType="textarea"
          label="Stakeholders"
          id="stakeholders"
          placeholderText={ KnowledgeBase[`stakeholders`].inputPlaceHolder }
          onChange={(e) => {
            setStakeholders(e.target.value);
            handleFormChange();
          }}
        />
        <div className="description-block">
          <p className="mb-3 col-sm-12 project-sublabel">Potential Impacts</p>

          <div className="description-subblock col-lg-6">
            <InputAndChat
              inputType="textarea"
              label="Positive"
              id="positiveImpacts"
              placeholderText={ KnowledgeBase[`positiveImpacts`].inputPlaceHolder }
              onChange={(e) => {
                setPositiveImpacts(e.target.value);
                handleFormChange();
              }}
            />
          </div>
          <div className="description-subblock col-lg-6">
            <InputAndChat
              inputType="textarea"
              label="Negative"
              id="negativeImpacts"
              placeholderText={ KnowledgeBase[`negativeImpacts`].inputPlaceHolder }
              onChange={(e) => {
                setNegativeImpacts(e.target.value);
                handleFormChange();
              }}
            />
          </div>
        </div>
        <button
          className="btn btn-primary btn-large"
          size="lg"
          disabled={formStatus !== "Save"}
          type="submit"
          onClick={onSave}
        >
          {formStatus}
        </button>
      </div>
    </div>
  );
};
export default ProjectDescription;
