import { TypeFromSelect } from "../../../../../components/TypesFromSelect/TypeFromSelect";
import { UserType } from "../../UserType/UserType";
import optionImage from "../../../../../img/options.svg";
import deleteIcon from "../../../../../img/delete_medium.svg";
import React, { useCallback, useRef, useState } from "react";
import { useOutsideClick } from "../../../../../hooks/useOutsideClick";
import { connect } from "react-redux";
import {
  deleteUsers,
  getFilterArrAdminPage,
} from "../../../../../store/adminPage/actions";
import { useQuery } from "../../../../../hooks/useQuery";
import { MessagePopUp } from "../../../../../components/MessagePopUp/MessagePopUp";
import { useTranslation } from "react-i18next";

function AllUserTableItem({
  // allUsers = [],
  el = {},
  checkedUsers,
  changeAdminPageProperty,
  putUserRoles,
  allRoles,
  subjectsAndClasses,
  deleteUsers,
  deletedUserId,
  getFilterArrAdminPage,
  searchValue,
  filterTheSubjectInAdminPage,
  roleFilterInAdminPage,
  classItemInAdminPage,
}) {
  const { t, i18n } = useTranslation();
  const [openDeletePopUpWithId, setOpenDeletePopUpWithId] = useState(null);
  const [popupDetails, setPopupDetails] = useState({});
  const ref = useRef();
  const query = useQuery();
  let page = query.get("page") ?? 1;

  const handleChange = useCallback(
    (user) => {
      if (checkedUsers.some((f) => f === user.id)) {
        changeAdminPageProperty(
          "checkedUsers",
          checkedUsers?.filter((e) => e !== user.id)
        );
      } else {
        changeAdminPageProperty("checkedUsers", [...checkedUsers, user.id]);
      }
    },
    [checkedUsers, el]
  );

  const handleClickOption = (user, role) => {
    return putUserRoles(user?.id, role?.id);
  };

  const handleOpenDeletePopUp = (id) => {
    if (openDeletePopUpWithId !== id) {
      setOpenDeletePopUpWithId(id);
    } else {
      setOpenDeletePopUpWithId(null);
    }
  };

  const handleDeleteCallback = (data) => {
    if (data.success) {
      return getFilterArrAdminPage(
        i18n.language,
        roleFilterInAdminPage?.id,
        filterTheSubjectInAdminPage?.id,
        classItemInAdminPage?.id,
        +page,
        searchValue
      );
    }

    setPopupDetails({
      title: (
        <span style={{ color: "#000000" }}>
          {t("The operation")}
          <span style={{ color: "#ea6670" }}> {t("failed")}</span>
        </span>
      ),
      text: data.message,
    });
  };

  const handleDeleteClick = (userId) => {
    setOpenDeletePopUpWithId(null);
    return deleteUsers(userId, handleDeleteCallback);
  };

  const handleClosePopup = () => {
    setPopupDetails({});
  };

  useOutsideClick(ref, () => {
    setOpenDeletePopUpWithId(null);
  });

  return (
    <>
      <MessagePopUp
        onClosePopup={handleClosePopup}
        open={!!popupDetails?.text}
        title={popupDetails?.title}
        text={popupDetails?.text}
        onAlertCancelClick={handleClosePopup}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
        styleTitle={{
          color: popupDetails?.type === "success" ? "#1C1C1C" : "#EA6670",
        }}
        closeBtnTitle={t("Close")}
        styleCancelBtn={{
          padding: "11px 33px 10px",
          background: "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)",
          color: "#FFF",
        }}
      />

      <tr className="tr">
        <td className="users-checkbox" style={{ backgroundColor: "#f7f8fc" }}>
          <div className="checkbox">
            <input
              id={el?.id}
              className="checkbox-custom"
              name="copyLink"
              type="checkbox"
              checked={checkedUsers.some((f) => f === el.id)}
              onChange={() => handleChange(el)}
            />
            <label htmlFor={el?.id} className="checkbox-custom-label"></label>
          </div>
        </td>
        <td className="td firstTd">
          <div style={{ display: "flex", alignItems: "center" }}>
            {el?.imageName &&
            el?.imageName !== "null" &&
            el?.imageName !== "undefined" ? (
              <div style={{ width: 29, height: 29 }}>
                <img src={"/files/" + el.id + "/" + el?.imageName} />
              </div>
            ) : (
              <div style={{ width: 29, height: 29 }}>
                <img src={require("../../../../../img/people.svg").default} />
              </div>
            )}
            <span> {el?.fullName} </span>
          </div>
        </td>
        <td className="td secondTd">{el?.email}</td>
        <td className="td secondTd">
          <TypeFromSelect
            user={el}
            value={el?.subjects}
            onClickOption={handleClickOption}
            allSubjectsAndClass={subjectsAndClasses}
          />
        </td>
        <td className="td secondTd">
          <UserType
            user={el}
            userType={allRoles}
            value={el?.userType[0]}
            onClickOption={handleClickOption}
          />
        </td>
        <td className="td lastTd" ref={ref}>
          <div
            className="lastTdImageContainer"
            onClick={() => handleOpenDeletePopUp(el.id)}
            style={{
              backgroundColor:
                openDeletePopUpWithId === el.id ? "#8C8E9224" : "",
            }}
          >
            <img src={optionImage} />
          </div>
          {openDeletePopUpWithId === el.id ? (
            <div
              className="lastTdOptionContainer"
              onClick={() => handleDeleteClick(el.id)}
            >
              <div className="lsn_plan_card_options_item">
                <img
                  src={deleteIcon}
                  alt="Delete"
                  className="lsn_plan_card_options_icon"
                />
                <p className="lsn_plan_card_options_text lsn_plan_card_options_text_red">
                  {t("Delete")}
                </p>
              </div>
            </div>
          ) : null}
        </td>
      </tr>
      <tr style={{ height: "8px" }}></tr>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    deletedUserId: state.adminPageReducer.deletedUserId,
    classItemInAdminPage: state.adminPageReducer.classItemInAdminPage,
    roleFilterInAdminPage: state.adminPageReducer.roleFilterInAdminPage,
    filterTheSubjectInAdminPage:
      state.adminPageReducer.filterTheSubjectInAdminPage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteUsers: (userId, callback) => dispatch(deleteUsers(userId, callback)),
    getFilterArrAdminPage: (
      language,
      userTypeId,
      subjectId,
      classId,
      page,
      searchText,
      pageCount
    ) =>
      dispatch(
        getFilterArrAdminPage(
          language,
          userTypeId,
          subjectId,
          classId,
          page,
          searchText,
          pageCount
        )
      ),
  };
};

export const UserTableItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllUserTableItem);
