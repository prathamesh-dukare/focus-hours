/* global chrome */
import { faLink, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import InputHandler from "./InputHandler";
import { urlFormatter } from "../utils";

const Block = () => {
  const [input, setInput] = useState("");
  const [localUrls, setLocalUrls] = useState([]);
  const [blockedUrls, setBlockedUrls] = useState([]);
  const [isError, setIsError] = useState(false);

  const addBlockSite = (e) => {
    e.preventDefault();
    if (input) {
      // web.com
      // www.web.com
      // https://web.com

      try {
        const inputUrl = new URL(urlFormatter(input));
        const hostname = inputUrl.hostname;
        const url = hostname.replace("www.", "");
        const itemExists = localUrls.some((item) => item === hostname);
        if (itemExists) {
          return alert("Website already exist!");
        }
        setLocalUrls([...localUrls, url]);
        setInput("");
        setIsError(false);
      } catch (error) {
        setIsError(true);
        // alert("Please enter a valid URL");
      }
    }
  };

  useEffect(() => {
    chrome.storage.sync.get({ localUrls: [] }).then((result) => {
      console.log("get local", result.localUrls);
      setLocalUrls(result.localUrls);
    });

    chrome.storage.sync.get({ blockedUrls: [] }).then((result) => {
      console.log("get blocked", result.blockedUrls);
      setBlockedUrls(result.blockedUrls);
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ localUrls: localUrls }).then(() => {
      console.log("set local", localUrls);
    });
  }, [localUrls]);

  const removeUrl = (key) => {
    setLocalUrls((errors) => errors.filter((item, index) => key !== index));
    setBlockedUrls((errors) =>
      errors.filter((item, index) => item !== localUrls[key])
    );
  };

  const handleItemSelect = (itemId) => {
    const itemExists = blockedUrls.some((item) => item === localUrls[itemId]);
    if (itemExists) {
      const updatedItems = blockedUrls.filter(
        (item) => item !== localUrls[itemId]
      );
      setBlockedUrls(updatedItems);
    } else {
      const selectedItem = localUrls.find((item) => item === localUrls[itemId]);
      setBlockedUrls([...blockedUrls, selectedItem]);
    }
  };

  useEffect(() => {
    chrome.storage.sync.set({ blockedUrls: blockedUrls }).then(() => {
      console.log("set blocked", blockedUrls);
    });
  }, [blockedUrls]);

  return (
    <div className="block">
      <p className="block__heading">Which websites do you want to block?</p>
      <div className="block__websites">
        {localUrls?.map((url, index) => (
          <div
            className={
              blockedUrls.some((item) => item === localUrls[index])
                ? "selected block__website"
                : "block__website"
            }
            key={index}
          >
            <button
              key={index}
              onClick={() => handleItemSelect(index)}
              title={url}
            >
              <span className="link-icon">
                <FontAwesomeIcon icon={faLink} />
              </span>
              <span className="link-name" title={url}>
                {url.substring(0, url.lastIndexOf("."))}
              </span>
            </button>
            <span className="link-remove">
              <FontAwesomeIcon
                onClick={() => removeUrl(index)}
                icon={faXmark}
              />
            </span>
          </div>
        ))}
      </div>
      <InputHandler
        title="website"
        input={input}
        setInput={setInput}
        addSite={addBlockSite}
        isError={isError}
      />
    </div>
  );
};

export default Block;
