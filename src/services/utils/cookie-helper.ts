interface ISetCookieOptions {
  path?: string;
  expires?: Date | string | number;
}

export const getCookie = (name: string): string | undefined => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
    
export const setCookie = (name: string, value: string, options: ISetCookieOptions = {}) => {
  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey as 'path' | 'expires'];
    if (!optionValue) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}
    
export const deleteCookie = (name: string): void => {
  setCookie(name, '', { expires: -1 });
}
