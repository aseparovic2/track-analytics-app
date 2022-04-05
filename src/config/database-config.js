import * as Realm from "realm-web";

const REALM_APP_ID = "telemetry-project-tiivn"; // e.g. myapp-abcde
export const mongoApp = new Realm.App({ id: REALM_APP_ID });
