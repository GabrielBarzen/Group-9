package com.GeoFlex.GeoFlexBackend.Controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller class to recieve requests from the front-end.
 * @see com.GeoFlex.GeoFlexBackend.Controllers.Admin for further details
 */

@RestController
@RequestMapping("/admin")
public class AdminController {

    @RequestMapping(value = "/routes", method = RequestMethod.GET)
    public ResponseEntity<String> routesGet() {
        Admin admin = new Admin();
        return admin.routesGet();
    }

    @RequestMapping(value = "/route", method = RequestMethod.GET)
    public ResponseEntity<String> routeGet(@RequestParam("route-id") String routeID) {
        Admin admin = new Admin();
        return admin.routeGet(routeID);
    }

    @RequestMapping(value = "/route", method = RequestMethod.POST)
    public ResponseEntity<String> routePost(@RequestHeader Map<String, String> headers) {
        Admin admin = new Admin();
        return admin.routePost(headers);
    }

    @RequestMapping(value = "/route", method = RequestMethod.PATCH)
    public ResponseEntity<String> routePatch(@RequestHeader Map<String, String> headers) {
        Admin admin = new Admin();
        return admin.routePatch(headers);

    }

    @RequestMapping(value = "/route", method = RequestMethod.DELETE)
    public ResponseEntity<String> routeDelete(@RequestParam("route-id") String routeID) {
        Admin admin = new Admin();
        return admin.routeDelete(routeID);
    }
}
