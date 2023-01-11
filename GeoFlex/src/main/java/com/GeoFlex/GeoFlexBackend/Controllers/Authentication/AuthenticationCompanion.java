package com.GeoFlex.GeoFlexBackend.Controllers.Authentication;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AuthenticationProcedures;
import com.GeoFlex.GeoFlexBackend.PoJo.Authentication.Register;
import com.GeoFlex.GeoFlexBackend.PoJo.Authentication.Route;
import com.GeoFlex.GeoFlexBackend.PoJo.Authentication.UpdateUser;
import com.GeoFlex.GeoFlexBackend.Process.Mail.AccountTypes;
import com.GeoFlex.GeoFlexBackend.Process.Mail.MailService;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class AuthenticationCompanion {

    /**
     * Allows the creation of an account.
     * @param register Register object.
     * @return Response determined in Authenticator.
     */
    public String register (Register register) {
        AuthenticationProcedures ap = new AuthenticationProcedures();
        String salt = Authenticator.generateSalt();
        MailService ms = new MailService();
        ms.sendEmailCreateAccount(register.userEmail, register.userName, register.password, AccountTypes.USER);
        return  ap.createUser(
                register.userName,
                register.userEmail,
                salt,
                Authenticator.getHash(register.password,salt)
        );
    }

    /**
     * Updates user access for a route.
     * @param body Json body containing relevant information.
     * @return Message with status of request.
     */
    public ResponseEntity<String> updateUser(String body) {
        AuthenticationProcedures ap = new AuthenticationProcedures();
        //System.out.println("updating users" + body);
        Gson gson = new Gson();
        UpdateUser uu = gson.fromJson(body,UpdateUser.class);
        String userId = uu.userId;
        if (uu.accessLevel != null) {
            ap.setAccessLevelForUser(userId,uu.accessLevel);
        }
        if (uu.route != null) {
            for (Route route : uu.route) {
                if (route.assign != null) {
                    ap.assignRoute(userId,route.assign);
                }
                if (route.unAssign != null) {
                    ap.unAssignRoute(userId,route.assign);
                }
            }
        }

        return new ResponseEntity<>("{\"success\" : \"all actions completed successfully\"}", HttpStatus.OK);
    }
}
