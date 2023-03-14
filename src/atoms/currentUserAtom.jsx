import { atom } from 'jotai';

export const CurrentUserAtom = atom(null);

export function setAuthToken(token) {
  authTokenAtom.set(token);
}

export function clearAuthToken() {
  authTokenAtom.set(null);
}