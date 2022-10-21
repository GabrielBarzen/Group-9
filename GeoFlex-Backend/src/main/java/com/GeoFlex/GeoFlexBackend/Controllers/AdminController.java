package com.GeoFlex.GeoFlexBackend.Controllers;


import com.GeoFlex.GeoFlexBackend.Authentication.Authenticator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller class to recieve requests from the front-end.
 * @see AdminCompanion for further details
 */

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final int ADMIN_ACCESS_LEVEL = 2;

    @RequestMapping(value = "/routes", method = RequestMethod.GET)
    public ResponseEntity<String> routesGet(@CookieValue(name = "authentication-token") String token,
                                            @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routesGet();
    }

    @RequestMapping(value = "/route", method = RequestMethod.GET)
    public ResponseEntity<String> routeGet(@RequestParam("route-id") String routeID,
                                           @CookieValue(name = "authentication-token") String token,
                                           @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routeGet(routeID);
    }

    @RequestMapping(value = "/route", method = RequestMethod.POST)
    public ResponseEntity<String> routePost(@RequestHeader Map<String, String> headers,
                                            @CookieValue(name = "authentication-token") String token,
                                            @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routePost(headers);
    }

    @RequestMapping(value = "/route", method = RequestMethod.PATCH)
    public ResponseEntity<String> routePatch(@RequestHeader Map<String, String> headers,
                                             @CookieValue(name = "authentication-token") String token,
                                             @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routePatch(headers);

    }

    @RequestMapping(value = "/route", method = RequestMethod.DELETE)
    public ResponseEntity<String> routeDelete(@RequestParam("route-id") String routeID,
                                              @CookieValue(name = "authentication-token") String token,
                                              @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routeDelete(routeID);
    }

    private AdminCompanion getAdminCompanion(String token, String userID) {
        System.out.println("Admin Auth Token : " + token);
        System.out.println("Admin Auth UserId : " + userID);
        Authenticator authenticator = new Authenticator(token,userID,ADMIN_ACCESS_LEVEL);
        if (authenticator.auth()) {
            return new AdminCompanion(userID);
        } else {
            return null;
        }

    }


}
