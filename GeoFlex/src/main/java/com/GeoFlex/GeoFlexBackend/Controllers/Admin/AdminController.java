package com.GeoFlex.GeoFlexBackend.Controllers.Admin;


import com.GeoFlex.GeoFlexBackend.Controllers.Authentication.AccessLevel;
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


    Authenticator authenticator = AuthenticationController.authenticator;

    /**
     * Endpoint to return all the routes from the database.
     * @param token The user token sent as a cookie.
     * @param userID The uer id sent as a cookie.
     * @return Response determined in the AdminCompanion.
     */
    @RequestMapping(value = "/routes", method = RequestMethod.GET)
    public ResponseEntity<String> routesGet(@CookieValue(name = "authentication-token") String token,
                                            @CookieValue(name = "user-id") String userID) {
        AdminCompanion adminCompanion = getAdminCompanion(token,userID);
        if (adminCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden, try logging in again\"}", HttpStatus.FORBIDDEN);
        }
        return adminCompanion.routesGet();
    }

    /**
     * Endpoint to return one routes from the database.
     * @param routeID The id of the route to return.
     * @param token The user token sent as a cookie.
     * @param userID The uer id sent as a cookie.
     * @return Response determined in the AdminCompanion.
     */
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

    /**
     * Endpoint to create a route.
     * @param body Json body containing all relevant inforamtion.
     * @param token The user token sent as a cookie.
     * @param userID The uer id sent as a cookie.
     * @return Response determined in the AdminCompanion.
     */
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

    /**
     * Endpoint to modify a route.
     * @param body Json body containing all relevant inforamtion.
     * @param token The user token sent as a cookie.
     * @param userID The uer id sent as a cookie.
     * @return Response determined in the AdminCompanion.
     */
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

    /**
     * Endpoint to delete a route.
     * @param routeID The id of the route to delete.
     * @param token The user token sent as a cookie.
     * @param userID The uer id sent as a cookie.
     * @return Response determined in the AdminCompanion.
     */
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

    /**
     * Endpoint to get all locations for a route.
     * @param routeID The id of the route.
     * @param token The user token sent as a cookie.
     * @param userID The uer id sent as a cookie.
     * @return Response determined in the AdminCompanion.
     */
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


    /**
     * Endpoint to assign a moderator to a route.
     * @param body Json body containing all relevant inforamtion.
     * @param token The user token sent as a cookie.
     * @param userID The uer id sent as a cookie.
     * @return Response determined in the AdminCompanion.
     */
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




    /**
     * Endpoint to create a moderator account.
     * @param body Json body containing all relevant inforamtion.
     * @param token The user token sent as a cookie.
     * @param userID The uer id sent as a cookie.
     * @return Response determined in the AdminCompanion.
     */
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


    /**
     * Endpoint to delete a moderator to a route.
     * @param userId The id of the account to delete.
     * @param token The user token sent as a cookie.
     * @param userID The uer id sent as a cookie.
     * @return Response determined in the AdminCompanion.
     */
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

    /**
     * Endpoint to get all moderator accounts.
     * @param token The user token sent as a cookie.
     * @param userID The uer id sent as a cookie.
     * @return Response determined in the AdminCompanion.
     */
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

    /**
     * Get routes related to a specific user.
     * @param userId The id of the user.
     * @param token The user token sent as a cookie.
     * @param userID The uer id sent as a cookie.
     * @return Response determined in the AdminCompanion.
     */
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

    /**
     * Checks whether the person that called the endpoint has authorization or not.
     * @param token The user token sent as a cookie.
     * @param userID The uer id sent as a cookie.
     * @return Response determined in the AdminCompanion.
     */
    private AdminCompanion getAdminCompanion(String token, String userID) {
        //System.out.println("Admin Auth Token : " + token);
        //System.out.println("Admin Auth UserId : " + userID);

        if (AuthenticationController.authenticator.auth(userID, new Token(token), AccessLevel.ADMIN.getLevel())) {
            return new AdminCompanion(userID);
        } else {
            return null;
        }

    }
}
