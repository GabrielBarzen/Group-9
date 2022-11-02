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

    public boolean auth() { //todo implement
        return true;
    }
}
