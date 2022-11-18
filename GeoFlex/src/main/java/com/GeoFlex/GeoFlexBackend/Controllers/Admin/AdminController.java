package com.GeoFlex.GeoFlexBackend.Controllers.Admin;


import com.GeoFlex.GeoFlexBackend.Controllers.Authentication.Authenticator;
import com.GeoFlex.GeoFlexBackend.PoJo.Authentication.AdminLogin;
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

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ResponseEntity<String> login(@RequestBody String body, HttpServletResponse response) {
        Gson gson = new Gson();
        AdminLogin login = gson.fromJson(body,AdminLogin.class);
        AdminCompanion adminCompanion;
        if (login.login.userName != null){
            adminCompanion = AdminCompanion.GetLoginCompanion(login.login.userName, login.login.password);
        } else {
            adminCompanion = null;
        }
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        } else {
            String token = Authenticator.CreateToken(adminCompanion.getUserID());
            Cookie tokenCookie = new Cookie("authentication-token", token);
            Cookie idCookie = new Cookie("user-id", token);
            response.addCookie(tokenCookie);
            response.addCookie(idCookie);
            return adminCompanion.routesGet();
        }
    }

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
    public ResponseEntity<String> routePost(/*@RequestHeader Map<String, String> headers,
                                            @CookieValue(name = "authentication-token") String token,
                                            @CookieValue(name = "user-id") String userID*/@RequestBody String body) {
        AdminCompanion adminCompanion = getAdminCompanion("", "1");
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routePost(body);
    }

    @RequestMapping(value = "/route", method = RequestMethod.PATCH)
    public ResponseEntity<String> routePatch(@RequestBody String body ,
                                             @CookieValue(name = "authentication-token") String token,
                                             @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routePatch(body);
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

    @RequestMapping(value = "/route/locations", method = RequestMethod.GET)
    public ResponseEntity<String> routeGetLocations(@RequestParam("route-id") String routeID,
                                              @CookieValue(name = "authentication-token") String token,
                                              @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routeGetLocations(routeID);
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
