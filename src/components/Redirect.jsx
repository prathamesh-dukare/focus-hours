/* global chrome */
import { faLink, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import InputHandler from "./InputHandler";
import { urlFormatter } from "../utils";

const Redirect = () => {
  const [input, setInput] = useState("");
  const [editedUrlIndex, setEditedUrlIndex] = useState("");
  const [redirects, setRedirects] = useState([]);
  const [editedUrl, setEditedUrl] = useState("");
  const [isError, setIsError] = useState(false);

  const addRedirect = (e) => {
    e.preventDefault();
    if (input) {
      try {
        const inputUrl = new URL(urlFormatter(input));
        let url = inputUrl.href;
        url = url.slice(0, -1);
        setRedirects([...redirects, url]);
        setInput("");
        setIsError(false);
      } catch (error) {
        setIsError(true);
        // alert("Please enter a valid URL");
      }
    }
  };

  useEffect(() => {
    chrome.storage.sync.get({ redirects: [] }).then((result) => {
      console.log("get redirects", result.redirects);
      setRedirects(result.redirects);
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ redirects: redirects }).then(() => {
      console.log(redirects);
    });
  }, [redirects]);

  const removeUrl = (index) => {
    setRedirects((redirects) =>
      redirects.filter((redirect, key) => key !== index)
    );
  };

  const editUrl = (index) => {
    const newUrl = redirects.find((url) => url === redirects[index]);
    setEditedUrl(newUrl);
    setEditedUrlIndex(index);
  };

  const addEditedUrl = () => {
    if (editedUrl) {
      let newArr = [...redirects];
      newArr[editedUrlIndex] = editedUrl;
      setRedirects(newArr);
      setEditedUrl("");
      setEditedUrlIndex(-1);
    }
  };

  const handleClose = () => {
    setEditedUrlIndex(-1);
  };

  return (
    <div className="redirect">
      <p className="redirect__title">Currently redirecting to</p>
      <div className="redirect__content">
        {redirects?.length === 0 ? (
          <p className="no-link">No redirect link has been added yet</p>
        ) : (
          redirects.map((redirect, index) => (
            <div className="redirect-links" key={index}>
              <FontAwesomeIcon icon={faLink} />
              {index === editedUrlIndex ? (
                <>
                  <input
                    type="text"
                    value={editedUrl}
                    onChange={(e) => setEditedUrl(e.target.value)}
                    autoFocus
                    spellCheck="false"
                  />
                  <div className="redirect-btns">
                    <button className="block__add-btn" onClick={addEditedUrl}>
                      Add
                    </button>
                    <i
                      className="fa-regular fa-circle-xmark"
                      onClick={handleClose}
                    ></i>
                  </div>
                </>
              ) : (
                <>
                  <p className="redirect_url">{redirect}</p>
                  <div className="redirect-btns">
                    <FontAwesomeIcon
                      icon={faPen}
                      className="edit-btn"
                      onClick={() => editUrl(index)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="delete-btn"
                      onClick={() => removeUrl(index)}
                    />
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
      <InputHandler
        title="link"
        input={input}
        setInput={setInput}
        addSite={addRedirect}
        isError={isError}
      />
    </div>
  );
};

export default Redirect;
