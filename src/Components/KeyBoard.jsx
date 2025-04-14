import '../css/KeyBoardStylee.css';



// List of non-literal keys
const nonLiterals = [
  'key-bspc',
  'key-caps',
  'key-tab',
  'key-return',
  'key-lshift',
  'key-rshift',
  'key-lalt',
  'key-ralt',
  'key-lwin',
  'key-rwin',
  'key-lctrl',
  'key-rctrl',
  'key-spc',
];

// Helper function to render non-literal keys
function renderNonLiteralKey(item, index, props, displayText) {
  const { handleEvent, handleButtonClick, setisShift, isShift } = props;

  const keyActions = {
    'key-bspc': () => handleEvent('backspace'),
    'key-caps': () => setisShift(!isShift),
    'key-lshift': () => setisShift(!isShift),
    'key-rshift': () => setisShift(!isShift),
    'key-return': () => handleButtonClick('\n'),
    'key-spc': () => handleButtonClick('\xa0'),
    'key-tab': () => handleButtonClick('\u00A0\u00A0\u00A0\u00A0'),
  };

  const action = keyActions[item[0]];

  return (
    <div key={index} className={`key ${item[0]}`} onClick={action}>
      {displayText}
    </div>
  );
}

// Helper function to render literal keys
function renderLiteralKey(item, index, props, displayText) {
  return (
    <div
      key={index}
      className={`key ${item[0]}`}
      onClick={() => props.handleButtonClick(displayText)}
    >
      {displayText}
    </div>
  );
}

/**
 * KeyBoard Component
 * Renders a virtual keyboard based on the provided language and key list.
 *
 * Props:
 * - langCode: The language code for the keyboard layout (e.g., "en", "fr").
 * - keyList: An array of rows, where each row is an array of key definitions.
 * - isShift: A boolean indicating whether the Shift key is active.
 * - setisShift: A function to toggle the Shift key state.
 * - handleButtonClick: A function to handle button clicks (receives the character as an argument).
 * - handleEvent: A function to handle special key events (e.g., backspace, tab).
 */
function KeyBoard(props) {
  const { langCode, keyList, isShift } = props;

  // Helper function to render a row of keys
  const renderRow = (row, rowIndex) => (
    <div key={rowIndex} className="d-flex justify-center">
      {row.map((item, index) => {
        const displayText = isShift ? item[2] || item[1] : item[1];
        return nonLiterals.includes(item[0])
          ? renderNonLiteralKey(item, index, props, displayText)
          : renderLiteralKey(item, index, props, displayText);
      })}
    </div>
  );

  return (
    <div id="vk-board" className={`lang-${langCode}`}>
      {keyList && keyList.map(renderRow)}
    </div>
  );
}

export default KeyBoard;