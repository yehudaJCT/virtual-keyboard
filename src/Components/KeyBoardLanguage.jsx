import { FaKeyboard } from "react-icons/fa";
import "../css/KeyBoardStylee.css";
import languagesData from "./data/LanguagesData";
import emojiButton from "../assets/images/emojiButton.webp";
import React from 'react';

/**
 * KeyBoardLanguage Component
 * Allows the user to select a keyboard language and toggle between the emoji keyboard and the virtual keyboard.
 *
 * Props:
 * - setLanguage: Function to update the selected language.
 * - isEmojiActive: Boolean indicating whether the emoji keyboard is active.
 * - changeState: Function to toggle between the emoji keyboard and the virtual keyboard.
 *
 * Functionality:
 * - Renders a dropdown menu for selecting a language.
 * - Displays a button to toggle between the emoji keyboard and the virtual keyboard.
 * - The button icon changes based on the `isEmojiActive` prop.
 */
function KeyBoardLanguage(props) {
  const setLanguage = props.setLanguage;
  const handleChange = (event) =>  setLanguage(event.target.value);
  return (
    <div className='language-and-icons'>
      <select className='chooseLanguage' onChange={handleChange}>
        {languagesData.map((languege, index) => (
          <option key={index} value={languege.languageName}>
            {languege.translatedName}
          </option>
        ))}
      </select>
      {props.isEmojiActive ? (

        <button className="icon" onClick={props.changeState}>
          <FaKeyboard 
            size={50}
            alt='virtual Keyboard'
          />
        </button>
      ) : (
        <button className='icon' onClick={props.changeState}>
          <img src={emojiButton} alt='Emoji Keyboard' />
        </button>
      )}
    </div>
  );
}

export default KeyBoardLanguage;
