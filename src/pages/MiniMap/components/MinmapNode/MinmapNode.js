import React, { Component, useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";


const MinimapNode = ({ node, ...props }) => {


     
  
        document.getElementsByClassName("minimap")[0].id = "minimap"
     const minimap =  document.getElementById("minimap")
    minimap.appendChild(node)
     
        
       
    return(
        <div
        style={{
          ...props,
          position: "absolute",
          backgroundColor: node.dataset.hlColor
        }}
      ></div>
    )
}

export default MinimapNode;