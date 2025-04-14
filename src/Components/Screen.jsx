import '../css/KeyBoardStylee.css';

/**
 * Screen Component
 * Displays the text content of the virtual keyboard, either as plain text or styled characters.
 *
 * Props:
 * - text: The content to display. It can be:
 *   - An array of objects, where each object represents a character with optional styles (e.g., `{ char: 'A', style: { color: 'red' } }`).
 *   - A plain string to display as-is.
 *
 * Functionality:
 * - If `text` is an array, it maps over the array and renders each character with its associated style.
 * - If `text` is a string, it renders the string directly.
 * - Handles newline characters (`\n`) in the array by rendering a `<br />` element.
 */
function Screen(props) {
  const text = props.text;

  if (Array.isArray(text)) {
    return (
      <div className="DivTextArea" aria-label="Text Area" id="textbox1_freetext" role="textbox" tabIndex="0">
        { text.map((item,index) => item.char === "\n" ? <br key={index}/> : <span key={index} style={item.style}>{item.char}</span> )}
      </div>
    );
  } else {
    return (
      <div className="DivTextArea" aria-label="Text Area" id="textbox1_freetext" role="textbox" tabIndex="0">
        {text}
      </div>
    );
  }
}

export default Screen;