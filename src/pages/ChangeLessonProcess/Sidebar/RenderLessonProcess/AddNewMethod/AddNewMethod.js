import React from "react";

export function AddNewMethod({ onAdd, t = () => {} }) {
  return (
    <div onClick={onAdd} className="added_newMethod">
      <span>{t("Add method/technique")}</span>
      <img src={require("../../../../../img/plusIcon.svg").default} />
    </div>
  );
}
