import { useCallback, useEffect, useState } from 'react';

type Params<Config> = Readonly<{
  isValidConfig: (v: unknown) => v is Config;
  minHeight: number;
  paddingBottom: number;
  processValue: (value: string, config: Config, setConfig: (c: Config) => void) => void;
}>;

export const useCustomElement = <Config>(params: Params<Config>) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [config, setConfig] = useState<null | Config>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const updateSize = useCallback(() => {
    const newSize = Math.max(document.documentElement.offsetHeight, params.minHeight) + params.paddingBottom;

    CustomElement.setHeight(Math.ceil(newSize));
  }, [params.minHeight, params.paddingBottom]);

  const updateValue = useCallback((value: unknown) => {
    // send null instead of [] so that the element fails validation when it should not be empty
    CustomElement.setValue(!Array.isArray(value) || value.length ? JSON.stringify(value) : null);
  }, []);

  const { processValue, isValidConfig } = params;
  useEffect(() => {
    if (isInitialized) {
      return;
    }
    CustomElement.init((el) => {
      const newConfig = el.config;
      if (!isValidConfig(newConfig)) {
        throw new Error('Invalid custom element configuration. Please check the documentation.');
      }

      processValue(el.value, newConfig, setConfig);
      setConfig(newConfig);
      setIsDisabled(el.disabled);
      updateSize();
      setIsInitialized(true);
    });
  });

  useEffect(() => {
    CustomElement.onDisabledChanged(setIsDisabled);
  }, []);

  useEffect(() => {
    const listener = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth !== window.innerWidth) {
        updateSize();
      }
    };
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [updateSize, windowWidth]);

  return {
    updateSize,
    updateValue,
    isDisabled,
    config,
  };
};
