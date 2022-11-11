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
        String json = UserProcedures.getRouteFromDatabase("0", routeCode);
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
}
