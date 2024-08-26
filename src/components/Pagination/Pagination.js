import React, { useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { handleFormChange } from "../../store";
import Arrow from "./components/Arrow";
import { connect } from "react-redux";

import "./Pagination.css";

function generateUrlParams(pageNameInURL, newPage) {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(pageNameInURL, newPage);
  return urlParams;
}

function Pagination({
  handleFormChange,
  currentPageVarName = 'currentPage',
  pageNameInURL = 'page',
  pageCount = 1,
  rowCount= 5,
}) {

  const pages = new Array(pageCount > 5 ? 5 : pageCount).fill();

  const page = window.location.pathname;
  let query = useQuery();
  let cp = query.get(pageNameInURL);
  let currentPage = cp ? parseInt(cp) : 1;
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(pageNameInURL, currentPage);
    navigate("?" + urlParams);

  }, []);

  useEffect(() => {

    if (currentPage - 1 === pageCount) {
      const urlParams = new URLSearchParams(window.location.search);

      //Todo: we can use this in the feature
      // query.set(pageNameInURL, pageCount);
      // urlParams.set(pageNameInURL, pageCount);

      navigate("?" + urlParams);
      handleFormChange(currentPageVarName, currentPage);
    }
  }, [pageCount]);

  useEffect(() => {
    handleFormChange(currentPageVarName, currentPage);
    handleFormChange(rowCount, 5);
  }, [currentPage]);

  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="pagination-container">
      <ul className="ul pagination mx-3 page-numbers">
        <Arrow
          containerClassName={`arrow-container ${
            1 === currentPage ? "cursor-initial" : ""
          }`}
          className={`arrow-left ${1 === currentPage ? "cursor-initial" : ""}`}
          fill={1 === currentPage ? "#C4C4C4" : "#8C8E92"}
          handleClick={() => {
            currentPage !== 1 &&
            navigate("?" + generateUrlParams(pageNameInURL, currentPage - 1));
          }}
        />
        {pageCount < 6 ? (
          pages.map((p, index) => (
            <li
              key={index}
              className={`${currentPage === index + 1 && "page-current"} styleInAllChild`}
            >
              <Link to={`${page}?${generateUrlParams(pageNameInURL, index + 1)}`}>
                {index + 1}
              </Link>
            </li>
          ))
        ) : currentPage > 2 ? (
          <>
            <li className={`styleInAllChild`}>
              <Link  to={`${page}?${generateUrlParams(pageNameInURL, 1)}`}>1</Link>
            </li>
            {currentPage !== 3 && (
              <li>
                <div className="three-dots"></div>
              </li>
            )}
            <li>
              <Link to={`${page}?${generateUrlParams(pageNameInURL, currentPage - 1)}`}>
                {currentPage - 1}
              </Link>
            </li>
            <li className="page-current">
              <Link to={`${page}?${generateUrlParams(pageNameInURL, currentPage)}`}>
                {currentPage}
              </Link>
            </li>
            {currentPage + 1 === pageCount ? (
              <li>
                <Link to={`${page}?${generateUrlParams(pageNameInURL, pageCount)}`}>
                  {pageCount}
                </Link>
              </li>
            ) : currentPage === pageCount ? (
              <></>
            ) : currentPage + 2 === pageCount ? (
              <>
                <li>
                  <Link to={`${page}?${generateUrlParams(pageNameInURL, currentPage + 1)}`}>
                    {currentPage + 1}
                  </Link>
                </li>
                <li>
                  <Link to={`${page}?${generateUrlParams(pageNameInURL, pageCount)}`}>
                    {pageCount}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={`${page}?${generateUrlParams(pageNameInURL, currentPage + 1)}`}>
                    {currentPage + 1}
                  </Link>
                </li>
                <li>
                  <div className="three-dots"></div>
                </li>
                <li>
                  <Link to={`${page}?${generateUrlParams(pageNameInURL, pageCount)}`}>
                    {pageCount}
                  </Link>
                </li>
              </>
            )}
          </>
        ) : (
          <>
            <li className={`${currentPage === 1 && "page-current"}`} >
              <Link to={`${page}?${generateUrlParams(pageNameInURL, 1)}`}>1</Link>
            </li>
            <li className={`${currentPage === 2 && "page-current"}`}>
              <Link to={`${page}?${generateUrlParams(pageNameInURL, 2)}`}>2</Link>
            </li>
            <li className={`${currentPage === 3 && "page-current"}`}>
              <Link to={`${page}?${generateUrlParams(pageNameInURL, 3)}`}>3</Link>
            </li>
            <li>
              <div className="three-dots"></div>
            </li>
            <li>
              <Link to={`${page}?${generateUrlParams(pageNameInURL, pageCount)}`}>
                {pageCount}
              </Link>
            </li>
          </>
        )}

        <Arrow
          className={`arrow-right  ${
            pageCount === currentPage || pageCount === 1 ? "cursor-initial" : ""
          }`}
          containerClassName={`arrow-container ${
            pageCount === currentPage || pageCount === 1 ? "cursor-initial" : ""
          }`}
          fill={pageCount === currentPage ? "#C4C4C4" : "#8C8E92"}
          handleClick={() => {
            currentPage !== pageCount &&
            navigate(`?${generateUrlParams(pageNameInURL, currentPage + 1)}`);
          }}
        />
      </ul>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, name) => dispatch(handleFormChange(key, name)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
