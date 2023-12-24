import { useCallback, useState, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialcharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijklmnopqrstuvwxyz"
    if (numberAllowed) str += '0987654321'
    if (specialcharAllowed) str += '!@#$%^&*()_-+{[}]|\?/<,>.~`'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, specialcharAllowed], setPassword);

  const copyHandler = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => { passwordGenerator() }, [length, numberAllowed, specialcharAllowed, passwordGenerator])

  return (
    <>
      <h1 className='text-4xl text-center mt-10'>Password Generator</h1>
      <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py-9 my-10 bg-gray-200'>
        <div className='w-96 mx-auto flex'>
          <input
            className='outline-none w-96 py-2 px-4 rounded-s-xl '
            type='text'
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyHandler}
            className='bg-blue-500 w-20 rounded-e-xl'
          >
            Copy
          </button>
        </div>
        <div className='w-96 mx-auto mt-5 flex'>
          <input
            className='w-80 py-2 px-4 mr-3 cursor-pointer'
            type='range'
            value={length}
            min={6}
            max={50}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length:{length}</label>
        </div>
        <div className='w-96 mx-auto mt-5 flex justify-evenly'>
          <div>
            <input
              className='cursor-pointer mr-2'
              type='checkbox'
              value={numberAllowed}
              onChange={() => setNumberAllowed(e => !e)}
            />
            <label>Number</label>
          </div>
          <div>
            <input
              className='cursor-pointer mr-2'
              type='checkbox'
              value={specialcharAllowed}
              onChange={() => setSpecialCharAllowed(e => !e)}
            />
            <label>Special Character Allowed</label>
          </div>
        </div>
      </div>

    </>
  )
}
export default App
