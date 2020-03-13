import React, {useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown'

const url = 'https://dekalog.s3.ir-thr-at1.arvanstorage.com/readme.md'

function App() {
  const [text, setText] = useState('')

  useEffect(() => {
    fetch(url)
      .then(res => res.text())
      .then(raw => setText(raw))
  }, [])

  return (
    <div>
      <ReactMarkdown source={text} />
    </div>
  )
}

export default App
