import { faLink, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import InputHandler from './InputHandler';

const Redirect = () => {
  const [input, setInput] = useState('')
  const [editedUrl, setEditedUrl] = useState('')
  const [redirects, setRedirects] = useState(JSON.parse(localStorage.getItem('redirects') || '[]'));

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
      <InputHandler
        input={input}
        setInput={setInput}
        addSite={addRedirect}
      />
    </div>
  )
}

export default Redirect