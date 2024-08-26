import React from "react";
import "./LeftSidebarSubjectItem.css";
import defaultImage from "../../../../img/defaultProfile.png";

export function LeftSidebarSubjectItem(props) {
  const { subject, onClick, isActive } = props;

  return (
    <div
      onClick={() => onClick(subject.id)}
      className={`left_sidebar_subject ${isActive ? "active_subject" : ""}`}
      style={{
        background: `linear-gradient(${subject.gradientColor})`,
      }}
    >
      <img
        src={subject.icon}
        className="left_sidebar_subject_icon"
        alt="Subject"
        onError={(e) => {
          e.target.error = null;
          e.target.src = defaultImage;
        }}
      />
      <p className="left_sidebar_subject_name">{subject.name}</p>
    </div>
  );
}
