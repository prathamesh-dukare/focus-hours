import { faLink, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import InputHandler from './InputHandler';

const Block = () => {
  const [input, setInput] = useState('');
  const [localUrls, setLocalUrls] = useState(JSON.parse(localStorage.getItem('localUrls') || "[]"))
  const [selectedItems, setSelectedItems] = useState(JSON.parse(localStorage.getItem('selectedUrls') || '[]'));

  const addBlockSite = (e) => {
    e.preventDefault();
    if (input) {
      try {
        const inputUrl = new URL(input);
        const hostname = inputUrl.hostname
        const url = hostname.replace(/.+\/\/|www.|\..+/g, '')
        const itemExists = localUrls.some(item => item === url)
        if (itemExists) {
          return window.alert("Website already exist!")
        }
        setLocalUrls([...localUrls, url])
        setInput("")
      } catch (error) {
        window.alert("Please enter a valid URL")
      }
    }
  }

  useEffect(() => {
    localStorage.setItem('localUrls', JSON.stringify(localUrls))
  }, [localUrls]);

  const removeUrl = (key) => {
    setLocalUrls(errors => errors.filter((item, index) => key !== index))
    setSelectedItems(errors => errors.filter((item, index) => item !== localUrls[key]))
  }

  const handleItemSelect = (itemId) => {
    const itemExists = selectedItems.some(item => item === localUrls[itemId])
    if (itemExists) {
      const updatedItems = selectedItems.filter(item => item !== localUrls[itemId]);
      setSelectedItems(updatedItems);
    } else {
      const selectedItem = localUrls.find(item => item === localUrls[itemId]);
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  useEffect(() => {
    localStorage.setItem('selectedUrls', JSON.stringify(selectedItems))
  }, [selectedItems])

  return (
    <div className='block'>
      <p className='block__heading'>Which websites do you want to block?</p>
      <div className="block__websites">
        {localUrls.map((url, index) =>
          <div className={selectedItems.some(item => item === localUrls[index]) ? 'selected block__website' : 'block__website'} key={index}>
            <button
              key={index}
              onClick={() => handleItemSelect(index)}>
              <span className='link-icon'><FontAwesomeIcon icon={faLink} /></span>
              <span className='link-name'  >{url.replace(/.+\/\/|www.|\..+/g, '')}</span>
            </button>
            <span className='link-remove'><FontAwesomeIcon onClick={() => removeUrl(index)} icon={faXmark} /></span>
          </div>
        )}
      </div>
      <InputHandler
        input={input}
        setInput={setInput}
        addSite={addBlockSite}
      />
    </div>
  )
}

export default Block