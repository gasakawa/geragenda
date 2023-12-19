import * as errorMessages from '@/common/messages/error-messages.json';
import global from '@/global';
export const getErrorMessage = (module: string, key: string) => {
  if (errorMessages[module] && errorMessages[module][global.lang][key])
    return errorMessages[module][global.lang][key];

  return errorMessages.default[global.lang]['DefaultMessage'];
};
