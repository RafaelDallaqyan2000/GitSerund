import React, { useCallback, useState } from "react";
import calendarIcon from "../../img/calendar.svg";
import eyeIcon from "../../img/eye.PNG";
import heartIcon from "../../img/heart.svg";
import heartFillIcon from "../../img/heartFill.svg";
import defaultImage from "../../img/defaultProfile.png";
import momentWL from "moment-with-locales-es6";
import request from "../../store/request";
import { connect } from "react-redux";
import { LessonPlanCardOptions } from "./LessonPlanCardOptions";
import "./LessonPlanCard.css";
import { useTranslation } from "react-i18next";

function LessonPlanCardComponent(props) {
  const {
    canDelete = true,
    lsnPlan,
    containerStyle,
    containerClassName,
    onAvatarClick,
    onTitleClick,
    currentUserId,
  } = props;

  const {
    canViewProfile,
    insertedDate,
    isFavourite,
    imageName,
    id,
    topic,
    userId,
    subject,
    fullName,
    gradientColor,
    backgroundImg,
    canEdit,
    views,
    subjectColor,
    subjectBackgroundColor,
  } = lsnPlan;

  const [isFavorite, setIsFavorite] = useState(isFavourite);
  const { t } = useTranslation();

  const handleToggleFavourite = useCallback(
    (e) => {
      e.stopPropagation();
      return request("/api/lessonPlan/toggleFavourite", "POST", {
        userId: currentUserId,
        lessonPlanId: +id,
      })
        .then(() => setIsFavorite((prevState) => !prevState))
        .catch((error) => error);
    },
    [currentUserId, id]
  );

  const userName = fullName?.split(" ")[0];
  const userLastName = fullName?.split(" ")[1];

  return (
    <article
      className={`lsn_plan_card ${containerClassName}`}
      style={containerStyle}
    >
      <figure
        className="lsn_plan_figure"
        onClick={() => {
          onTitleClick(id);
        }}
      >
        <img
          src={backgroundImg}
          alt="Lesson plan image"
          className="lsn_plan_image"
          onError={(e) => {
            e.target.error = null;
            e.target.src = defaultImage;
          }}
        />
      </figure>
      <div className="lsn_plan_card_container">
        <div className="lsn_plan_card_name_and_image_container">
          <div
            className="lsn_plan_card_fake_container"
            // style={{paddingTop: 30}}
            onClick={() => onTitleClick(id)}
          />
          <figure
            className={`lsn_plan_profile_figure ${
              canViewProfile ? "can_view_profile" : ""
            }`}
            onClick={() => {
              if (window.innerWidth > 1120) {
                onAvatarClick(lsnPlan);
              } else {
                onTitleClick(id);
              }
            }}
          >
            <img
              src={`/files/${userId}/${imageName}`}
              alt="Image"
              className="lsn_plan_profile_image"
              onError={(e) => {
                e.target.error = null;
                e.target.src = defaultImage;
              }}
            />
          </figure>
          <div className="lsn_plan_profile_name_box">
            {window.innerWidth > 1120 ? (
              <>
                <p
                  className="lsn_plan_profile_name"
                  onClick={() => onTitleClick(id)}
                  title={fullName}
                >
                  {userName}
                </p>
                <p
                  className="lsn_plan_profile_name"
                  onClick={() => onTitleClick(id)}
                  title={fullName}
                >
                  {userLastName}
                </p>
              </>
            ) : (
              <p
                className="lsn_plan_profile_name"
                onClick={() => onTitleClick(id)}
                title={fullName}
              >
                {fullName}
              </p>
            )}
          </div>
        </div>
        <div className="lsn_plan_profile_edit_box">
          <div className="lsn_plan_card_subject_class_container">
            <div
              className="lsn_plan_card_subject_container"
              style={{ backgroundColor: subjectBackgroundColor ?? "#F3F3F3" }}
            >
              <p
                style={{ color: subjectColor ?? "#8C8E92" }}
                className="lsn_plan_card_subject"
                title={subject}
              >
                {subject}
              </p>
            </div>
            {lsnPlan.class && lsnPlan.class !== "Այլ" ? (
              <div className="lsn_plan_card_class_container">
                <p className="lsn_plan_card_class">{lsnPlan.class}</p>
              </div>
            ) : null}
          </div>
          {!!canEdit && window.innerWidth > 1120 && (
            <div>
              <LessonPlanCardOptions canDelete={canDelete} lsnPlan={lsnPlan} />
            </div>
          )}
        </div>
        <div
          onClick={() => onTitleClick(id)}
          className="lsn_plan_card_body_and_footer_container"
        >
          <p className="lsn_plan_card_name" title={topic}>
            {topic}
          </p>
          <footer className="lsn_plan_card_footer_container">
            <div className="lsn_plan_card_footer">
              <div className="lsn_plan_card_date_container">
                <img
                  src={calendarIcon}
                  alt="Calendar"
                  className="lsn_plan_card_date_icon"
                />
                <p
                  className="lsn_plan_card_date"
                  title={momentWL(insertedDate).format("MMMM DD YYYY")}
                >
                  {momentWL(insertedDate).format("MMMM DD YYYY")}
                </p>
              </div>
              <div className="lsn_plan_card_actions">
                <div className="lsn_plan_card_views">
                  <img
                    className="lsn_plan_card_views_icon"
                    alt="eye"
                    src={eyeIcon}
                  />
                  <p className="lsn_plan_card_views_count">{views}</p>
                </div>

                <figure
                  className="lsn_plan_card_like_figure"
                  onClick={handleToggleFavourite}
                >
                  <img
                    src={isFavorite ? heartFillIcon : heartIcon}
                    alt="heart"
                    className="lsn_plan_card_like_icon"
                  />
                </figure>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.formReducer.userId,
  };
};

export const LessonPlanCard = connect(mapStateToProps)(LessonPlanCardComponent);
