import { useState } from "react";
import KeyBoardLanguage from "./KeyBoardLanguage";
import Screen from "./Screen";
import KeyBoard from "./KeyBoard";
import { getLanguage } from "./data/LanguagesData";
import "../css/KeyBoardStylee.css";
import EmojiKeyBoard from "./EmojiKeyBoard";

// Initial language setup
const initialLanguage = getLanguage("english");

function VirtualKeyBoard() {
    const [iso_639_2, setIso6392] = useState(initialLanguage.iso_639_2);
    const [languageName, setLanguageName] = useState(initialLanguage.languageName);
    const [translatedName, setTranslatedName] = useState(initialLanguage.translatedName);
    const [keyList, setKeyList] = useState(initialLanguage.keyList);
    const [placeholder, setPlaceholder] = useState(initialLanguage.placeholder);
    const [stack, setStack] = useState([[]]);
    const [emojiActive, setEmojiActive] = useState(false);
    const [isShift, setIsShift] = useState(false);

    // Toggle emoji keyboard state
    const toggleEmojiActive = () => {
        setEmojiActive((prev) => !prev);
    };

    // Delete the last character from the stack
    const deleteLastChar = () => {
        setStack((prevStack) => {
            const newStack = [...prevStack];
            const lastItem = [...newStack[newStack.length - 1]];
            lastItem.pop();
            newStack[newStack.length - 1] = lastItem;
            return newStack;
        });
    };

    // Change the language of the keyboard
    const changeLanguage = (language) => {
        const newLanguage = getLanguage(language) || initialLanguage;
        setIso6392(newLanguage.iso_639_2);
        setLanguageName(newLanguage.languageName);
        setTranslatedName(newLanguage.translatedName);
        setKeyList(newLanguage.keyList);
        setPlaceholder(newLanguage.placeholder);
    };

    // Handle input button clicks
    const handleInputButtonClick = (char) => {
        setStack((prevStack) => {
            const newStack = [...prevStack]; // Copy the previous stack
            const lastItem = [...newStack[newStack.length - 1]]; // 
            lastItem.push({ char, style: {} });
            newStack[newStack.length - 1] = lastItem;
            return newStack;
        });
    };

    // Handle special key events
    const handleEvent = (event) => {
        if (event === "backspace") {
            deleteLastChar();
        }
    };


    return (
        <div className="main-container">
            <div className="change_layout">
                <KeyBoardLanguage
                    setLanguage={changeLanguage}
                    changeState={toggleEmojiActive}
                    isEmojiActive={emojiActive}
                />
            </div>
            <div className="screenDiv">
                <Screen
                    text={
                        stack.length && stack[stack.length - 1].length
                            ? stack[stack.length - 1]
                            : placeholder
                    }
                />
            </div>
            {emojiActive ? (
                <EmojiKeyBoard handleInputButtonClick={handleInputButtonClick} />
            ) : (
                <KeyBoard
                    langCode={iso_639_2}
                    language={languageName}
                    keyList={keyList}
                    setisShift={setIsShift}
                    isShift={isShift}
                    handleButtonClick={handleInputButtonClick}
                    handleEvent={handleEvent}
                />
            )}
        </div>
    );
}

export default VirtualKeyBoard;