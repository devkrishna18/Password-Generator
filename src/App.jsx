import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [addnum, setAddnum] = useState(false);
  const [addchar, setAddchar] = useState(false);
  const [pass, setPass] = useState("");
  const password = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (setAddnum) str += "0123456789";
    if (setAddchar) str += "!@#$%^&*_/";
    let pswd = "";
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pswd += str.charAt(char);
    }
    setPass(pswd);
  }, [length, addnum, addchar,]);
const passwordref=useRef(null)
const copyPasswordtoclipboard=useCallback(()=>{
  passwordref.current?.select();
  passwordref.current?.setSelectionRange(0,101);
  window.navigator.clipboard.writeText(pass)
},[pass])
  useEffect(()=>{
    password() 
  },[length,addnum,addchar,password])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg
      px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
          value={pass}
          placeholder="password"
          readOnly
          className="outline-none w-full py-1 px-3"
          ref={passwordref}
          />
          <button onClick={copyPasswordtoclipboard} className="outline-none bg-blue-700 px-3 py-0.5 text-white shrink-0">Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setLength(e.target.value)}}
             />
             <label >Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={addnum}
            onChange={()=>{
              setAddnum((prev) => !prev);
            }}
            />
            AddNumber
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={addchar}
            onChange={()=>{
              setAddchar((prev) => !prev);
            }}
            />
            AddChar
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
