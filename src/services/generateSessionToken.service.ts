import AuthService from "./auth.service";
import { SessionInterface, UserSessionInterface } from "../../typings/merchant";

/**
 * Create a session for the provided user, including issuing access and refresh tokens
 *
 * @function generateSessionToken
 * @param {UserSessionInterface} user - The user for whom the session is being created.
 * @returns {Promise<SessionInterface>} A Promise that resolves to a session object.
 **/
export const generateSessionToken = async (
  user: UserSessionInterface
): Promise<SessionInterface> => {
  const date = new Date();
  const issuedAt = Math.floor(Date.now() / 1000); // convert to unix timestamp
  const expiresIn = Math.floor(new Date(date.setMonth(1)).getTime() / 1000); // convert to unix timestamp;
  const expiresAt = new Date((issuedAt + expiresIn) * 1000);

  const [accessToken, refreshToken] = await Promise.all([
    AuthService.issueAccessToken(user),
    AuthService.issueRefreshToken(user),
  ]);

  return {
    user,
    expiresIn,
    issuedAt,
    expiresAt,
    accessToken,
    refreshToken,
  };
};
