import cx from "classnames";

export default function FormHelperText({ children, type }) {
  return (
    <div
      className={cx("text-xs", {
        "text-red-600": type === "error",
        "text-base-400": !type,
      })}
    >
      {children}
    </div>
  );
}
