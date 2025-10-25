import { v4 as uuidv4 } from 'uuid';

const CLIENT_ID_KEY = 'client_id';

/**
 * Gets the client UUID from localStorage.
 * If it doesn't exist, generates a new one and stores it.
 * @returns The client UUID
 */
export const getClientId = (): string => {
  let clientId = localStorage.getItem(CLIENT_ID_KEY);
  
  if (!clientId) {
    clientId = uuidv4();
    localStorage.setItem(CLIENT_ID_KEY, clientId);
  }
  
  return clientId;
};

/**
 * Initializes the client ID in localStorage if it doesn't exist.
 * This is useful to call early in the app lifecycle.
 * @returns The client UUID
 */
export const initializeClientId = (): string => {
  return getClientId();
};

/**
 * Clears the stored client ID from localStorage.
 * A new one will be generated on the next call to getClientId().
 */
export const clearClientId = (): void => {
  localStorage.removeItem(CLIENT_ID_KEY);
};

/**
 * Checks if a client ID exists in localStorage.
 * @returns true if a client ID exists, false otherwise
 */
export const hasClientId = (): boolean => {
  return localStorage.getItem(CLIENT_ID_KEY) !== null;
};

