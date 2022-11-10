package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import com.GeoFlex.GeoFlexBackend.Controllers.Authentication.LoginType;

public class AuthenticationProcedures {
    public static String getSalt(String identification, LoginType type) {
        return null; //TODO Get salt from db
    }

    public static String getID(String identification, LoginType type) {
        return null; //TODO get id from db
    }

    public static String getHashedPassword(String userid) {
        return null; //TODO get hadhed password from db
    }
}
