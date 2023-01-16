package com.GeoFlex.GeoFlexBackend.Controllers.Authentication;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AuthenticationProcedures;
import com.GeoFlex.GeoFlexBackend.Model.Token;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLOutput;
import java.time.LocalDate;
import java.util.HashMap;

public class Authenticator {
    /**
     * Logged in users.
     */
    private HashMap<String,Token> userIdTokenMap = new HashMap<>();
    /**
     * Used to contact database.
     */
    private AuthenticationProcedures ap = new AuthenticationProcedures();


    /**
     * Combines password with salt in order to create the complete hash.
     * @param password input password.
     * @param salt input salt.
     * @return hashed&salted password. Stored in the database.
     */
    public static String getHash(String password, String salt) {
        try {
            byte[] hashedArr = getSHA((password + salt));
            return toHexString(hashedArr);
        } catch ( Exception e) {
            return null;
        }
    }

    /**
     * Static method for hashing a string input.
     * @param input string to be hashed using the SHA256 algorithm.
     * @return returns a byte array containing the digest, used in conjunction with {@link com.GeoFlex.GeoFlexBackend.Controllers.Authentication.Authenticator#toHexString(byte[] hash) toHexString} method to convert back into readable text.
     * @throws NoSuchAlgorithmException Exception if the specified hashing algorithm not found, in this case "SHA-256"
     */
    public static byte[] getSHA(String input) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        return md.digest(input.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Converts hashed byte[] into a readable string.
     * @param hash the byte[] containing the data.
     * @return String converted from byte[] hash.
     */
    public static String toHexString(byte[] hash) {

        BigInteger number = new BigInteger(1, hash);

        StringBuilder hexString = new StringBuilder(number.toString(16));

        while (hexString.length() < 64)
        {
            hexString.insert(0, '0');
        }

        return hexString.toString();
    }

    /**
     * Creates a random string, to be used as salt.
     * @return random string.
     */
    public static String generateSalt(){
        return RandomStringUtils.random(32, true, true);
    }

    /**
     * Method to validate the authenticity of a loggedin users.
     * @param userId the user to be authenticated.
     * @param authToken the token to compare with loggedin users.
     * @param accessLevel the level at which the user attempts to authenticate.
     * @return true if access is granted and token is stored.
     */
    public boolean auth(String userId, Token authToken, int accessLevel) {
        try {
            Token storedToken = userIdTokenMap.get(userId);
            LocalDate ld = LocalDate.now();
            return ld.isBefore(storedToken.getExpiery()) && authToken.getToken().equals(storedToken.getToken()) && ap.getAccesLevel(userId) >= accessLevel; // Return true if user is logged in and session has not expired.
        }
        catch (NullPointerException e){
            System.err.println("Failed to authenticate login, please try logging in again.");
            return false;
        }
    }

    /**
     * Method to add a users token into the map of loggedin users.
     * @param id the users id in order to fetch the token.
     * @param token the user to put into the map.
     */
    public void putToken(String id, Token token){
        userIdTokenMap.put(id,token);
    }
}
