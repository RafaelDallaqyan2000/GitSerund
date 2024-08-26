import React, { useState, useEffect, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import Table from "../../../Home/RecentAdditions/Table/Table";
import "./RecentActions.css";
import Pagination from "../../../../components/Pagination/Pagination";
import { useQuery } from "../../../../hooks/useQuery";
import { fetchUserLessonPlans } from "../../../../store";
import { parseURLSearch } from "../../../../helpers/parseURLSearch";
import { useLocation, useNavigate } from "react-router-dom";
import { objectToQueryString } from "../../../../helpers/objectToQueryString";
import { LessonPlanCardList } from "../../../../components/LessonPlanCardList";
import { useParams } from "react-router";
import * as url from "url";
import { useTranslation } from "react-i18next";

function RecentActionsComponent({
  fetchUserLessonPlans,
  lsnPlanToggleCard,
  userLessonPlans,
  pageCount,
  userTypeId,
  user,
}) {
  const navigate = useNavigate();
  const query = useQuery();
  const location = useLocation();
  const [selectedId, setSelectedId] = useState(1);
  const { t } = useTranslation();
  let searchURL = parseURLSearch(location.search);
  let { page, filterType } = searchURL;

  const actions = useMemo(() => {
    return userTypeId === 6 || location.pathname.includes("/Profile")
      ? [
          { id: 1, name: t("Lesson Scenarios") },
          { id: 2, name: t("Liked") },
          { id: 3, name: t("Commented") },
          { id: 4, name: t("Drafts") },
        ]
      : [
          { id: 1, name: t("Lesson Scenarios") },
          { id: 2, name: t("Liked") },
          { id: 3, name: t("Commented") },
        ];
  }, [userTypeId]);

  let findAnotherUserId = location.pathname.split("/");
  let anotherUserId = findAnotherUserId[findAnotherUserId.length - 1];

  const fetchLessonPlans = useCallback(
    (text) => {
      let filterType = parseInt(query.get("filterType"));
      let page = parseInt(query.get("page"));

      fetchUserLessonPlans(
        filterType ? filterType : selectedId,
        page ? page : 1,
        5,
        "",
        anotherUserId ? +anotherUserId : user.userId,
        text
      );

      if (filterType) setSelectedId(filterType);
    },
    [query, selectedId, user]
  );

  const refetchLessonPlans = useCallback(() => {
    if (userLessonPlans.details.length === 1) {
      let page = parseInt(query.get("page"));
      query.set("page", page > 1 ? page - 1 : page);
    }
    fetchLessonPlans();
  }, [userLessonPlans]);

  useEffect(() => {
    fetchLessonPlans();
  }, [page, filterType]);

  const handleSelect = (id) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("filterType", id);
    urlParams.set("page", 1);
    navigate("?" + urlParams);
    setSelectedId(id);
  };

  return (
    <div className="recent-actions-container ">
      <div className="action-container">
        {actions.map((item, i) => (
          <div key={i} onClick={() => handleSelect(item.id)} className="action">
            <p
              className={
                selectedId === item.id
                  ? "action-selected-title"
                  : "action-title"
              }
            >
              {item.name}
            </p>
            <div
              className="underline-action-container"
              style={{ height: selectedId === item.id ? "3px" : "" }}
            />
          </div>
        ))}
      </div>
      <div className="table-container table-container-mobile">
        {lsnPlanToggleCard ? (
          <LessonPlanCardList list={userLessonPlans?.details} />
        ) : (
          <Table
            refetch={refetchLessonPlans}
            onColumnSelect={fetchLessonPlans}
            showProfileImage={false}
            tableDetails={userLessonPlans?.details}
          />
        )}
        <div className="pagination-mobile-display-none">
          <Pagination
            pageCount={
              userLessonPlans?.userLessonPlanDetails?.pageLessonPlansCount
                ? Math.ceil(
                    userLessonPlans?.userLessonPlanDetails
                      ?.pageLessonPlansCount / 5
                  )
                : 0
            }
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pageCount: state.lessonPlanReducer.pageCount,
    userLessonPlans: state.lessonPlanReducer.userLessonPlans,
    profileLsnRowCount: state.formReducer.profileLsnRowCount,
    userTypeId: state.authReducer.typeId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserLessonPlans: (
      filterType,
      page,
      pageCount,
      searchText,
      viewedUserId,
      orderColumn
    ) => {
      dispatch(
        fetchUserLessonPlans(
          filterType,
          page,
          pageCount,
          searchText,
          viewedUserId,
          orderColumn
        )
      );
    },
  };
};

export const RecentActions = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentActionsComponent);
