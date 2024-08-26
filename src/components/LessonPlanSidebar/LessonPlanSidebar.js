import React, { useCallback, useEffect, useRef, useState } from "react";
import { LessonPlanSidebarItem } from "./LessonPlanSidebarItem";
import "./LessonPlanSidebar.css";
import classNames from "classnames";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import close from "../../img/close.svg";
import { useLocation } from "react-router-dom";

export function LessonPlanSidebar({
  lessonPlanSidebarData,
  onClickNavItem,
  filledStyle,
}) {
  const location = useLocation();
  const hash = location.hash ? location.hash : "#teacherId";
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    document.querySelector(hash).scrollIntoView();
  }, []);
  const handleOpenCloseSidebar = useCallback(() => {
    setOpenSidebar((prevState) => !prevState);
  }, []);

  useOutsideClick(sidebarRef, () => {
    if (openSidebar) setOpenSidebar(false);
  });

  return (
    <div
      ref={sidebarRef}
      className={classNames("lesson_plan_sidebar", { open: openSidebar })}
    >
      <nav className="lesson_plan_sidebar_nav">
        {lessonPlanSidebarData.map((item) =>
          item.show ? (
            <LessonPlanSidebarItem
              key={item.hash}
              text={item.text}
              currentHash={item.hash}
              hash={hash}
              onClick={onClickNavItem}
              filledStyle={filledStyle}
            />
          ) : null
        )}
        <div
          className="lesson_plan_sidebar_open"
          onClick={handleOpenCloseSidebar}
        >
          <img
            src={close}
            alt="Bars"
            className={classNames("lesson_plan_sidebar_open_icon", {
              open: openSidebar,
            })}
          />
        </div>
      </nav>
    </div>
  );
}
