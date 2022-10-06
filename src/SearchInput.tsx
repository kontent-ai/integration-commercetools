import { FC, SyntheticEvent, useState } from "react";
import { Dropdown } from './Dropdown';

type Props = Readonly<{
  isDisabled: boolean;
  onSubmit: (searchString: string) => void;
  onClear: () => void;
  languages: ReadonlyArray<string>;
  selectedLanguage: string;
  onChangeSelectedLanguage: (language: string) => void;
}>;

export const SearchInput: FC<Props> = props => {
  const [searchString, setSearchString] = useState('');

  const submit = props.isDisabled
    ? undefined
    : (e: SyntheticEvent) => {
      e.preventDefault();
      props.onSubmit(searchString);
    };
  const clear = () => {
    props.onClear();
    setSearchString('');
  }

  return (
    <form className="search-form" onSubmit={submit}>
      <input
        className="search-term text-field__input"
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
        disabled={props.isDisabled}
      />
      <Dropdown
        className="search-form__dropdown"
        options={props.languages}
        selectedOption={props.selectedLanguage}
        getOptionId={identity}
        getOptionName={identity}
        onSelectedOptionChange={props.onChangeSelectedLanguage}
        maxDropdownHeight={120}
      />
      <span className="btn-wrapper">
        <button
          className="btn btn--primary"
          onClick={submit}
          type="submit"
          disabled={props.isDisabled}
        >
          Search
        </button>
      </span>
      <span className="btn-wrapper">
        <button
          className="btn btn--secondary"
          onClick={clear}
          type="reset"
          disabled={props.isDisabled}
        >
          Clear search
        </button>
      </span>
    </form>
  );
};

SearchInput.displayName = 'SearchInput';

const identity = <T extends unknown>(v: T) => v;
