import { saveState, loadState } from '../utils/localstorage';

export const initialState = {
  darkMode: false,
  showContentsOnTaskBoard: true,
  enableConfettiAnimation: true,
  loaded: false
};

export const setDarkMode = (settingsStore) => (darkMode) => {
  settingsStore.setState({ ...settingsStore.state, darkMode });
};

export const loadSettingsFromLocalStorage = (settingsStore) => () => {
  // Set state to data from localstorage
  settingsStore.setState({ ...loadState('settings'), loaded: true });
};

export const saveSettingsToLocalStorage = (settingsStore) => () => {
  // Save state to localstorage
  saveState(settingsStore.state, 'settings');
};
