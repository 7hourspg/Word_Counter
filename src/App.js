import React, {useState, useEffect, useRef} from "react";
import copy from "copy-to-clipboard";
import Form from "react-bootstrap/Form";
import {AiFillCopy} from "react-icons/ai";
import {IoIosRemoveCircle} from "react-icons/io";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import {
  RxLetterCaseUppercase,
  RxLetterCaseLowercase,
  RxLetterCaseCapitalize,
} from "react-icons/rx";
import "./App.scss";

function App() {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [words, setWords] = useState("");
  const [char, setChar] = useState("");

  const ref = useRef();

  const handleClipboard = () => {
    copy(input);
    setShow(true);
  };
  const convertToUpperCase = () => {
    let upperCase = input?.toUpperCase();
    setInput(upperCase);
    ref.current.focus();
  };

  const convertToLowerCase = () => {
    let lowerCase = input?.toLowerCase();
    setInput(lowerCase);
    ref.current.focus();
  };
  const convertToCaptalize = () => {
    let str = input?.split(" ");
    let result = str?.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    });

    setInput(result.join(" "));
    ref.current.focus();
  };

  const removeSpace = () => {
    let spaceRemovedWrd = input.split(" ").filter((item) => !item =="");
    setInput(spaceRemovedWrd.join(" "));
    ref.current.focus();
  };
  useEffect(() => {
    let pureWrd = input.split(" ").filter((item) => !item === "").length;
    setWords(pureWrd);
    setChar(input.trim().split("").length);
  }, [input]);

  return (
    <div className="container">
      <div className="p_name">
        <h2>Word Counter</h2>
      </div>
      <Alert className="alert-Msg" show={show} variant="success">
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>You have succesfully copied the text</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert>
      <div className="wrapper">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={7}
              placeholder="Type here"
              ref={ref}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Form.Group>
        </Form>
        <nav>
          <ul>
            <li>
              <button onClick={handleClipboard}>
                Copy <AiFillCopy />
              </button>
            </li>
            <li>
              <button onClick={convertToUpperCase}>
                Uppercase <RxLetterCaseUppercase />
              </button>
            </li>
            <li>
              <button onClick={convertToLowerCase}>
                Lowercase <RxLetterCaseLowercase />
              </button>
            </li>
            <li>
              <button onClick={convertToCaptalize}>
                Captalize
                <RxLetterCaseCapitalize />
              </button>
            </li>
            <li>
              <button onClick={removeSpace}>
                Remove space
                <IoIosRemoveCircle />
              </button>
            </li>
            <li>
              <button>{words} Words</button>
            </li>
            <li>
              <button>{char} Characters</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
