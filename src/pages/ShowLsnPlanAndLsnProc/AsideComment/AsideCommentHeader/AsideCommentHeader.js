import React, { useCallback, useRef, useState } from "react";
import search from "../../../../img/search-grey.svg";
import filter from "../../../../img/filter-black.svg";
import "./Header.css";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import downArrow from "../../../../img/down-arrow.svg";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

function AsideCommentHeader(props) {
  const {
    searchText,
    onInputChange,
    onSubmit,
    commentTypes,
    onClickFilter,
    filters,
  } = props;
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const filterRef = useRef(null);

  const handleOpenCloseFilters = useCallback(
    (e) => {
      e.stopPropagation();
      setShowFilters(!showFilters);
    },
    [showFilters]
  );

  const handleOpenCloseTypes = useCallback((e) => {
    e.stopPropagation();
    setShowTypes((prevState) => !prevState);
  }, []);

  const handleClickContainer = useCallback((e) => {
    e.stopPropagation();
    setShowFilters((prevState) => !prevState);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (onSubmit) onSubmit(searchText);
    },
    [searchText]
  );

  useOutsideClick(filterRef, handleOpenCloseFilters);

  return (
    <div className="aside_comment_header">
      <form className="aside_comment_form" onSubmit={handleSubmit}>
        <button className="aside_comment_btn">
          <img src={search} alt="Search" className="aside_comment_btn_icon" />
        </button>
        <input
          type="text"
          className="aside_comment_input"
          placeholder={t("search")}
          value={searchText}
          onChange={onInputChange}
        />
      </form>
      <div className="aside_comment_filter" onClick={handleOpenCloseFilters}>
        <img src={filter} alt="Filter" className="aside_comment_filter_icon" />
        {showFilters ? (
          <div
            className="aside_comment_filter_container"
            ref={filterRef}
            onClick={handleClickContainer}
          >
            <div className="aside_comment_filter_inner">
              <button
                className={classNames("aside_comment_filter_item", {
                  active_item: filters.unread,
                })}
                onClick={() => onClickFilter("unread")}
              >
                {t("Unseen")}
              </button>
              <button
                className={classNames("aside_comment_filter_item", {
                  active_item: filters.resolved,
                })}
                onClick={() => onClickFilter("resolved")}
              >
                {t("Solved")}
              </button>
              <button
                className={classNames("aside_comment_filter_item", {
                  active_item: filters.type_Id !== null,
                })}
                onClick={handleOpenCloseTypes}
              >
                {t("By comment type")}
                <img
                  src={downArrow}
                  alt="Down"
                  className="aside_comment_filter_item_icon"
                />
              </button>
              {showTypes && commentTypes && commentTypes.length && (
                <ul
                  className="aside_comment_types"
                  onClick={handleOpenCloseTypes}
                >
                  {commentTypes.map((type) => (
                    <li
                      className={classNames("aside_comment_types_item", {
                        active_item: filters.type_Id === type.id,
                      })}
                      key={type.id}
                      onClick={() => onClickFilter("type_Id", type.id)}
                    >
                      {type.typename}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AsideCommentHeader;
