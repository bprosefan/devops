import "./Button.css";

const Button = ({ type = "default", text, onClick }) => {
  return (
    <button className={`Button Button_${type}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
