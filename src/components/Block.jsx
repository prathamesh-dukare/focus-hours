import React, { useState } from 'react';

const Block = () => {
  const[show, setShow] = useState(true);
  const[input, setInput] = useState('');


  const toggleShow = () => {
    setShow(!show);
  }

  const urls = [
    'https://twitter.com',
    'https://www.linkedin.com',
    'https://www.reddit.com',
  ]

  const[blockedUrls, setBlockedUrls] = useState(urls)

  const addBlockSite = () => {
    setBlockedUrls(...blockedUrls, input)
    setInput("")
    console.log(blockedUrls())
  }
  
  return (
    <div className='block'>
      <p className='block__heading'>Which websites do you want to block?</p>
      <div className="block__websites">
        {urls.map((url) => 
          <button className='block__websites-name'>
            {url = url.replace(/.+\/\/|www.|\..+/g, '')}
          </button>
        )}
      </div>
      <div className="block__add">
        {show ? (
          <button 
            className='block__add-btn' 
            onClick={toggleShow}>
            + Add a website
          </button>
        ) : (
          <div className='block__input'>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='block__input-text'/>
            <div className="block__input-btn">
              <button className='add' onClick={addBlockSite}>Add</button>
              <button className='add' onClick={toggleShow}>Close</button>
            </div>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default Block