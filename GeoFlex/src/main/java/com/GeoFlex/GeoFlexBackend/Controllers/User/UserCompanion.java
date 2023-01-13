package com.GeoFlex.GeoFlexBackend.Controllers.User;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AdminProcedures;
import com.GeoFlex.GeoFlexBackend.DatabaseAccess.ModeratorProcedures;
import com.GeoFlex.GeoFlexBackend.DatabaseAccess.UserProcedures;
import com.GeoFlex.GeoFlexBackend.PoJo.ModeratorAssign.ModeratorAssign;
import com.GeoFlex.GeoFlexBackend.PoJo.ModeratorAssign.Route;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class UserCompanion {

    /**
     * Get a complete route from the database with location and content. (/user/route) GET
     * @param routeCode The code of route to get.
     * @return Json of the route to be edited or Error json if not found.
     */
    public ResponseEntity<String> routeGet(String routeCode) {
        UserProcedures up = new UserProcedures();
        ResponseEntity<String> response;
        HttpStatus responseStatus = HttpStatus.OK;
        //String json = UserProcedures.getRouteFromDatabase("0", routeCode);
        String json = up.getFullRouteFromDatabase(routeCode);
        if (json == null) {
            json = "{\"error\" : \"Internal server error, contact administrator\"}";
            responseStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        } else if (json.equals("{}")) {
            json = "{\"no routes\" : \"Route could not be found\"}";
            responseStatus = HttpStatus.NO_CONTENT;
        }
        response = new ResponseEntity<>(json, responseStatus);
        return response;
    }

    /**
     * Saves to the database that the route has been completed.
     * @param routeId The id of the route that was completed.
     * @return OK httpstatus.
     */
    public ResponseEntity<String> updateRouteStatsFinished(String routeId) {
        UserProcedures up = new UserProcedures();
        ResponseEntity<String> response = null;
        HttpStatus responseStatus;
        if(!routeId.isEmpty()){
            up.updateRouteStatsFinished(routeId);
            responseStatus = HttpStatus.OK;
            response = new ResponseEntity<>("OK", responseStatus);
        }
        return response;
    }

    /**
     * Gets a route id from its code if it exists in the database.
     * @param routeCode The code of the route.
     * @return Route ID if it exists.
     */
    public ResponseEntity<String> routeGetIdFromCode(String routeCode) {
        UserProcedures up = new UserProcedures();
        ResponseEntity<String> response = null;
        HttpStatus responseStatus;
        if(!routeCode.isEmpty()){
            String id = up.getRouteIdFromCode(routeCode);
            responseStatus = HttpStatus.OK;
            response = new ResponseEntity<>(id, responseStatus);
        }
        return response;
    }

    /**
     * Returns all routes in the database for a specific user. (/user/routes) GET
     * @return Response entity containing json of all routes.
     */
    public ResponseEntity<String> routesGet(String userID) {
        ModeratorProcedures mp = new ModeratorProcedures();
        ResponseEntity<String> response;
        HttpStatus responseStatus = HttpStatus.OK;
        String json = mp.getRoutes(userID);
        if (json == null) {
            json = "{\"error\" : \"Internal server error, contact administrator\"}";
            responseStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        } else if (json.equals("{}")) {
            json = "{\"no routes\" : \"No routes in system\"}";
            responseStatus = HttpStatus.NO_CONTENT;
        }
        response = new ResponseEntity<>(json, responseStatus);
        return response;
    }

    /**
     * Allows changing whether a moderator has access to a route or not.
     * @param body
     * @return OK message body if sucessfull, error with details if not.
     */
    public ResponseEntity<String> routeChangeAccess(String body) {
        Gson gson = new Gson();
        AdminProcedures ap = new AdminProcedures();
        ModeratorAssign ma = gson.fromJson(body, ModeratorAssign.class);
        String id = ma.userId;
        String accessLevel = ma.accessLevel;
        for (Route route : ma.route) {
            ap.changeUserAccess(id, route.assign != null ? route.assign : route.unAssign, accessLevel, route.unAssign != null);
        }

        return new ResponseEntity<>("OK", HttpStatus.OK); //TODO
    }
}
