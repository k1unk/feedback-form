import './App.css';
import InputMask from "react-input-mask"
import {useState} from "react";

function FeedBackForm({setFormIsOpened, phone, setPhone, name, setName, message, setMessage, setResultIsTrue}) {
    let [phoneErr, setPhoneErr] = useState('')
    let [nameErr, setNameErr] = useState('')
    let [messageErr, setMessageErr] = useState('')

    let submitFeedback = () => {
        let phoneIsValid = checkPhone()
        let nameIsValid = checkName()
        let messageIsValid = checkMessage()
        if (phoneIsValid && nameIsValid && messageIsValid) {
            setFormIsOpened(false)
            setResultIsTrue(true)
        }
    }

    let checkPhone = () => {
        if (phone.length === 0) {
            setPhoneErr('This field must be filled')
            return false
        }
        let phoneValueIndexes = [4, 5, 6, 9, 10, 11, 13, 14, 16, 17]
        let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        for (let i = 0; i < phoneValueIndexes.length; i++) {
            if (!numbers.includes(phone[phoneValueIndexes[i]])) {
                setPhoneErr('This field must be filled')
                return false
            }
        }
        setPhoneErr('')
        return true
    }

    let checkName = () => {
        if (name.length < 2) {
            setNameErr('Name must be longer then 1 character')
            return false
        }
        if (/[^a-zA-Z]/.test(name)) {
            setNameErr('Name must have only letters')
            return false
        }
        setNameErr('')
        return true
    }

    let checkMessage = () => {
        if (message.length === 0) {
            setMessageErr("Message shouldn't be empty")
            return false
        }
        setMessageErr('')
        return true
    }

    return (
        <div className="feedback-form">
            <div className="feedback-form-content">
                <div className="feedback-close">
                    <button onClick={() => setFormIsOpened(false)}>X</button>
                </div>
                <div className="feedback-phone feedback-item">
                    <p className="feedback-phone__title feedback-item__title">Phone:</p>
                    <InputMask
                        type="tel"
                        mask="+7 (999) 999-99-99"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <div className="feedback-phone__err feedback-item__err">
                        {phoneErr && <p>{phoneErr}</p>}
                    </div>
                </div>
                <div className="feedback-name feedback-item">
                    <p className="feedback-name__title feedback-item__title">Name:</p>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="feedback-name__err feedback-item__err">
                        {nameErr && <p>{nameErr}</p>}
                    </div>
                </div>
                <div className="feedback-message feedback-item">
                    <p className="feedback-message__title feedback-item__title">Message:</p>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="feedback-message__err feedback-item__err">
                        {messageErr && <p>{messageErr}</p>}
                    </div>
                </div>
                <button className="feedback-submit" onClick={submitFeedback}>Отправить</button>
            </div>

        </div>
    );
}

export default FeedBackForm;
