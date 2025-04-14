import { useState, useEffect, useReducer } from "react";
import KeyBoardLanguage from "./KeyBoardLanguage";
import Screen from "./Screen";
import KeyBoard from "./KeyBoard";
import LetterStyle from "./letterStyle";
import { getLanguage } from "./LanguagesData";
import "./KeyBoardStylee.css";
import EmojiKeyBoard from "./EmojiKeyBoard";


const intialLanguage = getLanguage("english");
const initialState = {
    iso_639_2: intialLanguage.iso_639_2,
    languageName: intialLanguage.languageName,
    translatedName: intialLanguage.translatedName,
    keyList: intialLanguage.keyList,
    placeholder: intialLanguage.placeholder,
    currentStyle: new LetterStyle(),
    stack: [[]],
    emojiActive: false,
    isUndo: false,
    isRedo: false,
    redoStack: [],
};

const highlightClickedButtons = (char) => {
    const buttons = document.querySelectorAll('.k_b button');
    buttons.forEach((button) => {
        if (button.textContent.toLowerCase() === char) {
            button.classList.add('highlighted');
            setTimeout(() => {
                button.classList.remove('highlighted');
            }, 250);
        }
    });
};
const reducer = (state, action) => {
    let newStack = [...state.stack];
    switch (action.type) {
        case "changeLanguage":
            const newLanguage = getLanguage(action.language) || intialLanguage;
            return {
                ...state,
                iso_639_2: newLanguage.iso_639_2,
                languageName: newLanguage.languageName,
                translatedName: newLanguage.translatedName,
                keyList: newLanguage.keyList,
                placeholder: newLanguage.placeholder,
            };
        case "deleteLastChar":

            let temp = structuredClone(newStack) 
            temp[temp.length - 1].pop()
           
            newStack.push(temp[temp.length - 1])
    
            return {
                ...state,
                isUndo: true,
                stack: newStack,
            }
        case "changeAllText":
 
            const { itemFunction } = action;
            const lastItemIndex = state.stack.length - 1;
            if (lastItemIndex >= 0) {
                const lastItem = state.stack[lastItemIndex];
                const modifiedLastItem = lastItem.map((item) => ({
                    ...itemFunction(item),
                }));
                return {
                    ...state,
                    stack: [...state.stack, modifiedLastItem],
                    isUndo: true,
                };
            }
            return state;
        case "inputButtonClick":
            const char = action.char;
            if (newStack.length !== 0) {
                const lastState = [...newStack[newStack.length - 1]];
                lastState.push({ char: char, style: { ...state.currentStyle } });
                newStack.push(lastState);
            } else {
                newStack.push([{ char: char, style: { ...state.currentStyle } }]);
            }
            highlightClickedButtons(char);
            return {
                ...state,
                stack: newStack,
                isUndo: true,
            };
        case "toggleEmojiActive":
            return {
                ...state,
                emojiActive: !state.emojiActive
            }


        case "undoPrev":
            state.redoStack.push(newStack.pop());
            return {
                ...state,
                stack: newStack,
                isUndo: newStack.length >= 1,
                isRedo: true,
            };
        case "paste":
            console.log(action.text);
            newStack.push(action.text);
            return {
                ...state,
                stack: newStack,
                isUndo: true,
            }
        case "deleteAll":
            if (newStack.length) {
                let lastState = [{ char: "", style: { ...state.currentStyle } }];
                newStack.push(lastState);
            }
            return {
                ...state,
                stack: newStack
            }
        case "redo":
            let lastItem = state.redoStack.pop();
            newStack.push(lastItem);
            return {
                ...state,
                isRedo: state.redoStack.length !== 0,
                stack: newStack,
                redoStack: state.redoStack

            }
        case "updateCurrentStyle":
            return {
                ...state,
                currentStyle: action.newStyle,
            }

        default:
            return state;
    }
};
function VirtualKeyBoard() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { iso_639_2, language, keyList, placeholder, currentStyle, stack, emojiActive, isUndo, isRedo, redoStack } = state;
    const [isShift, setisShift] = useState(false);

    const toggleEmojiActive = () => {
        dispatch({ type: "toggleEmojiActive" });
    };

    const deleteLastChar = () => {
        dispatch({ type: "deleteLastChar" });
    };

    function changeLanguage(language) {
        dispatch(
            {
                type: "changeLanguage",
                language: language
            }
        )
    }

    function handleInputButtonClick(char) {
        dispatch(
            {
                type: "inputButtonClick",
                char: char
            }
        )
    }

    const handleEvent = (event) => {
        switch (event) {
            case "deleteAll":
                deleteAll();
                break;
            case "undo":
                undoPrev();
                break;
            case "redo":
                redo();
                break;
            case "backspace":
                deleteLastChar();
                break;
            case "copy":
                handleCopy();
                break;
            case "paste":
                paste();
                break;
            default:
                break;
        }
    };



    useEffect(() => {
        const handleKeyDown = (event) => {

            const isAlphanumeric =
                (event.keyCode >= 48 && event.keyCode <= 90) ||
                (event.keyCode >= 96 && event.keyCode <= 105) ||
                event.keyCode === 32 || // space
                event.keyCode === 13 ||// enter
                event.keyCode === 8; // backspace

            if (isAlphanumeric) {
                let char;
                if (event.keyCode === 32) {
                    char = '\xa0';

                    const spaces = document.querySelectorAll('.key-spc');

                    spaces.forEach((space) => {
                        space.classList.add('highlighted');
                        setTimeout(() => {
                            space.classList.remove('highlighted');
                        }, 300);
                    });

                } else if (event.keyCode === 8) {
                    handleEvent('backspace');
                    const backspaces = document.querySelectorAll('.key-bspc');
                    backspaces.forEach((backspace) => {
                        backspace.classList.add('highlighted');
                        setTimeout(() => {
                            backspace.classList.remove('highlighted');
                        }, 300);
                    });


                } else if (event.keyCode === 13) {
                    char = '\n'; // enter

                    const enters = document.querySelectorAll('.key-return');

                    enters.forEach((enter) => {
                        enter.classList.add('highlighted');
                        setTimeout(() => {
                            enter.classList.remove('highlighted');
                        }, 300);
                    });

                } else {
                    char = String.fromCharCode(event.keyCode).toLowerCase();
                }
                if (event.keyCode != 8) {
                    handleInputButtonClick(char);
                }

                highlightClickedButtons(char);
            }

        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleEvent]);
    
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
                    language={language}
                    keyList={keyList}
                    setisShift={setisShift}
                    isShift={isShift}
                    handleButtonClick={handleInputButtonClick}
                    handleEvent={handleEvent}
                />
            )}

        </div>
    );
}
export default VirtualKeyBoard;