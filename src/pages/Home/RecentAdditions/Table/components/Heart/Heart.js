import "./Heart.css";
import React, { useState } from "react";
import Heart_selected from "../../../../../../img/Heart_selected";
import request from "../../../../../../store/request";
import button from "../../../../../../components/Button/Button";

function Heart({ item }) {
  const [isFavourite, setIsFavourite] = useState(item?.isFavourite);
  const [loading, setLoading] = useState(false);

  if (!Object?.keys(item)?.length) {
    return;
  }

  const setFavourite = (e) => {
    if (!loading) {
      setLoading(true);
      request("/api/lessonPlan/toggleFavourite", "POST", {
        lessonPlanId: +item.id,
      })
        .then((_) => {
          setLoading(false);
          item.isFavourite = !item.isFavourite;
          setIsFavourite(item.isFavourite);
        })
        .catch((_) => {
          setLoading(false);
        });
    }
  };

  return (
    <td style={{ cursor: "pointer" }} className="heart_icon">
      {isFavourite ? (
        <button className="heart-button" onClick={setFavourite}>
          <Heart_selected className={!!loading && "heart-jumping"} />
        </button>
      ) : (
        <button className="heart-button" onClick={setFavourite}>
          <img
            width={20}
            height={20}
            className={` ${!!loading && "heart-jumping"}`}
            src={require(`../../../../../../img/heart.svg`).default}
          />
        </button>
      )}
    </td>
  );
}

export default Heart;
