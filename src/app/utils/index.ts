import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from '../services/local-storage.service';

export const checkIfButtonElement = (
  element: any,
): element is HTMLButtonElement => {
  return element.tagName.toLowerCase() === 'button';
};

export const debounce = (fn: any, delay: number) => {
  let timerId: any;
  return (...args: any[]) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => fn(...args), delay);
  };
};

export function isTokenExpired(localStorageService: LocalStorageService) {
  try {
    const token = localStorageService.getItem('accessToken');

    if (!token) return true;

    const decodedToken = jwtDecode(token);

    if (!decodedToken.exp) return true;

    const expDate = new Date(decodedToken.exp * 1000);
    const isExpired = expDate.getTime() <= Date.now();

    return isExpired;
  } catch {
    return true;
  }
}
