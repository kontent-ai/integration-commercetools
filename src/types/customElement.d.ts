type ElementInfo = Readonly<{
  config: Readonly<Record<string, unknown>> | null;
  disabled: boolean;
  value: string;
}>

declare const CustomElement: {
  setHeight: (height: number) => void;
  init: (callback: (element: ElementInfo) => void) => void;
  onDisabledChanged: (callback: (isDisabled: boolean) => void) => void;
  setValue: (newValue: string | null) => void;
};
