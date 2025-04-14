import { useEmojiData } from "./data/useEmojiData";

/**
 * EmojiKeyBoard Component
 * Displays a virtual emoji keyboard with categories and emojis.
 *
 * Props:
 * - handleInputButtonClick: Function to handle emoji button clicks (receives the emoji as an argument).
 *
 * Functionality:
 * - Fetches emoji categories and their emojis using the `useEmojiData` hook.
 * - Renders each category with its corresponding emojis.
 * - Allows users to click on an emoji button, triggering the `handleInputButtonClick` function.
 */
function EmojiKeyBoard({ handleInputButtonClick }) {
    const emojiCategories = useEmojiData();

    return (
        <div className='emoji-keyboard'>
            {Object.entries(emojiCategories).map(([category, emojis]) => (
                <div key={category}>
                    <h3>{category}</h3>
                    {emojis.map((emoji, index) => (
                        <button key={index} onClick={() => handleInputButtonClick(emoji)}>
                            {emoji}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default EmojiKeyBoard;