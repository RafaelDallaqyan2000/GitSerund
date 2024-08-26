import { NavLink } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import "./NavbarNotification.css";
import { useTranslation } from "react-i18next";

export function NavbarNotification() {
  const query = useQuery();

  const { t } = useTranslation();

  let page = parseInt(query.get("page"));
  page > 1 && query.set("page", page - 1);

  return (
    <div className="navbar_notifications_container">
      <span className="title_notifications_page">{t("Notifications")}</span>

      <div className="icons_on_navbar_notifications">
        <NavLink to={`/notifications/all?page=${page ? page : 1}&typeId=`}>
          <div className="background-icons_on_navbar">
            <img
              src={
                require("../icons/material-symbols_border-all-rounded.svg")
                  .default
              }
            />
          </div>
        </NavLink>

        <NavLink
          to={`/notifications/comments?page=${page ? page : 1}&typeId=1`}
        >
          <div title={t("Comment")} className="background-icons_on_navbar">
            <img src={require("../icons/comment-icon.svg").default} />
          </div>
        </NavLink>

        <NavLink to={`/notifications/liked?page=${page ? page : 1}&typeId=2`}>
          <div title={t("it was cool")} className="background-icons_on_navbar">
            <img src={require("../icons/like_icon.svg").default} />
          </div>
        </NavLink>

        <NavLink to={`/notifications/admin?page=${page ? page : 1}&typeId=5`}>
          <div title={t("From Admin")} className="background-icons_on_navbar">
            <img src={require("../icons/eos-icons_admin.svg").default} />
          </div>
        </NavLink>

        {/*Todo: I will add this feature*/}
        {/*<div*/}
        {/*    title="Նորություն"*/}
        {/*    className="background-icons_on_navbar"*/}
        {/*>*/}
        {/*    <img src={require("../icons/fluent_megaphone-loud-16-filled.svg").default} />*/}
        {/*</div>*/}

        <NavLink to={`/notifications/news?page=${page ? page : 1}&typeId=4`}>
          <div
            title={t("New lesson plan")}
            className="background-icons_on_navbar"
          >
            <img src={require("../icons/fluent_news-24-filled.svg").default} />
          </div>
        </NavLink>
      </div>
    </div>
  );
}
