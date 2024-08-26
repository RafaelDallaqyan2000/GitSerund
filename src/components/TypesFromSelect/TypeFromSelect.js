import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import store from "../../store";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import "./TypeFromSelect.css";
import { putSubjectsOnAdminPage } from "../../store/adminPage/actions/putSubjectsOnAdminPage";

export function TypeFromSelect({
  width = "160px",
  value,
  user,
  allSubjectsAndClass,
}) {
  const [showTypes, setShowTypes] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [checkedSubjects, setCheckedSubjects] = useState(value);

  const ref = useRef();

  useEffect(() => {
    setInputValue(value);
  }, [user, value]);

  const onInputClick = () => setShowTypes(!showTypes);

  const handleChange = useCallback(
    (file) => {
      let newCheckedSubjects = [];

      if (checkedSubjects.some((f) => f.name === file.name)) {
        newCheckedSubjects = checkedSubjects?.filter(
          (e) => e.name !== file.name
        );
      } else {
        newCheckedSubjects = [...checkedSubjects, file];
      }
      setCheckedSubjects(newCheckedSubjects);
      store.dispatch(putSubjectsOnAdminPage(user?.id, newCheckedSubjects));
    },
    [checkedSubjects]
  );

  useOutsideClick(ref, () => {
    setShowTypes(false);
  });

  return (
    <div
      className="selectedTypesBody"
      style={{ width: width, cursor: "pointer !important" }}
    >
      <input
        id={user?.id}
        className="selectedTypesInput selectedTypesInputFromUsersPage"
        type="text"
        ref={ref}
        value={inputValue[0].name}
        onClick={onInputClick}
        readOnly={true}
      />
      {value && value.length ? (
        <span
          className="selectedTypesOpenedIcon"
          onClick={(e) => {
            e.stopPropagation();
            onInputClick();
          }}
        >
          <img
            src={require("../../img/darkCuret.svg").default}
            style={{ rotate: showTypes && "180deg" }}
          />
        </span>
      ) : null}
      {showTypes && value && value.length ? (
        <div className="selectedContainer" onClick={(e) => e.stopPropagation()}>
          {allSubjectsAndClass?.map((el, i) => {
            return (
              <ul key={el.name + i} className="selectItemContainer">
                <input
                  type="checkbox"
                  id={el?.name + el?.id}
                  className="multiselect-checkbox-input"
                  onChange={() => handleChange(el)}
                  checked={checkedSubjects?.some((s) => s?.name === el?.name)}
                />
                <label
                  className="select-item-title multiselect-checkbox-label"
                  style={{ height: "initial", minHeight: 18 }}
                  htmlFor={el?.name + el?.id}
                >
                  <p className="select-text-about-subject" title={el?.name}>
                    {el?.name}
                  </p>
                </label>
              </ul>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
