import React, { useCallback, useEffect } from "react";
import {
  fetchMethods,
  handleShortDescription,
  changeLessonDescription,
  handleFormChange,
} from "../../../../store";
import { connect, useDispatch } from "react-redux";
import SelectWithSearch from "../../../../components/Form/SelectWithSearch";
import "./SelectedMethods.css";
import { SelectWithSearchHOC } from "../../../../components/SelectWithSearchHOC";

function SelectedMethodsComponent({
  t,
  methods,
  fetchMethods,
  selectedMethod1Name,
  selectedMethod2Name,
  selectedMethod3Name,
  selectedMethod1,
  selectedMethod2,
  selectedMethod3,
  methodError,
  handleFormChange,
  onChangeError,
  fieldId,
}) {
  const dispatch = useDispatch();

  const handleChangeMethod = useCallback((fieldId, fieldName, id, name) => {
    handleFormChange(fieldId, id);
    handleFormChange(fieldName, name);
  }, []);

  useEffect(() => {
    fetchMethods();
  }, []);

  useEffect(() => {
    if (selectedMethod1 > 0 || selectedMethod2 > 0 || selectedMethod3 > 0) {
      dispatch(
        handleShortDescription({
          index: 8,
          id: "selectedMethods",
          text: selectedMethod1,
        })
      );
      onChangeError((prevState) => {
        return {
          ...prevState,
          [fieldId]: methodError ? "" : methodError,
        };
      });
      return;
    }
    handleFormChange("selectedMethod", 0);
  }, [selectedMethod1, selectedMethod2, selectedMethod3]);

  return (
    <>
      <div className="title_container">
        <p className="title">{t("Selected methods / techniques")}</p>
        {!!methodError && <p className="required_text">{methodError}</p>}
      </div>
      <div className="selected_method_container">
        <SelectWithSearchHOC
          readOnly={true}
          optionLabelKey="name"
          optionUniqueKey="id"
          options={methods}
          loading={false}
          placeholder={t("Method/Technique 1")}
          inputValue={selectedMethod1Name}
          readOnlyStyle={{ top: "50px" }}
          onFocus={(e) => {
            e.target.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
          onOptionClick={(method) => {
            handleChangeMethod(
              "selectedMethod1",
              "selectedMethod1Name",
              method.id,
              method.name
            );
          }}
        />
        <SelectWithSearchHOC
          readOnly={true}
          optionLabelKey="name"
          optionUniqueKey="id"
          options={methods}
          loading={false}
          placeholder={t("Method/Technique 2")}
          inputValue={selectedMethod2Name}
          readOnlyStyle={{ top: "50px" }}
          onFocus={(e) => {
            e.target.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
          onOptionClick={(method) => {
            handleChangeMethod(
              "selectedMethod2",
              "selectedMethod2Name",
              method.id,
              method.name
            );
          }}
        />
        <SelectWithSearchHOC
          readOnly={true}
          optionLabelKey="name"
          optionUniqueKey="id"
          options={methods}
          loading={false}
          placeholder={t("Method/Technique 3")}
          inputValue={selectedMethod3Name}
          readOnlyStyle={{ top: "50px" }}
          onFocus={(e) => {
            e.target.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
          onOptionClick={(method) => {
            handleChangeMethod(
              "selectedMethod3",
              "selectedMethod3Name",
              method.id,
              method.name
            );
          }}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    methods: state.lessonPlanReducer.allMethods,
    selectedMethod1: state.formReducer.selectedMethod1,
    selectedMethod1Name: state.formReducer.selectedMethod1Name,
    selectedMethod2: state.formReducer.selectedMethod2,
    selectedMethod2Name: state.formReducer.selectedMethod2Name,
    selectedMethod3: state.formReducer.selectedMethod3,
    selectedMethod3Name: state.formReducer.selectedMethod3Name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMethods: () => dispatch(fetchMethods()),
    changeLessonDescription: (array) =>
      dispatch(changeLessonDescription(array)),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};
export const SelectedMethods = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedMethodsComponent);
