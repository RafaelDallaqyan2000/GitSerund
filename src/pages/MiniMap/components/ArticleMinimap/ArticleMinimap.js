import React from "react";
import ReactMinimap from "react-minimap";
import "react-minimap/dist/react-minimap.css";
import Article from "../Article/Article";
import MinimapNode from "../MinmapNode/MinmapNode";

const ArticleMinimap = ({ children }) => (

  <ReactMinimap
    selector=".highlight"
   
    width={20}
    childComponent={Article}
  >
    {children}
  </ReactMinimap>
);


export default ArticleMinimap;