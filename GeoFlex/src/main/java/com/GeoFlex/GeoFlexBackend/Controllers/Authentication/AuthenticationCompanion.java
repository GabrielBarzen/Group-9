package com.GeoFlex.GeoFlexBackend.Controllers.Authentication;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AuthenticationProcedures;
import com.GeoFlex.GeoFlexBackend.PoJo.Authentication.Register;
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
}
