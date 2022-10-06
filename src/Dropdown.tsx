import { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

type Props<Option> = Readonly<{
  options: ReadonlyArray<Option>;
  selectedOption: Option;
  getOptionId: (o: Option) => string;
  getOptionName: (o: Option) => string;
  onSelectedOptionChange: (newSelectedOption: Option) => void;
  className?: string;
  maxDropdownHeight?: number;
}>;

export const Dropdown = <Option extends unknown>(props: Props<Option>) => {
  const [focusedOption, setFocusedOption] = useState<Option>(props.options[0] ?? props.selectedOption);
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setIsDropdownOpen(true);
    }
    return () => setIsDropdownOpen(false);
  }, [isFocused]);

  const { getOptionId } = props;
  const moveFocus = useCallback((moveBy: number) => {
    const newFocusedOption = moveFocusedOption(props.options, getOptionId, focusedOption, moveBy);
    if (!newFocusedOption) {
      return;
    }
    document.getElementById(getOptionId(newFocusedOption))?.scrollIntoView({ block: 'nearest' });
    setFocusedOption(newFocusedOption);
  }, [props.options, getOptionId, focusedOption]);

  const moveFocusDown = useCallback(() => moveFocus(1), [moveFocus]);
  const moveFocusUp = useCallback(() => moveFocus(-1), [moveFocus]);

  const selectOption = (o: Option) => {
    setIsDropdownOpen(false);
    props.onSelectedOptionChange(o);
  };

  const onEnter = () => isDropdownOpen
    ? selectOption(focusedOption)
    : setIsDropdownOpen(true);

  useHotkeys('enter', preventDefaultAnd(onEnter), { enabled: isFocused }, [props.onSelectedOptionChange, focusedOption, isDropdownOpen]);
  useHotkeys('up', preventDefaultAnd(moveFocusUp), { enabled: isFocused }, [moveFocusUp]);
  useHotkeys('down', preventDefaultAnd(moveFocusDown), { enabled: isFocused }, [moveFocusDown]);

  return (
    <div className={props.className} style={{ position: 'relative' }}>
      <div
        className="combo-box"
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseDown={() => setIsDropdownOpen(prev => !prev)}
      >
        <div className="dropdown-selected">
          <div className="dropdown-selected__pane">
            <div className="dropdown-selected__text" title={props.getOptionName(props.selectedOption)}>
              {props.getOptionName(props.selectedOption)}
            </div>
            <div className="dropdown-selected__item-icon">
              <i className={`icon-chevron-${isDropdownOpen ? 'up' : 'down'}`} />
            </div>
          </div>
        </div>
      </div>
      {isDropdownOpen && (
        <div
          className="dropdown-options"
          style={{ position: 'absolute', top: '105%' }}
          onMouseDown={e => e.preventDefault()}
        >
          <div className="dropdown-options__pane" style={{ maxHeight: props.maxDropdownHeight }}>
            <div className="dropdown-options-group">
              {props.options.map(option => (
                <div
                  key={props.getOptionId(option)}
                  id={props.getOptionId(option)}
                  className={`
                    dropdown-option
                    ${props.getOptionId(option) === props.getOptionId(props.selectedOption) ? 'dropdown-option--is-selected' : ''}
                    ${props.getOptionId(option) === props.getOptionId(focusedOption) ? 'dropdown-option--is-highlighted' : ''}
                  `}
                  onClick={() => selectOption(option)}
                >
                  <div className="dropdown-option__pane">
                    <div className="dropdown-option__name">
                      {props.getOptionName(option)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';

const moveFocusedOption = <Option extends unknown>(allOptions: ReadonlyArray<Option>, getOptionId: (o: Option) => string, focusedOption: Option, moveBy: number): Option | null => {
  const focusedIndex = allOptions.findIndex(o => getOptionId(o) === getOptionId(focusedOption));
  if (focusedIndex < 0) {
    return allOptions[0] ?? null;
  }

  const moved = focusedIndex + moveBy;

  return allOptions[(allOptions.length + moved) % allOptions.length] ?? null;
};

const preventDefaultAnd = (fnc: () => void) => (e: { readonly preventDefault: () => void }) => {
  e.preventDefault();
  fnc();
};
