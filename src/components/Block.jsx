import { faLink, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const Block = () => {
  const [input, setInput] = useState('');
  const [localUrls, setLocalUrls] = useState(JSON.parse(localStorage.getItem('localUrls') || "[]"))
  const [selectedItems, setSelectedItems] = useState(JSON.parse(localStorage.getItem('selectedUrls') || '[]'));

  const [show, setShow] = useState(true);

    const toggleShow = () => {
      setShow(!show);
    }
  
  const addBlockSite = (e) => {
    e.preventDefault();
    const itemExists = localUrls.some(item => item === input)
    if (input) {
      if (!itemExists) {
        setLocalUrls([...localUrls, input])
        setInput("")
      }
      else {
        window.alert('Website already added')
      }
    }
  }

  useEffect(() => {
    localStorage.setItem('localUrls', JSON.stringify(localUrls))
  }, [localUrls]);

  const removeUrl = (key) => {
    setLocalUrls(errors => errors.filter((item, index) => key !== index))
  }

  const handleItemSelect = (itemId) => {
    const itemExists = selectedItems.some(item => item === localUrls[itemId])
    if (itemExists) {
      console.log("item present")
      const updatedItems = selectedItems.filter(item => item !== localUrls[itemId]);
      setSelectedItems(updatedItems);
    } else {
      console.log("not present")
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
          <button
            key={index}
            onClick={() => handleItemSelect(index)}
            className={selectedItems.some(item => item === localUrls[index]) ? 'selected block__website' : 'block__website'}>
            <span className='link-icon'><FontAwesomeIcon icon={faLink} /></span>
            <span className='link-name'  >{url = url.replace(/.+\/\/|www.|\..+/g, '')}</span>
            <span className='link-remove'><FontAwesomeIcon onClick={() => removeUrl(index)} icon={faXmark} /></span>
          </button>
        )}
      </div>
      
      <div className="redirect__add">
          {show ? (
            <p
              className='block__add-toggle'
              onClick={toggleShow}>
              + Add a website
            </p>
          ) : (
            <div className='block__input'>
              <form className='block__input-form'>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className='block__input-text'
                  placeholder='Enter a valid website' />
                <div className="block__input-btn">
                  <button className='block__add-btn' onClick={(e) => addBlockSite(e)}>Add</button>
                  <span className='block__close'>
                    <i onClick={toggleShow} className="fa-regular fa-circle-xmark"></i>
                  </span>
                </div>
              </form>
            </div>
          )
          }
        </div>
    </div>
  )
}

export default Block