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

    HashMap<String,Token> userIdTokenMap = new HashMap<>();
    AuthenticationProcedures ap = new AuthenticationProcedures();


    public Authenticator() {

    }

    public static String getHash(String password, String salt) {
        try {
            byte[] hashedArr = getSHA((password + salt));
            return toHexString(hashedArr);
        } catch ( Exception e) {
            return null;
        }
    }


    public static byte[] getSHA(String input) throws NoSuchAlgorithmException, NoSuchAlgorithmException {
        // Static getInstance method is called with hashing SHA
        MessageDigest md = MessageDigest.getInstance("SHA-256");

        // digest() method called
        // to calculate message digest of an input
        // and return array of byte
        return md.digest(input.getBytes(StandardCharsets.UTF_8));
    }
    public static String toHexString(byte[] hash) {

        BigInteger number = new BigInteger(1, hash);

        StringBuilder hexString = new StringBuilder(number.toString(16));

        while (hexString.length() < 64)
        {
            hexString.insert(0, '0');
        }

        return hexString.toString();
    }

    public static String generateSalt(){
        return RandomStringUtils.random(32, true, true);
    }

    public boolean auth(String userId, Token authToken, int accessLevel) {
        Token storedToken = userIdTokenMap.get(userId);
        LocalDate ld = LocalDate.now();
        /*System.out.println("get token : " + storedToken);
        // Return false if user is logged out or session expired.
        System.out.println("=========CHECK TOKEN=========");
        System.out.println("Token is time valid : " + ld.isBefore(storedToken.getExpiery()) + ",\n client : " + ld + ",\n server : " + storedToken.getExpiery());
        System.out.println();
        System.out.println("Token matches : " + authToken.getToken().equals(storedToken.getToken()) + ",\n client : " + authToken.getToken() + ",\n server : " + storedToken.getToken());
        System.out.println();
        System.out.println("Access level granted : " + (ap.getAccesLevel(userId) == accessLevel) + ",\n db access level : " + ap.getAccesLevel(userId) + ",\n request access level : " + accessLevel );
        System.out.println("==========COMPLETED==========");*/
        return ld.isBefore(storedToken.getExpiery()) && authToken.getToken().equals(storedToken.getToken()) && ap.getAccesLevel(userId) >= accessLevel; // Return true if user is logged in and session has not expired.
    }
    public void putToken(String id, Token token){
        userIdTokenMap.put(id,token);
        //System.out.println("put token : " + token);
    }
}
