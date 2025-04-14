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
        <div className="emoji-keyboard">
            {Object.entries(emojiCategories).map(([category, emojis]) => (
                <EmojiCategory
                    key={category}
                    category={category}
                    emojis={emojis}
                    handleInputButtonClick={handleInputButtonClick}
                />
            ))}
        </div>
    );
}

/**
 * EmojiCategory Component
 * Renders a single emoji category with its emojis.
 *
 * Props:
 * - category: The name of the emoji category.
 * - emojis: Array of emojis in the category.
 * - handleInputButtonClick: Function to handle emoji button clicks.
 */
function EmojiCategory({ category, emojis, handleInputButtonClick }) {
    return (
        <div className="emoji-category">
            <h3 className="emoji-category-title">{category}</h3>
            <EmojiList emojis={emojis} handleInputButtonClick={handleInputButtonClick} />
        </div>
    );
}

/**
 * EmojiList Component
 * Renders a list of emoji buttons.
 *
 * Props:
 * - emojis: Array of emojis to display.
 * - handleInputButtonClick: Function to handle emoji button clicks.
 */
function EmojiList({ emojis, handleInputButtonClick }) {
    return (
        <div className="emoji-list">
            {emojis.map((emoji, index) => (
                <EmojiButton key={index} emoji={emoji} handleInputButtonClick={handleInputButtonClick} />
            ))}
        </div>
    );
}

/**
 * EmojiButton Component
 * Renders a single emoji button.
 *
 * Props:
 * - emoji: The emoji to display.
 * - handleInputButtonClick: Function to handle emoji button clicks.
 */
function EmojiButton({ emoji, handleInputButtonClick }) {
    return (
        <button className="emoji-button" onClick={() => handleInputButtonClick(emoji)}>
            {emoji}
        </button>
    );
}

export default EmojiKeyBoard;