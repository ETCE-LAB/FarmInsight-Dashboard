import {User} from "oidc-client-ts";
import {MOCK_USER, oidcConfig} from "./MainAppProvider";

export function getUser() {
    return {
            access_token: MOCK_USER.access_token,
            profile: MOCK_USER.profile,
        };

    /*const oidcStorage = localStorage.getItem(`oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`)

    if (!oidcStorage) {
        return null;
    }

    return User.fromStorageString(oidcStorage);
*/
}