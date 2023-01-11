package com.GeoFlex.GeoFlexBackend.Controllers.User;

import com.GeoFlex.GeoFlexBackend.Controllers.Admin.AdminCompanion;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class to recieve requests from the front-end.
 * @see UserCompanion for further details
 */

@RestController
@RequestMapping("/user")
public class UserController {
    /**
     * Returns a complete route with locations and content by its code or id. (/user/route) GET
     * @return Response entity containing json the route.
     */

    @RequestMapping(value = "/route", method = RequestMethod.GET)
    public ResponseEntity<String> routeGet(@RequestParam String routeCode) {
        UserCompanion userCompanion = new UserCompanion();
        return userCompanion.routeGet(routeCode);
    }

    /**
     * *
     * @param routeCode The route code.
     * @return Message with status depending on outcome.
     */
    @RequestMapping(value = "/checkRoute", method = RequestMethod.GET)
    public ResponseEntity<String> getRouteIdFromCode(@RequestParam String routeCode) {
        UserCompanion userCompanion = new UserCompanion();
        return userCompanion.routeGetIdFromCode(routeCode);
    }

    /**
     * Increments the route finished variable in the database by one.
     * @param token The user token.
     * @param userID The user ID.
     * @param routeId The route ID.
     * @return Message with status depending on outcome.
     */
    @RequestMapping(value = "/route/stats/finished", method = RequestMethod.GET)
    public ResponseEntity<String> updateRouteStatsFinished(@CookieValue(name = "authentication-token") String token,
                                           @CookieValue(name = "user-id") String userID, @RequestParam String routeId) {
        UserCompanion userCompanion = new UserCompanion();
        return userCompanion.updateRouteStatsFinished(routeId);
    }

}
