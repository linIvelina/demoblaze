/**
 * Credentials of a Demoblaze test user
 */
export interface NewUser {
    username: string;
    password: string;
}

/**
 * Creates credentials for a new, not yet registered Demoblaze user.
 *
 * The username is made unique with the current timestamp plus a random number,
 * so spec files running in parallel don't generate the same username.
 * Every call returns a different user: call it once per test and reuse the result
 * (e.g. for both the API request and the UI steps).
 *
 * @returns username and password of the new user
 */
export function createNewUser(): NewUser {
    const unique = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
    const password = 'password01';

    return {
        username: `TestUserName${unique}`,
        password
    }
}
