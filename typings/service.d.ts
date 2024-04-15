export abstract class BcryptServiceInterface {
  /**
   * @method hashPassword
   * @param {password} string
   * @returns {Promise<string>}
   */
  public static hashPassword: (password: string) => Promise<string>;

  /**
   * @method comparePassword
   * @param {string} password
   * @param {string} hash
   * @returns {boolean}
   */
  public static comparePassword: (password: string, hash: string) => boolean;
}
