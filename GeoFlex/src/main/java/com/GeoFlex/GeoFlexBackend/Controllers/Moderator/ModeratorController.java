package com.GeoFlex.GeoFlexBackend.Controllers.Moderator;

import com.GeoFlex.GeoFlexBackend.Controllers.Admin.AdminCompanion;
import com.GeoFlex.GeoFlexBackend.Controllers.Authentication.Authenticator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/moderator")
public class ModeratorController {

    private final int MODERATOR_ACCESS_LEVEL = 1;

    @RequestMapping(value = "/routes", method = RequestMethod.GET)
    public ResponseEntity<String> routesGet(@CookieValue(name = "authentication-token") String token,
                                            @CookieValue(name = "user-id") String userID) {
        ModeratorCompanion moderatorCompanion = getModeratorCompanion(token,userID);
        if (moderatorCompanion == null) {
            return new ResponseEntity<>("{\"error\" : \"forbidden\"}", HttpStatus.FORBIDDEN);
        }
        return moderatorCompanion.routesGet();
    }

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
