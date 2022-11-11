package com.GeoFlex.GeoFlexBackend.Controllers.Authentication;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AuthenticationProcedures;
import com.GeoFlex.GeoFlexBackend.Model.Token;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.HashMap;

public class Authenticator {

    HashMap<Integer,Token> userIdTokenMap = new HashMap<>();
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

    public boolean auth(String userId, Token authToken, int accessLevel) { //todo implement
        Token storedToken = userIdTokenMap.get(Integer.parseInt(userId));
        LocalDate ld = LocalDate.now();
        // Return false if user is logged out or session expired.
        return ld.isBefore(authToken.getExpiery()) && authToken.getToken().equals(storedToken.getToken()) && ap.getAccesLevel(userId) == accessLevel; // Return true if user is logged in and session has not expired.
    }
    public void putToken(int id, Token token){
        userIdTokenMap.put(id,token);

    }
}
