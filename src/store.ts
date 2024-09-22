import { derived, type Readable, writable } from "svelte/store";
import {
  OidcClient,
  type OidcClientSettings,
  OidcClientSettingsStore,
  User,
  UserManager,
} from "oidc-client-ts";

const defaultClientSettings = {
  authority: "https://keycloak.int.appway.com/auth/realms/chrismilson-test",
  client_id: "dock-test",
  redirect_uri: "", // Not available on the server, should be set on mount.
};

export const clientSettings = writable<OidcClientSettings>(
  defaultClientSettings,
);

export const userManager = writable(new UserManager(defaultClientSettings));

clientSettings.subscribe(($settings) => {
  console.log("hello");
  userManager.set(new UserManager($settings));
});

export const user = writable<User>();
