import React, { useState } from "react";

const InputHandler = ({ title, input, setInput, addSite, isError }) => {
  const [show, setShow] = useState(true);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className="block__add">
      {show ? (
        <p className="block__add-toggle" onClick={toggleShow}>
          + Add a {title}
        </p>
      ) : (
        <div className="block__input">
          <form className="block__input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck="false"
              className="block__input-text"
              placeholder="Enter a valid website"
            />
            <div className="block__input-btn">
              <button className="block__add-btn" onClick={(e) => addSite(e)}>
                Add
              </button>
              <span className="block__close">
                <i
                  onClick={toggleShow}
                  className="fa-regular fa-circle-xmark"
                ></i>
              </span>
            </div>
          </form>

          {isError && <p className="error_item">Please Enter valid url</p>}
        </div>
      )}
    </div>
  );
};

export default InputHandler;
