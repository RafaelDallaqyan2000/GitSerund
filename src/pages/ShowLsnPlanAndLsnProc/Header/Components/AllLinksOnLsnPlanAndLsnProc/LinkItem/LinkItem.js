import "./LinkItem.css";
import {connect} from "react-redux";

function CopyLinkItem({
    title,
    type = "",
    id,
    isChecked,
    onChange
}) {

    const icon = type === "pdf" || type === "PDF" ? require("../../images/pdf.svg").default
        : type === "jpg" || type === "JPG" ? require("../../images/jpg.svg").default
        : type === "png" || type === "PNG" ? require("../../images/png.svg").default
        : type === "link" || type === "LINK" ? require("../../../../../../img/link.svg").default
        :  require("../../images/clearFile.svg").default

    return (
        <label className="lsn-plan-pdf-link-items">
            <div className="checkbox">
                    <input
                        id={ id }
                        className="checkbox-custom"
                        name="copyLink"
                        type="checkbox"
                        checked={ isChecked }
                        onChange={onChange}
                    />
                    <label
                        for={ id }
                        className="checkbox-custom-label"
                    >
                    </label>
            </div>
            <div className="texts-from-link-items">
                <p className="lsn-plan-pdf-link-title">
                    { title }
                </p>
                <span className="lsn-plan-pdf-link-type">
                    { type }
                </span>
            </div>
            {
                type && (
                    <div className="file-icon-in-share">
                        <img src={icon}/>
                    </div>
                )
            }
        </label>
    )
}
const mapStateToProps = ( state ) => {
    return {
        copyFiles : state.lessonPlanReducer.copyFiles,
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return {}
}
export const LinkItem = connect(mapStateToProps, mapDispatchToProps)(CopyLinkItem)
