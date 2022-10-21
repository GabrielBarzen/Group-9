package com.GeoFlex.GeoFlexBackend.Controllers;

import org.checkerframework.checker.units.qual.C;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value = "/authenticator")
public class AuthenticationController {

    @RequestMapping(value = "/login")
    public ResponseEntity<String> login(HttpServletResponse response) {
        Cookie userId = new Cookie("user-id", "1");
        Cookie token = new Cookie("authentication-token", "NI");
        userId.setPath("/");
        token.setPath("/");
        response.addCookie(token);
        response.addCookie(userId);
        return new ResponseEntity<>("{\"error\" : \"not implemented\"}", HttpStatus.NOT_IMPLEMENTED);
    }
    @RequestMapping(value = "/register")
    public ResponseEntity<String> register() {
        return new ResponseEntity<>("{\"error\" : \"not implemented\"}", HttpStatus.NOT_IMPLEMENTED);
    }



}
