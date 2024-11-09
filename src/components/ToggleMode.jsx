/* global chrome */
import React, { useEffect } from "react";

export default function ToggleMode() {
  const [toggle, setToggle] = React.useState(false);

  useEffect(() => {
    chrome.storage.sync.get("isFocusModeOn", (result) => {
      setToggle(!!result.isFocusModeOn);
    });
  }, []);

  useEffect(() => {
    // update in chrome storage
    chrome.storage.sync.set({ isFocusModeOn: toggle }).then(() => {
      console.log("set focus mode to", toggle);
    });
  }, [toggle]);

  return (
    <div className="toggle-button-cover">
      <div className="button-cover">
        <div className="button r" id="button-1">
          <input
            type="checkbox"
            className="checkbox"
            checked={!toggle}
            onChange={() => {
              setToggle(!toggle);
            }}
          />
          <div className="knobs"></div>
          <div className="layer"></div>
        </div>
      </div>
    </div>
  );
}
