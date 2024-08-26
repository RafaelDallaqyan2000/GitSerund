import React from "react";
import Article from "./components/Article/Article";
import ArticleMinimap from "./components/ArticleMinimap/ArticleMinimap";
import "./MiniMap.css"


const MiniMap = () => {

    return(
      <div className="app1">
      <ArticleMinimap>
        <Article />
      </ArticleMinimap>
    </div>
    )
}

export default MiniMap



