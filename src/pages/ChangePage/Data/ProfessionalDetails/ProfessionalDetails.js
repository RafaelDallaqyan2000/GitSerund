import "./ProfessionalDetails.css";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../../store";
import { fetchSubjectsAndClasses } from "../../../../store/changePage/actions";
import { Switch } from "../../../../components/Switch";
import { useForceRender } from "../../../../hooks/useForceRender";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ProfessionalDetails({
  userData,
  fetchSubjectsAndClasses,
  subjectsAndClasses,
  formOnChange,
  user,
  subjectIdList,
  setEditInfo = () => {},
}) {
  const { t, i18n } = useTranslation();
  const forceRender = useForceRender();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjectsAndClasses(i18n.language);
    if (
      pathname === "/Profile/professionalDetails" &&
      !userData?.showSubjects
    ) {
      navigate("/Profile/personalDetails");
    }
  }, [i18n.language]);

  useEffect(() => {
    if (user && user.userId) {
      formOnChange("subjectIds", user.subjectIds || []);
    }
  }, [user]);

  const handleSwitchClick = useCallback(
    (item) => {
      const index = subjectIdList.findIndex((i) => i.id === item.id);
      if (index === -1) {
        const newItem = { id: item.id, name: item.name };
        newItem.subArray = [...item.subArray];
        subjectIdList.push(newItem);
      } else {
        subjectIdList.splice(index, 1);
      }
      formOnChange("subjectIds", subjectIdList);
      setEditInfo(true);
      forceRender();
    },
    [subjectIdList]
  );

  return (
    <>
      <div>
        {subjectsAndClasses && subjectsAndClasses.length ? (
          <>
            <h3 className="prof_details_label">{t("Subject(s)")}</h3>
            {subjectsAndClasses
              .filter((e) => !e.isOther)
              .map((item) => (
                <Switch
                  key={item.id}
                  text={item.name}
                  onSwitchClick={handleSwitchClick}
                  item={item}
                  isOn={subjectIdList.find(
                    (subjectClass) => subjectClass.id === item.id
                  )}
                />
              ))}
          </>
        ) : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    subjectsAndClasses: state.changePageReducer.subjectsAndClasses,
    subjectIdList: state.formReducer.subjectIds,
    user: state.authReducer.user,
    userData: state.formReducer.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSubjectsAndClasses: (language) =>
      dispatch(fetchSubjectsAndClasses(language)),
    formOnChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalDetails);
