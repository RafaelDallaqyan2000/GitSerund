import "./Header.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import request from "../../../store/request";
import { Link, useNavigate, useParams } from "react-router-dom";
import whiteHeart from "../../../img/whiteHeart.svg";
import heart from "../../../img/heart1.svg";
import point from "../../../img/point.svg";
import printer from "../../../img/printer.svg";
import paperclip from "../../../img/paperclip.svg";
import comment from "../../../img/comment-white.svg";
import share from "../../../img/showLsnPlanAndLsnProcess/share.svg";
import checkIcon from "../../../img/showLsnPlanAndLsnProcess/checkIcon.svg";
import { PrintFile } from "./Components/PrintFile/PrintFile";
import { AllLinksOnPdfPage } from "./Components/AllLinksOnLsnPlanAndLsnProc/AllLinksOnLsnPlanAndLsnProc";
import { CircularLoading, Loading } from "../../../components";
import { getFileForPrint, getPageForPrint } from "../../../store";
import idIcon from "../../../img/number-symbol-icon.svg";
import toggleIcon from "../../../img/menuToggle.svg";
import classNames from "classnames";
import whiteLogo from "../../../img/Logo_gray.svg";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useTranslation } from "react-i18next";

const languageAm = localStorage.getItem("language") === "am";
const lsnPlanAndLsnProsWord = [
  {
    name: languageAm ? "Դասապլան" : "Lesson plan",
    id: "lsnPlan_1",
    active: true,
    currentHash: "lsnPlan",
  },
  {
    name: languageAm ? "Դասի սցենար" : "Lesson scenario",
    id: "lsnProc_1",
    active: false,
    currentHash: "lsnProc",
  },
];

