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
            const newStack = [...prevStack];
            const lastItem = [...newStack[newStack.length - 1]];
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

    // Handle keydown events (replacing useEffect)
    const handleKeyDown = (event) => {
        const isAlphanumeric =
            (event.keyCode >= 48 && event.keyCode <= 90) ||
            (event.keyCode >= 96 && event.keyCode <= 105) ||
            event.keyCode === 32 || // space
            event.keyCode === 13 || // enter
            event.keyCode === 8; // backspace

        if (isAlphanumeric) {
            let char;
            if (event.keyCode === 32) {
                char = "\xa0"; // space
                document.querySelectorAll(".key-spc").forEach((space) => {
                    space.classList.add("highlighted");
                    setTimeout(() => space.classList.remove("highlighted"), 300);
                });
            } else if (event.keyCode === 8) {
                handleEvent("backspace");
                document.querySelectorAll(".key-bspc").forEach((backspace) => {
                    backspace.classList.add("highlighted");
                    setTimeout(() => backspace.classList.remove("highlighted"), 300);
                });
            } else if (event.keyCode === 13) {
                char = "\n"; // enter
                document.querySelectorAll(".key-return").forEach((enter) => {
                    enter.classList.add("highlighted");
                    setTimeout(() => enter.classList.remove("highlighted"), 300);
                });
            } else {
                char = String.fromCharCode(event.keyCode).toLowerCase();
            }

            if (event.keyCode !== 8) {
                handleInputButtonClick(char);
            }
        }
    };

    // Add and remove event listeners manually
    window.addEventListener("keydown", handleKeyDown);
    window.removeEventListener("keydown", handleKeyDown);

    return (
        <div className="main-container">
            <div className="screenDiv">
                <div className="change_layout">
                    <KeyBoardLanguage
                        setLanguage={changeLanguage}
                        changeState={toggleEmojiActive}
                        isEmojiActive={emojiActive}
                    />
                </div>
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