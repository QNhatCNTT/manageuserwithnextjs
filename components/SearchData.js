import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

function SearchData({ placeholder, ...props }) {
  const styles = {
    marginBottom: 10,
    width: 400,
    float: "right",
  };
  return (
    <InputGroup {...props} inside style={styles}>
      <Input placeholder={placeholder} />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>
  );
}

export default SearchData;
