import React, { useEffect, useMemo, useRef, useState } from "react";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import "./UserType.css";
import { MessagePopUp } from "../../../../components/MessagePopUp/MessagePopUp";
import { useTranslation } from "react-i18next";

export function UserType({
  readonly = true,
  width = "160px",
  value,
  userType,
  onClickOption,
  user,
}) {
  const { t, i18n } = useTranslation();
  const [showTypes, setShowTypes] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [bgColor, setBgColor] = useState(user?.roleColor);
  const [showPopUp, setShowPopUp] = useState(false);
  const [element, setElement] = useState({});

  const types = useMemo(() => {
    if (userType && userType?.length) {
      return userType?.filter((type) => type?.name !== value);
    }

    return [];
  }, [userType, user]);

  const ref = useRef();

  const onAlertCancelClick = () => setShowPopUp(false);

  const onInputClick = () => setShowTypes(!showTypes);

  const onChangeSelect = () => {
    setShowPopUp(true);
  };

  const onAlertSubmitClick = () => {
    setShowPopUp(false);
    setInputValue(element?.name);
    setBgColor(element?.roleColor);
    return onClickOption(user, element);
  };

  useEffect(() => {
    setInputValue(value);
    setBgColor(user?.roleColor);
  }, [user, value]);

  useOutsideClick(ref, () => {
    setShowTypes(false);
  });

  return (
    <>
      <MessagePopUp
        onClosePopup={setShowPopUp}
        open={showPopUp}
        title={t("Change role")}
        text={i18n.language === "am"
         ? `Դուք համոզվա՞ծ եք, որ ցանկանում եք փոփոխել ${user?.fullName}-ի դերը։`
         : `Are you sure you want to change role for ${user?.fullName}`}
        styleText={{ textAlign: "left" }}
        popUpContainerStyles={{ top: "50%" }}
        closeBtnTitle={t("Cancel")}
        submitBtnTitle={t("EdIt")}
        onAlertCancelClick={onAlertCancelClick}
        onAlertSubmitClick={onAlertSubmitClick}
        styleSubmitBtn={{
          background: "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)",
          color: "#FFF",
        }}
      />

      <div className="selectedTypesBody" style={{ width: width }}>
        <input
          id={user?.id}
          className="selectedTypesInput"
          type="text"
          ref={ref}
          value={inputValue}
          onClick={onInputClick}
          readOnly={readonly}
          style={{
            cursor: userType?.length ? "pointer" : "context-menu",
            background:
              bgColor ?? "linear-gradient(74.09deg, #FBB86B 0%, #E38D2A 100%)",
          }}
        />
        {types && types.length ? (
          <span
            className="selectedTypesOpenedIcon"
            onClick={(e) => {
              e.stopPropagation();
              onInputClick();
            }}
          >
            <img
              src={require("../../../../img/caret.svg").default}
              style={{ rotate: showTypes && "180deg" }}
            />
          </span>
        ) : null}
        {showTypes && types && types.length ? (
          <ul className="selectedTypesContainer">
            {types?.map((el) => {
              return (
                <li
                  key={el.id}
                  value={el.id}
                  onClick={() => {
                    onChangeSelect(el);
                    setElement(el);
                  }}
                >
                  {el.name}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </>
  );
}
