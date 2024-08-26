import React, {useState} from "react";
import ReactToPdf from "react-to-pdf";
// import {Annotation} from "react-to-pdf";
import ShowLsnPlanAndLsnProc from "./ShowLsnPlanAndLsnProc/ShowLsnPlanAndLsnProc";

// interface Annotation {
//   budgets: Budget[];
// }

function ReactToPdfComp() {
    const ref = React.createRef();
    const [data, setData] = useState("նապաստակ");
    // let height = window.screen.height;
    let height = document.body.scrollHeight;
    let width = window.screen.width;

    const options = {
        // orientation: "portrait",
        unit: "pt",
        // format: [width, height],
        // pages: 2,
    };

    return (
        <div>
            {/* <Annotation pageNumber="2" /> */}

            <ReactToPdf
                targetRef={ref}
                filename="div-blue.pdf"
                options={options}
                // pages="2"
                // pageNumber={2}
                // addPage
                x={0.5}
                y={height}
                // scale={0.2}
            >
                {({toPdf}) => <button onClick={toPdf}>Generate pdf</button>}
            </ReactToPdf>
            {/* <div style={{ width: 500, height: 500, background: "blue" }} ref={ref} /> */}
            {/* <div style={{ alignSelf: "center", width: 595, height: 842 }} ref={ref}> */}
            <div style={{background: "aliceblue"}}>
                <div
                    // style={{ alignSelf: "center" }}
                    // style={{ alignSelf: "center", width: "752px" }}
                    style={{
                        width: "752px",
                        height: "100%",
                        margin: "auto",
                        background: "#FFFFFF",
                    }}
                >
                    <div ref={ref}>
                        <ShowLsnPlanAndLsnProc/>
                    </div>
                </div>

                {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
                {/* <div></div> */}
            </div>
        </div>
    );
}

export default ReactToPdfComp;
