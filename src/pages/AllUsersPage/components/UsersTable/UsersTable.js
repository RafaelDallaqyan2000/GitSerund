import "./UsersTable.css";
import { connect } from "react-redux";
import { putUserRoles } from "../../../../store/adminPage/actions/putUserRoles";
import { getUserRoles } from "../../../../store/adminPage/actions/getUserRoles";
import React, { useCallback, useEffect } from "react";
import { changeAdminPageProperty } from "../../../../store/adminPage/actions";
import { fetchSubjectsAndClasses } from "../../../../store/changePage/actions";
import { UserTableItem } from "./UserTableItem/UserTableItem";
import { useTranslation } from "react-i18next";

function UsersTable({
  users,
  allRoles,
  putUserRoles,
  changeAdminPageProperty,
  checkedUsers,
  page,
  fetchSubjectsAndClasses,
  subjectsAndClasses,
  searchValue,
}) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    changeAdminPageProperty("checkedUsers", []);
  }, [page]);

  useEffect(() => {
    fetchSubjectsAndClasses(i18n.language);
  }, [i18n.language]);

  const toggleAllFiles = useCallback(() => {
    if (users.length === checkedUsers.length) {
      changeAdminPageProperty("checkedUsers", []);
    } else {
      changeAdminPageProperty(
        "checkedUsers",
        users.map((e) => e.id)
      );
    }
  }, [checkedUsers, users]);

  return (
    <div>
      <div className="tableContainer">
        {users.length > 0 && (
          <table>
            {/*<tr>*/}
            <div className="check-all-users">
              <div className="checkbox">
                <input
                  id="hi95"
                  className="checkbox-custom"
                  name="copyLink"
                  type="checkbox"
                  checked={users.length === checkedUsers.length}
                  onChange={toggleAllFiles}
                />
                <label
                  htmlFor={"hi95"}
                  className="checkbox-custom-label"
                ></label>
              </div>
              <span>{t("Select all users")}</span>
            </div>
            {/*</tr>*/}
            <tr className="thead">
              <th></th>
              <th style={{ paddingLeft: "60px" }}>{t("NAME SURNAME")}</th>
              <th style={{ paddingLeft: "60px" }}>{t("EMAIL")}</th>
              <th style={{ paddingLeft: "60px" }}>{t("SUBJECT")}</th>
              <th style={{ textAlign: "center" }}>{t("ROLE")}</th>
            </tr>
            {users.map((el) => {
              return (
                <UserTableItem
                  allUsers={users}
                  key={el.id}
                  el={el}
                  changeAdminPageProperty={changeAdminPageProperty}
                  checkedUsers={checkedUsers}
                  putUserRoles={putUserRoles}
                  allRoles={allRoles}
                  subjectsAndClasses={subjectsAndClasses}
                  searchValue={searchValue}
                />
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allRoles: state.adminPageReducer.allRoles,
    checkedUsers: state.adminPageReducer.checkedUsers,
    subjectsAndClasses: state.changePageReducer.subjectsAndClasses,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    putUserRoles: (userId, roleId) => dispatch(putUserRoles(userId, roleId)),
    getUserRoles: (language) => dispatch(getUserRoles(language)),
    changeAdminPageProperty: (key, value) =>
      dispatch(changeAdminPageProperty(key, value)),
    fetchSubjectsAndClasses: (language) =>
      dispatch(fetchSubjectsAndClasses(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