function Header({
  like,
  setIsLike,
  userId,
  onOpenCloseAsideComments,
  hasComment,
  getFileForPrint,
  lessonPlanDetails,
}) {
  const { t } = useTranslation();
  const { preview, procId } = useParams();
  const navigate = useNavigate();
  const [openPrint, setOpenPrint] = useState(false);
  const [openAllLinks, setOpenAllLinks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingShareIcon, setLoadingShareIcon] = useState(false);
  const [checkedShare, setCheckedShare] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [showCopyLinkBtn, setShowCopyLinkBtn] = useState(false);
  const [showIcons, setShowIcons] = useState(
    lessonPlanDetails?.showIcons ?? true
  );
  const menuRef = useRef();
  const [hash, setHash] = useState(`#${lsnPlanAndLsnProsWord[0].id}`);

  useEffect(() => {
    setShowIcons(lessonPlanDetails?.showIcons ?? true);
  }, [lessonPlanDetails?.showIcons]);

  const handleClickOpenCloseAsideComments = useCallback(
    (e) => {
      if (isOpenMenu) setIsOpenMenu(false);

      onOpenCloseAsideComments(e);
    },
    [isOpenMenu]
  );

  const handleClickPagePrint = useCallback(
    (e) => {
      e.stopPropagation();

      let lsnPlanHeaderWordById = document.getElementById(
        "lsnPlanAndProcChecked"
      );
      lsnPlanHeaderWordById.style.display = "none";
      setTimeout(() => {
        window.print();
        lsnPlanHeaderWordById.style.display = "flex";
      }, 200);

      //Todo: print functionality, variant 2 from backand
      // if(!loading) getPageForPrint(procId, setLoading)
    },
    [loading]
  );

  const handleClickFilePrint = useCallback(
    (e, file, signal) => {
      e.stopPropagation();
      if (!loading) getFileForPrint(file?.fileUrl, setLoading, signal);
    },
    [loading]
  );

  const toggleFavourite = useCallback(() => {
    return request("/api/lessonPlan/toggleFavourite", "POST", {
      userId,
      lessonPlanId: +procId,
    })
      .then(() => setIsLike(!like))
      .catch((error) => error);
  }, [like, procId, userId]);

  const handleOpenPrint = () => {
    setOpenPrint(true);
  };

  const handleCloseMenu = useCallback(() => {
    if (window.innerWidth <= 1120) {
      setIsOpenMenu(false);
    }
  }, [isOpenMenu]);

  const handleShareClick = (e) => {
    e.stopPropagation();
    if (checkedShare) {
      return;
    }

    setLoadingShareIcon(true);

    setTimeout(() => {
      setLoadingShareIcon(false);
      setCheckedShare(true);
      setShowCopyLinkBtn(true);
    }, 500);

    setTimeout(() => {
      setCheckedShare(false);
      setShowCopyLinkBtn(false);
    }, 7000);

    navigator?.clipboard?.writeText(window.location.href);
  };

  const handleScrollClick = (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();

    const section = document.getElementById(itemId);
    const yOffset = window.innerWidth <= 1120 ? -100 : -150;
    const y =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ behavior: "smooth", top: y });

    setHash(`#${itemId}`);
  };

  const navigateMainPage = () => {
    navigate("/home");
  };

  useOutsideClick(menuRef, handleCloseMenu);

  return (
    <div style={{ position: "sticky", top: -1, zIndex: 10 }}>
      <div className="header-lsn-plan-and-proc">
        <div className="show-lesson-plan-header-author-data">
          {preview !== "preview" && (
            <Link to="/home" title={t("Main page")}>
              <div className="backImageInHeader">
                <img
                  width={31}
                  height={33}
                  src={require("../../../img/home2.svg").default}
                />
              </div>
            </Link>
          )}
          <p className="show-lesson-plan-header-text">{t("Lesson plan")}</p>
          <div className="lesson_plan_id">
            <figure className="lesson_plan_id_figure">
              <img src={idIcon} alt="ID" className="lesson_plan_id_icon" />
            </figure>
            <p className="lesson_plan_id_number">{procId}</p>
          </div>
        </div>

        <div style={{ display: "flex" }} ref={menuRef}>
          <button
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            style={{ background: "transparent" }}
          >
            <img
              alt="Toggle"
              src={toggleIcon}
              className={classNames(
                "show-lesson-plan-menu-toggle-icon",
                "show-lesson-plan-menu-toggle",
                { open_toggle: isOpenMenu }
              )}
            />
          </button>
          {preview !== "preview" && (
            <div
              className="show-lesson-plan-header-actions-container"
              style={{
                position: "relative",
                display:
                  window.innerWidth <= 1120
                    ? isOpenMenu
                      ? "flex"
                      : "none"
                    : "flex",
              }}
            >
              {window.innerWidth <= 1120 ? (
                <div
                  className="show-lesson-plan-icon-container"
                  onClick={navigateMainPage}
                >
                  <div
                    className="show-lesson-plan-icon-background"
                    title={t("Like")}
                  >
                    <img
                      width={20}
                      src={require("../../../img/home2.svg").default}
                    />
                  </div>
                  <p className="show-lesson-plan-icon-label">{t("Main")}</p>
                </div>
              ) : null}
              <div
                className="show-lesson-plan-icon-container"
                onClick={toggleFavourite}
              >
                <div
                  className="show-lesson-plan-icon-background"
                  title={t("Like")}
                >
                  <img src={!!like ? whiteHeart : heart} />
                </div>
                <p className="show-lesson-plan-icon-label">{t("Like")}</p>
              </div>

              <div
                className="show-lesson-plan-icon-container if-mobile-display-none"
                onClick={handleClickOpenCloseAsideComments}
              >
                <div
                  className="show-lesson-plan-icon-background"
                  title={t("See comments")}
                >
                  <img src={comment} />
                  {hasComment ? (
                    <div className="show-lesson-plan-header-actions-item-dot" />
                  ) : null}
                </div>
                <p className="show-lesson-plan-icon-label">
                  {t("See comments")}
                </p>
              </div>

              <img
                className="show-lesson-plan-header-actions-item"
                src={point}
              />

              {showIcons ? (
                <>
                  <div
                    className="show-lesson-plan-icon-container"
                    onClick={handleShareClick}
                  >
                    <div
                      onClick={handleShareClick}
                      className="show-lesson-plan-icon-background"
                      title={t("Share a lesson plan")}
                      style={{
                        background:
                          checkedShare &&
                          "linear-gradient(90deg, rgba(111,216,156,1) 0%, rgba(70,183,118,1) 50%)",
                      }}
                    >
                      {loadingShareIcon ? (
                        <CircularLoading whiteIcon={true} />
                      ) : checkedShare ? (
                        <img src={checkIcon} />
                      ) : (
                        <img src={share} />
                      )}
                    </div>
                    <p className="show-lesson-plan-icon-label">
                      {t("Share a lesson plan")}
                    </p>
                    {showCopyLinkBtn ? (
                      <div className="show-share-lsn-plan-success-text">
                        {t("Link copied")}
                      </div>
                    ) : null}
                  </div>

                  <div
                    className="show-lesson-plan-icon-container"
                    onClick={() => setOpenAllLinks(!openAllLinks)}
                    title={t("Share attachments")}
                  >
                    <div className="show-lesson-plan-icon-background">
                      <img src={paperclip} />
                    </div>
                    <p className="show-lesson-plan-icon-label">
                      {t("Share attachments")}
                    </p>
                  </div>
                  {openAllLinks && (
                    <AllLinksOnPdfPage
                      setOpen={setOpenAllLinks}
                      title={t("Share attachments")}
                      button={t("Copy link")}
                    />
                  )}
                </>
              ) : null}

              <div
                className="show-lesson-plan-icon-container if-mobile-display-none"
                onClick={handleOpenPrint}
              >
                <div
                  className="show-lesson-plan-icon-background"
                  title={t("Print")}
                >
                  {loading ? (
                    <CircularLoading whiteIcon={true} />
                  ) : (
                    <img src={printer} />
                  )}
                </div>
                <p className="show-lesson-plan-icon-label">{t("Print")}</p>
              </div>

              {openPrint && (
                <PrintFile
                  setOpenPrint={setOpenPrint}
                  onFilePrintClick={handleClickFilePrint}
                  onLessonPlanPrintClick={handleClickPagePrint}
                />
              )}
            </div>
          )}
        </div>

        <Link to="/home" className="show-lesson-plan-mobile-logo">
          <img src={whiteLogo} className="show-lesson-plan-mobile-logo-icon" />
        </Link>
      </div>
      <div
        className={"show-lesson-plan-checked-scroll-screen"}
        id="lsnPlanAndProcChecked"
      >
        {lsnPlanAndLsnProsWord.map((el) => {
          return (
            <div className={"show-lesson-plan-checked-scroll-screen-item"}>
              <span
                key={el.id}
                onClick={(e) => handleScrollClick(e, el.id)}
                className={classNames("show-lesson-plan-active-checked", {
                  activeCheckedItem: hash === `#${el.id}`,
                })}
              >
                {el.name}
              </span>
              {hash === `#${el.id}` && (
                <p className={"show-lesson-plan-active-item-line"} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fullName: state.lessonPlanReducer.headerDetails.fullName,
    insertedDate: state.lessonPlanReducer.headerDetails.insertedDate,
    subjectName: state.lessonPlanReducer.headerDetails.subjectName,
    semester: state.lessonPlanReducer.headerDetails.semester,
    lessonPlanDetails: state.lessonPlanReducer.lessonPlanDetails,
    userId: state.formReducer.userId,
    userTypeId: state.authReducer.typeId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFileForPrint: (url, onChangeLoading, signal) =>
      dispatch(getFileForPrint(url, onChangeLoading, signal)),
    getPageForPrint: (lessonPlanId, onChangeLoading, signal) =>
      dispatch(getPageForPrint(lessonPlanId, onChangeLoading, signal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
