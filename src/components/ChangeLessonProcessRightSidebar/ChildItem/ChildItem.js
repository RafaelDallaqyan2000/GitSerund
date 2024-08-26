import style from "./ChildItem.module.css";

export function ChildItem({ item, containerStyle }) {
  const { title, text } = item;

  return (
    <div
      style={{ marginTop: "12px", maxWidth: "300px", ...containerStyle }}
      className="lsn_proc_right_sidebar"
    >
      <p className={style.title}>{title}</p>
      <p
        className={style.childItemText}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
