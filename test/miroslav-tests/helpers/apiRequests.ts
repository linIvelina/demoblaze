import { API_URLS } from './apiUrls';
import { NewUser, createNewUser } from './newUser';

/**
 * Registers a user directly through the Demoblaze sign-up API
 * (used as a test precondition instead of signing up through the UI).
 *
 * The UI base64-encodes the password on sign up and login, so the password is
 * encoded here too: the registered user can then log in through the UI.
 *
 * Throws an error if the registration fails. Demoblaze returns HTTP 200 for both
 * success and failure, so the response body is checked for an error message too.
 *
 * @param user username and password of the user to register;
 *             if omitted, a new unique user is created with createNewUser()
 * @returns the registered user, so the test can reuse it in the UI steps
 */
export async function registerUserViaApi(user: NewUser = createNewUser()): Promise<NewUser> {
    const response = await fetch(API_URLS.signUp, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: user.username,
            password: btoa(user.password)
        })
    });

    const body = await response.text();
    if (!response.ok || body.includes('errorMessage')) {
        throw new Error(`API sign-up failed: HTTP ${response.status}, body: ${body}`);
    }

    return user;
}
