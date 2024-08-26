import React from "react";
import ReactDOM from "react-dom";
import Button from "../../../components/Button/Button";
import styles from "./PopUp.module.css";
import { connect } from "react-redux";
import { fetchUserMethod, fetchAddUserMethod } from "../../../store";
import { useTranslation } from "react-i18next";

const PopUpMethods = ({
  fetchUserMethod,
  open,
  children,
  setOpen,
  previousMethodId,
  lessonPlanId,
  selectedMethod1,
  previousOrder,
  callbackFunction = () => {},
}) => {
  const { t } = useTranslation();

  const handleClickBtn = () => {
    if (selectedMethod1) {
      return fetchAddUserMethod(
        lessonPlanId,
        previousMethodId,
        setOpen,
        fetchUserMethod,
        selectedMethod1,
        previousOrder,
        callbackFunction
      );
    }
  };
  const handleClosePopUp = () => {
    setOpen(false);
    callbackFunction();
  };

  return open
    ? ReactDOM.createPortal(
        <>
          <div onClick={handleClosePopUp} className={styles.OVERLY_STYLES} />
          <div className={styles.POPUP_STYLES}>
            <div className={styles.CLOSE_POPUP} onClick={handleClosePopUp}>
              <img
                width={25}
                src={
                  require("../../../img/delete-stop-svgrepo-com.svg").default
                }
              />
            </div>
            {children}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "50%",
                minWidth: "100px",
              }}
            >
              <Button
                title={t("Add")}
                onClick={handleClickBtn}
                className={`${
                  selectedMethod1
                    ? styles.CHANGE_LESSON_PROCESS_BTN
                    : styles.CHANGE_LESSON_PROCESS_DISABLE_BTN
                } ${styles.BUTTON}`}
              />
            </div>
          </div>
        </>,
        document.getElementById("portal")
      )
    : null;
};
const mapStateToProps = (state) => {
  return {
    lessonProcess: state.lessonProcessReducer.lessonProcess,
    methods: state.lessonPlanReducer.allMethods,
    userId: state.formReducer.userId,
    selectedMethod1: state.formReducer.selectedMethod1,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserMethod: (index) => dispatch(fetchUserMethod(index)),
  };
};

export const PopUp = connect(mapStateToProps, mapDispatchToProps)(PopUpMethods);
