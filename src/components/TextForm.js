import React, { useState } from 'react';
import { FaCopy, FaDownload, FaCheckDouble} from 'react-icons/fa';
import { GrClearOption } from "react-icons/gr";

function TextForm(props) {
  const [text, setText] = useState('');
  const [CopyBtnText, setCopyBtnText] = useState(<FaCopy/>);

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const wordCount = text.trim().split(/\s+/).filter(word => word !== '').length; // Count words by splitting on spaces and removing empty words
  const characterCount = text.replace(/\s/g, '').length; // Remove all whitespace characters to count only non-space characters


  const handleDownload = () => {

    if (text.trim() === '') {
      props.showAlert('Textarea is empty. Please enter some text to download.', 'warning');
      return; // Stop further execution
    }

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'TextMaster.txt');
    link.click();
    window.URL.revokeObjectURL(url);
    props.showAlert('File download initiated!', 'success');
  };

  const handleCopy = () => {
    if (text.trim() === '') {
      setCopyBtnText(<FaCopy/>);
      props.showAlert('Enter something to Copy!!!', 'warning'); // this i'll work when i i'll not use disabled={text.length===0} this function
    } else {
      navigator.clipboard.writeText(text);
      setCopyBtnText(<FaCheckDouble />);
      props.showAlert('Copied! to clipboard!!!', 'success');
    }
    setTimeout(() => {
      setCopyBtnText(<FaCopy/>);
    }, 2000);
  };

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    if (text.trim() === '') {
      props.showAlert('Enter something to convert uppercase!!!', 'warning');// this i'll work when i i'll not use disabled={text.length===0} this function
    } else {
      setText(newText);
      props.showAlert('Converted to uppercase!!!', 'success');
    }
  };

  const handleLpClick = () => {
    let newText = text.toLowerCase();
    if (text.trim() === '') {
      props.showAlert('Enter something to convert lowercase!!!', 'warning');// this i'll work when i i'll not use disabled={text.length===0} this function
    } else {
      setText(newText);
      props.showAlert('Converted to lowercase!!!', 'success');
    }
  };

  const handleUpFirstLetter = () => {
    let newText = text.replace(/\b\w/g, (char) => char.toUpperCase());
    if (text.trim() === '') {
      props.showAlert('Enter something to convert uppercase!!!', 'warning');// this i'll work when i i'll not use disabled={text.length===0} this function
    } else {
      setText(newText);
      props.showAlert('All first letters converted to uppercase!!!', 'success');
    }
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    if (text.trim() === '') {
      props.showAlert('Enter something to remove extra spaces!!!', 'warning');// this i'll work when i i'll not use disabled={text.length===0} this function
    } else {
      setText(newText.join(' '));
      props.showAlert('All extra spaces removed!!!', 'success');
    }
  };

  const handleClear = () => {
    let newText = '';
    if (text.trim() === '') {
      props.showAlert('Textarea is already empty!!!', 'warning');// this i'll work when i i'll not use disabled={text.length===0} this function
    } else {
      setText(newText);
      props.showAlert('Textarea cleared!!!', 'success');
    }
  };

  return (
    <div className="container mt-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>


      
<div className="container hstack gap-3">
  <h1 className="p-2">{props.heading}</h1>
  <div className="d-flex flex-wrap align-items-center gap-2 ms-auto">
    <button disabled={text.length===0}
      className="btn btn-outline-dark p-1"
      style={{
        backgroundColor: props.mode === 'dark' ? 'gray' : 'white',
        color: props.mode === 'dark' ? 'white' : '#042743',
        minWidth: 'fit-content',
        whiteSpace: 'nowrap'
      }}
      onClick={handleDownload}
    >
      <FaDownload />
    </button>

    <button disabled={text.length===0}
      className="btn btn-outline-dark p-1"
      style={{
        backgroundColor: props.mode === 'dark' ? 'gray' : 'white',
        color: props.mode === 'dark' ? 'white' : '#042743',
        minWidth: 'fit-content',
        whiteSpace: 'nowrap'
      }}
      onClick={handleCopy}
    >
      {CopyBtnText}
    </button>
  </div>
</div>


      <textarea
        className="form-control"
        value={text}
        onChange={handleOnChange}
        style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }}
        id="MyBox"
        rows="8"
      ></textarea>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>
        Convert to Uppercase
      </button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleLpClick}>
        Convert to Lowercase
      </button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleUpFirstLetter}>
        Capitalize First Letter
      </button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleExtraSpaces}>
        Remove Extra Spaces
      </button>
      <button disabled={text.length===0} className="btn btn-danger mx-2 my-2" onClick={handleClear}>
      <GrClearOption />
      </button>
      <div className="container mt-3">
        <hr></hr>
        <h3>Text Summary</h3>

        <p>
  {wordCount} Words... & {characterCount} characters...
</p>
<p>{0.008 * wordCount} Minute to read</p>
<h3>Preview</h3>
<p>{text.length > 0 ? text : 'Nothing to preview'}</p>

      </div>
    </div>
  );
}

export default TextForm;
