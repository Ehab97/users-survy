export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            DB_USER: string;
            ENV: 'test' | 'dev' | 'prod';
            COOKIE_KEY: string;
        }
    }
}

declare module "passport-google-oauth20" {
    import { Strategy as PassportStrategy } from "passport";

    export interface StrategyOptions {
        /**
         * Your Google application's client id.
         */
        clientID: string;

        /**
         * Your Google application's client secret.
         */
        clientSecret: string;

        /**
         * URL to which Google will redirect the user after granting authorization.
         */
        callbackURL: string;
    }

    /**
     * `Strategy` constructor.
     *
     * The Google authentication strategy authenticates requests by delegating to
     * Google using the OAuth 2.0 protocol.
     *
     * Applications must supply a `verify` callback which accepts an `accessToken`,
     * `refreshToken` and service-specific `profile`, and then calls the `cb`
     * callback supplying a `user`, which should be set to `false` if the
     * credentials are not valid.  If an exception occured, `err` should be set.
     *
     * Examples:
     *
     *     passport.use(new GoogleStrategy({
     *         clientID: '123-456-789',
     *         clientSecret: 'shhh-its-a-secret'
     *         callbackURL: 'https://www.example.net/auth/google/callback'
     *       },
     *       function(accessToken, refreshToken, profile, cb) {
     *         User.findOrCreate(..., function (err, user) {
     *           cb(err, user);
     *         });
     *       }
     *     ));
     */
    export class Strategy extends PassportStrategy {
        public constructor(
            options: StrategyOptions,
            verify: <TProfile, TUser>(
                accessToken: string,
                refreshToken: string,
                profile: TProfile,
                cb: (err: null | Error, user?: TUser) => void,
            ) => void,
        );
    }
}