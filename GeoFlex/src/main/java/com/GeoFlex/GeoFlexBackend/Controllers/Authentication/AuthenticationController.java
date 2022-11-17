package com.GeoFlex.GeoFlexBackend.Controllers.Authentication;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AuthenticationProcedures;
import com.GeoFlex.GeoFlexBackend.Model.Token;
import com.GeoFlex.GeoFlexBackend.Model.TokenType;
import com.GeoFlex.GeoFlexBackend.PoJo.Authentication.Login;
import com.google.gson.Gson;
import org.checkerframework.checker.units.qual.C;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@CrossOrigin
@RestController
@RequestMapping(value = "/authenticator")
public class AuthenticationController {
    public static Authenticator authenticator = new Authenticator();

    @RequestMapping(value = "/login")
    public ResponseEntity<String> login(HttpServletResponse response) {
        Cookie userId = new Cookie("user-id", "1");
        Cookie token = new Cookie("authentication-token", "NI");
        userId.setPath("/");
        token.setPath("/");
        response.addCookie(token);
        response.addCookie(userId);
        return new ResponseEntity<>("{\"OK\" : \"Sucessfully authenticated\"}", HttpStatus.OK);
    }
    @RequestMapping(value = "/login2")
    public ResponseEntity<String> login2(HttpServletResponse response, @RequestBody String body) {
        Gson gson = new Gson();
        Login login = gson.fromJson(body, Login.class);
        AuthenticationProcedures ap = new AuthenticationProcedures();
        String id = ap.getUserId(login.userName);
        String passwordHash = Authenticator.getHash(login.password, ap.getSalt(id));
        if (ap.login(id,passwordHash)) {
            Token token;
            if (login.expiery.equals("WEEK")) {
                token = new Token(TokenType.WEEK);
            } else if (login.expiery.equals("MONTH")) {
                token = new Token(TokenType.MONTH);
            } else {
                token = new Token(TokenType.DAY);
            }
            authenticator.putToken(Integer.parseInt(id), token);

            Cookie userId = new Cookie("user-id", id);
            Cookie tokenString = new Cookie("authentication-token", token.getToken());
            response.addCookie(userId);
            response.addCookie(tokenString);
            return new ResponseEntity<>("{\"OK\" : \"Sucessfully authenticated\"}", HttpStatus.OK);
        }
        return new ResponseEntity<>("{\"OK\" : \"Authentication unsucessfull, please log in and retry\"}", HttpStatus.OK);
    }
    @RequestMapping(value = "/register")
    public ResponseEntity<String> register() {
        return new ResponseEntity<>("{\"error\" : \"not implemented\"}", HttpStatus.NOT_IMPLEMENTED);
    }
}
