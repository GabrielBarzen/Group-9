package com.GeoFlex.GeoFlexBackend.Controllers.Admin;


import com.GeoFlex.GeoFlexBackend.Controllers.Authentication.AuthenticationController;
import com.GeoFlex.GeoFlexBackend.Controllers.Authentication.Authenticator;
import com.GeoFlex.GeoFlexBackend.Model.Token;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

/**
 * Controller class to recieve requests from the front-end.
 * @see AdminCompanion for further details
 */

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final int ADMIN_ACCESS_LEVEL = 2;
    Authenticator authenticator = AuthenticationController.authenticator;

    @RequestMapping(value = "/routes", method = RequestMethod.GET)
    public ResponseEntity<String> routesGet(@CookieValue(name = "authentication-token") String token,
                                            @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        System.out.println("gotten admin companion : " + adminCompanion);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden, try logging in again\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routesGet();
    }

    @RequestMapping(value = "/route", method = RequestMethod.GET)
    public ResponseEntity<String> routeGet(@RequestParam("route-id") String routeID,
                                           @CookieValue(name = "authentication-token") String token,
                                           @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden, try logging in again\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routeGet(routeID);
    }

    @RequestMapping(value = "/route", method = RequestMethod.POST)
    public ResponseEntity<String> routePost(
                                            @CookieValue(name = "authentication-token") String token,
                                            @CookieValue(name = "user-id") String userID, @RequestBody String body) {
        AdminCompanion adminCompanion = getAdminCompanion(token, userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden, try logging in again\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routePost(body);
    }

    @RequestMapping(value = "/route", method = RequestMethod.PATCH)
    public ResponseEntity<String> routePatch(@RequestBody String body ,
                                             @CookieValue(name = "authentication-token") String token,
                                             @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden, try logging in again\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routePatch(body);
    }

    @RequestMapping(value = "/route", method = RequestMethod.DELETE)
    public ResponseEntity<String> routeDelete(@RequestParam("route-id") String routeID,
                                              @CookieValue(name = "authentication-token") String token,
                                              @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden, try logging in again\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routeDelete(routeID);
    }

    @RequestMapping(value = "/route/locations", method = RequestMethod.GET)
    public ResponseEntity<String> routeGetLocations(@RequestParam("route-id") String routeID,
                                              @CookieValue(name = "authentication-token") String token,
                                              @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden, try logging in again\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routeGetLocations(routeID);
    }


    @RequestMapping(value = "/route/moderator", method = RequestMethod.PATCH)
    public ResponseEntity<String> routeAssignModerator(@RequestBody String body,
                                                       @CookieValue(name = "authentication-token") String token,
                                                       @CookieValue(name = "user-id") String userID) {

        AdminCompanion adminCompanion = getAdminCompanion(token, userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden, try logging in again\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routeChangeAccess(body);
    }




@RequestMapping(value = "/create/moderator", method = RequestMethod.POST)
    public ResponseEntity<String> createModerator(
            @CookieValue(name = "authentication-token") String token,
            @CookieValue(name = "user-id") String userID, @RequestBody String body) {
        AdminCompanion adminCompanion = getAdminCompanion(token, userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden, try logging in again\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.createModerator(body);
    }


    @RequestMapping(value = "/delete/moderator", method = RequestMethod.POST)
    public ResponseEntity<String> deleteModerator(
            @CookieValue(name = "authentication-token") String token,
            @CookieValue(name = "user-id") String userID, @RequestParam("user-id") String userId) {
        AdminCompanion adminCompanion = getAdminCompanion(token, userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden, try logging in again\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.deleteModerator(userId);
    }

    @RequestMapping(value = "/moderators", method = RequestMethod.GET)
    public ResponseEntity<String> getAllModerators(
                                                    @CookieValue(name = "authentication-token") String token,
                                                    @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.getAllModerators();
    }

    @RequestMapping(value = "/route/user", method = RequestMethod.GET)
    public ResponseEntity<String> getRouteForUser(@RequestParam("user-id") String userId,
                                                  @CookieValue(name = "authentication-token") String token,
                                                  @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.getRouteForUser(userId);
    }

    private AdminCompanion getAdminCompanion(String token, String userID) {
        System.out.println("Admin Auth Token : " + token);
        System.out.println("Admin Auth UserId : " + userID);

        if (AuthenticationController.authenticator.auth(userID, new Token(token), ADMIN_ACCESS_LEVEL)) {
            return new AdminCompanion(userID);
        } else {
            return null;
        }

    }
}
