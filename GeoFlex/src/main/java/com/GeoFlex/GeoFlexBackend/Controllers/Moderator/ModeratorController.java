package com.GeoFlex.GeoFlexBackend.Controllers.Moderator;

import com.GeoFlex.GeoFlexBackend.Controllers.Authentication.Authenticator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/moderator")
public class ModeratorController {

    private final int MODERATOR_ACCESS_LEVEL = 1;

    /**
     * Returns a list of all the routes from the database.
     * @param token The user token sent as a cookie.
     * @param userID The uer id sent as a cookie.
     * @return Response determined in the ModeratorCompanion.
     */
    @RequestMapping(value = "/routes", method = RequestMethod.GET)
    public ResponseEntity<String> routesGet(@CookieValue(name = "authentication-token") String token,
                                            @CookieValue(name = "user-id") String userID) {
        ModeratorCompanion moderatorCompanion = getModeratorCompanion(token,userID);
        if (moderatorCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return moderatorCompanion.routesGet();
    }

    /**
     * Returns a specific route from the database.
     * @param routeID The id of the route.
     * @param token The user token sent as a cookie.
     * @param userID The user id sent as a cookie.
     * @return Response determined in the ModeratorCompanion.
     */
    @RequestMapping(value = "/route", method = RequestMethod.GET)
    public ResponseEntity<String> routeGet(@RequestParam("route-id") String routeID,
                                           @CookieValue(name = "authentication-token") String token,
                                           @CookieValue(name = "user-id") String userID) {
        ModeratorCompanion moderatorCompanion = getModeratorCompanion(token,userID);
        if (moderatorCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return moderatorCompanion.routeGet(routeID);
    }

    /**
     * Allows editing of a route by sending a Json object in the body. Check API documentation on how to use.
     * @param body Json body containing the changes.
     * @param token The token  sent as a cookie.
     * @param userID The user id sent as a cookie.
     * @return Response determined in the ModeratorCompanion.
     */
    @RequestMapping(value = "/route", method = RequestMethod.PATCH)
    public ResponseEntity<String> routePatch(@RequestBody String body ,
                                             @CookieValue(name = "authentication-token") String token,
                                             @CookieValue(name = "user-id") String userID) {
        ModeratorCompanion moderatorCompanion = getModeratorCompanion(token,userID);
        if (moderatorCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return moderatorCompanion.routePatch(body);
    }

    /**
     * Returns all locations of a specific route.
     * @param routeID The id of the route.
     * @param token The token sent as a cookie.
     * @param userID The user id sent as a cookie.
     * @return Response determined in the ModeratorCompanion.
     */
    @RequestMapping(value = "/route/locations", method = RequestMethod.GET)
    public ResponseEntity<String> routeGetLocations(@RequestParam("route-id") String routeID,
                                                    @CookieValue(name = "authentication-token") String token,
                                                    @CookieValue(name = "user-id") String userID) {
        ModeratorCompanion moderatorCompanion = getModeratorCompanion(token,userID);
        if (moderatorCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return moderatorCompanion.routeGetLocations(routeID);
    }

    /**
     * Saves a file uploaded for a specific route on the server then uploads the path to the database.
     * @param file The file to be saved and uploaded.
     * @param routeId The id of the route.
     * @param token The token sent as a cookie.
     * @param userID The user id sent as a cookie.
     * @return Response determined in the ModeratorCompanion.
     */
    @RequestMapping(value = "route/file/upload", method = RequestMethod.POST)
    public ResponseEntity<String> routeUploadFile(@RequestParam("file") MultipartFile file, @RequestParam("routeId") String routeId,
                                                  @CookieValue(name = "authentication-token") String token,
                                                  @CookieValue(name = "user-id") String userID) {
        ModeratorCompanion moderatorCompanion = getModeratorCompanion(token,userID);
        if (moderatorCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return moderatorCompanion.uploadRouteFile(Integer.parseInt(routeId), file);
    }

    /**
     * Retrieves a filepath containing images or videos for a specific route.
     * @param routeId The id of the route.
     * @param token The token sent as a cookie.
     * @param userID The user id sent as a cookie.
     * @return Response determined in the ModeratorCompanion.
     */
    @RequestMapping(value = "route/file/retrieve", method = RequestMethod.GET)
    public ResponseEntity<String> routeGetFile(@RequestParam("routeId") String routeId,
                                                  @CookieValue(name = "authentication-token") String token,
                                                  @CookieValue(name = "user-id") String userID) {
        ModeratorCompanion moderatorCompanion = getModeratorCompanion(token,userID);
        if (moderatorCompanion == null) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        return moderatorCompanion.getRouteFile(Integer.parseInt(routeId));
    }

    /**
     * Allows editing of a route by sending a Json object in the body. Check API documentation on how to use.
     * @param body Json body containing the changes.
     * @param token The token  sent as a cookie.
     * @param userID The user id sent as a cookie.
     * @return Response determined in the ModeratorCompanion.
     */
    @RequestMapping(value = "location", method = RequestMethod.PATCH)
    public ResponseEntity<String> locationPatch(@RequestBody String body,
                                                @CookieValue(name = "authentication-token") String token,
                                                @CookieValue(name = "user-id") String userID){

        ModeratorCompanion moderatorCompanion = getModeratorCompanion(token, userID);
        if (moderatorCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }

        return moderatorCompanion.locationPatch(body);
    }

    /**
     * Saves a file uploaded for a specific location on the server then uploads the path to the database.
     * @param file The file to be saved and uploaded.
     * @param locationId The id of the route.
     * @param token The token sent as a cookie.
     * @param userID The user id sent as a cookie.
     * @return Response determined in the ModeratorCompanion.
     */
    @RequestMapping(value = "location/file/upload", method = RequestMethod.POST)
    public ResponseEntity<String> locationUploadFile(@RequestParam("file") MultipartFile file, @RequestParam("locationId") String locationId,
                                                  @CookieValue(name = "authentication-token") String token,
                                                  @CookieValue(name = "user-id") String userID) {
        ModeratorCompanion moderatorCompanion = getModeratorCompanion(token,userID);
        if (moderatorCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return moderatorCompanion.uploadLocationFile(Integer.parseInt(locationId), file);
    }

    /**
     * Retrieves a filepath containing images or videos for a specific location.
     * @param locationId The id of the route.
     * @param token The token sent as a cookie.
     * @param userID The user id sent as a cookie.
     * @return Response determined in the ModeratorCompanion.
     */
    @RequestMapping(value = "location/file/retrieve", method = RequestMethod.GET)
    public ResponseEntity<String> locationGetFile(@RequestParam("locationId") String locationId,
                                               @CookieValue(name = "authentication-token") String token,
                                               @CookieValue(name = "user-id") String userID) {
        ModeratorCompanion moderatorCompanion = getModeratorCompanion(token,userID);
        if (moderatorCompanion == null) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        return moderatorCompanion.getLocationFile(Integer.parseInt(locationId));
    }

    /**
     * Function to authenticate the moderator.
     * @param token The token  sent as a cookie.
     * @param userID The user id sent as a cookie.
     * @return Authentication.
     */
    private ModeratorCompanion getModeratorCompanion(String token, String userID) {
        System.out.println("Admin Auth Token : " + token);
        System.out.println("Admin Auth UserId : " + userID);
        Authenticator authenticator = new Authenticator(token,userID,MODERATOR_ACCESS_LEVEL);
        if (authenticator.auth()) {
            return new ModeratorCompanion(userID);
        } else {
            return null;
        }
    }
}
