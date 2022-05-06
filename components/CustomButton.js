import { Button } from "rsuite";

function CustomButton({ value, style, onClick, ...props }) {
  return (
    <Button appearance="primary" onClick={onClick} style={style}>
      {value}
    </Button>
  );
}

export default CustomButton;
