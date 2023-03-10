import './App.css';
import FeedBackForm from "./FeedbackForm";
import {useState} from "react";

function App() {
    let [formIsOpened, setFormIsOpened] = useState(false)
    let [resultIsTrue, setResultIsTrue] = useState(false)
    let [phone, setPhone] = useState('')
    let [name, setName] = useState('')
    let [message, setMessage] = useState('')

    let download = () => {
        let phoneStr = ''
        let phoneValueIndexes = [0, 1, 4, 5, 6, 9, 10, 11, 13, 14, 16, 17]
        for (let i = 0; i < phoneValueIndexes.length; i++) {
            phoneStr += phone[phoneValueIndexes[i]]
        }

        let blob = new Blob([`{"phone":"${phoneStr}","name":"${name}","message":"${message}"}`], {type: "text/plain"});
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "anyName.json";
        a.click();
    }
    return (
        <div className="wrapper">
            <p className="open-form__text">Click the button to open form</p>
            <button className="open-form__button" onClick={() => setFormIsOpened(true)}>Open!</button>
            {
                formIsOpened &&
                <FeedBackForm
                    setFormIsOpened={setFormIsOpened}
                    setResultIsTrue={setResultIsTrue}
                    phone={phone}
                    setPhone={setPhone}
                    name={name}
                    setName={setName}
                    message={message}
                    setMessage={setMessage}
                />
            }
            {
                resultIsTrue &&
                <div className="result">
                    <p>Success! You can download your file:</p>
                    <button onClick={download}>download</button>
                </div>
            }
        </div>
    );
}


export default App;
