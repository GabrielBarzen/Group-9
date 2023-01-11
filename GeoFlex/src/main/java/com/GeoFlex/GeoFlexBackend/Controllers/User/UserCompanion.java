package com.GeoFlex.GeoFlexBackend.Controllers.User;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AdminProcedures;
import com.GeoFlex.GeoFlexBackend.DatabaseAccess.UserProcedures;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class UserCompanion {

    /**
     * Get a complete route from the database with location and content. (/user/route) GET
     * @param routeCode The code of route to get.
     * @return Json of the route to be edited or Error json if not found.
     */
    public ResponseEntity<String> routeGet(String routeCode) {
        ResponseEntity<String> response;
        HttpStatus responseStatus = HttpStatus.OK;
        //String json = UserProcedures.getRouteFromDatabase("0", routeCode);
        String json = UserProcedures.getFullRouteFromDatabase(routeCode);
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
        ResponseEntity<String> response = null;
        HttpStatus responseStatus;
        if(!routeId.isEmpty()){
            UserProcedures.updateRouteStatsFinished(routeId);
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
}
