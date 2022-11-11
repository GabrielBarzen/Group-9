package com.GeoFlex.GeoFlexBackend.Controllers.Authentication;

public class Authenticator {

    String token;
    String userID;
    int access_level;
    public Authenticator(String token, String userID, int access_level) {
        this.token = token;
        this.userID = userID;
        this.access_level = access_level;
    }

    public static String getHash(String password, String salt) {
        return null; //TODO returned hashed password
    }

    public static String CreateToken(String userID) {
        return null; //TODO place token in hashmap and return it so it can be sent as cookie.
    }


    public boolean auth() { //todo implement
        return true;
    }
}
