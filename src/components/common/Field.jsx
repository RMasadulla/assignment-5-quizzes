import React from "react";

const Field = ({ label, children, htmlFor, error }) => {
  const id = htmlFor || getChildId(children);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block mb-1">
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <p role="alert" className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

const getChildId = (children) => {
  const child = React.Children.only(children);
  return child?.props?.id;
};

export default Field;
