import { faLink, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'

const Redirect = () => {
  const [input, setInput] = useState('')
  const [editedUrl, setEditedUrl] = useState('')
  const [redirects, setRedirects] = useState(JSON.parse(localStorage.getItem('redirects') || '[]'));
  const [show, setShow] = useState(true);

  const toggleShow = () => {
    setShow(!show);
  }
  const addRedirect = (e) => {
    e.preventDefault();
    if (input) {
      setRedirects([...redirects, input])
      setInput("")
    }
  }

  useEffect(() => {
    localStorage.setItem('redirects', JSON.stringify(redirects))
  }, [redirects])

  const removeUrl = (index) => {
    setRedirects(redirects => redirects.filter((redirect, key) => key !== index))
  }

  const editUrl = (index) => {
    const newUrl = redirects.find(url => url === redirects[index])
    console.log(newUrl)

    setInput(newUrl)
    setEditedUrl(index)
    console.log(editedUrl)
  }

  return (
    <div className='redirect'>
      <p className='redirect__title'>Currently redirecting to</p>
      <div className='redirect__content'>
        {redirects.map((redirect, index) => (
          <div className='redirect-links' key={index}>
            <FontAwesomeIcon icon={faLink} />
            <p>{redirect}</p>
            <div className='redirect-btns'>
              <FontAwesomeIcon icon={faPen} className='edit-btn' onClick={() => editUrl(index)} />
              <FontAwesomeIcon icon={faTrash} className='delete-btn' onClick={() => removeUrl(index)} />
            </div>
          </div>
        ))}
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
                  <button className='block__add-btn' onClick={(e) => addRedirect(e)}>Add</button>
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

export default Redirect