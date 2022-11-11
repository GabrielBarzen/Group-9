package com.GeoFlex.GeoFlexBackend.Controllers.Authentication;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashMap;

public class Authenticator {

    String token;
    String userID;
    int access_level;

    private static final SecureRandom secureRandom = new SecureRandom(); //threadsafe
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder(); //threadsafe
    private static HashMap<Integer, >

    public Authenticator(String token, String userID, int access_level) {
        this.token = token;
        this.userID = userID;
        this.access_level = access_level;
    }

    public static String getHash(String password, String salt) {
        return null; //TODO returned hashed password
    }



    public static String CreateToken(String userId) {
        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        String token = base64Encoder.encodeToString(randomBytes);
        return token;
    }

    public boolean auth() { //todo implement
        return true;
    }
}
