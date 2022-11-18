package com.GeoFlex.GeoFlexBackend.Controllers.Authentication;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AuthenticationProcedures;
import com.GeoFlex.GeoFlexBackend.PoJo.Authentication.Register;
import com.GeoFlex.GeoFlexBackend.PoJo.Authentication.Route;
import com.GeoFlex.GeoFlexBackend.PoJo.Authentication.UpdateUser;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class AuthenticationCompanion {

    public String register (Register register) {
        AuthenticationProcedures ap = new AuthenticationProcedures();
        String salt = Authenticator.generateSalt();
        return  ap.createUser(
                register.userName,
                register.userEmail,
                salt,
                Authenticator.getHash(register.password,salt)
        );
    }

    public ResponseEntity<String> updateUser(String body) {
        AuthenticationProcedures ap = new AuthenticationProcedures();
        System.out.println("updating users" + body);
        Gson gson = new Gson();
        UpdateUser uu = gson.fromJson(body,UpdateUser.class);
        String userId = uu.userId;
        if (uu.accessLevel != null) {
            ap.setAccessLevelForUser(userId,uu.accessLevel);
        }
        if (uu.route != null) {
            for (Route route : uu.route) {
                if (route.assign != null) {

                }
                if (route.unAssign != null) {

                }
            }
        }



        return new ResponseEntity<>("{\"error\" : \"not implemented\"}", HttpStatus.NOT_IMPLEMENTED);
    }
}
