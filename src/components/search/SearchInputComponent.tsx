import { FC, useState } from "react";
import { useBlogGlobalContext } from "../../context/BlogGlobalContextProvider";
import {
  helloMessage,
  searchButtonTitle,
  searchInputPlaceholder,
} from "../../utils/utilMessages";
import withHelloMessageLoader from "../util/withHelloMessageLoader";
import ButtonComponent from "../button/ButtonComponent";
import "./SearchInputComponent.css";

const SearchInput: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { toggleSearchActive, searchTerm } = useBlogGlobalContext();
  
  return (
    <div className="search-input">
      <input
        disabled={!!searchTerm}
        value={inputValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleSearchActive(inputValue);
            setInputValue("");
          }
        }}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder={searchInputPlaceholder}
      />

      <div className="search-submit">
        <ButtonComponent
          disabled={!!searchTerm}
          message={helloMessage}
          title={searchButtonTitle}
          onClick={() => {
            toggleSearchActive(inputValue);
            setInputValue("");
          }}
        />
      </div>
    </div>
  );
};
const SearchInputComponent = withHelloMessageLoader(
  SearchInput,
  SearchInput.name as string
);
export default SearchInputComponent;
