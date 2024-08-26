import "./InputSwitch.css";
import classNames from "classnames";
import commentIcon from '../../img/comment.svg';

export function InputSwitch(props) {
    const {
        showComments,
        onClickSwitch,
    } = props;

    return (
        <label className={classNames('switch', {switch_checked: showComments})}>
            <input type="checkbox"/>
            <span className="slider round" onClick={onClickSwitch}>
                <div className="slider_div">
                    <img style={{position: "absolute"}} src={commentIcon} alt='Comment'/>
                </div>
            </span>
        </label>
    )
}
