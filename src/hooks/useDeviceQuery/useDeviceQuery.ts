import { useMediaQuery } from './useMediaQuery';

export const useDeviceQuery = () => {
  const device = {
    isBigScreen: useMediaQuery('(min-device-width:1824px)'),
    isMediumScreen: useMediaQuery('(min-device-width:1280px)'),
    isSmallScreen: useMediaQuery('(max-width:1280px)'),
    isMobileScreen: useMediaQuery('(max-width:600px)'),
    isTabletScreen: useMediaQuery('(min-device-width:768px)'),
    isPhoneScreen: useMediaQuery('(max-width:600px)'),
    isPortrait: useMediaQuery('(orientation:portrait)'),
    isLandscape: useMediaQuery('(orientation:landscape)'),
    isTabletPortrait: useMediaQuery(
      '(min-device-width:768px) and (orientation:portrait)'
    ),
    isTabletLandscape: useMediaQuery(
      '(min-device-width:768px) and (orientation:landscape)'
    ),
    isPhonePortrait: useMediaQuery(
      '(max-width:600px) and (orientation:portrait)'
    ),
    isPhoneLandscape: useMediaQuery(
      '(max-width:600px) and (orientation:landscape)'
    ),
  };

  return device;
};

export default useDeviceQuery;
