package com.GeoFlex.GeoFlexBackend.Controllers;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AdminProcedures;
import com.GeoFlex.GeoFlexBackend.PoJo.Root;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public class AdminCompanion {

    String userID = "";
    public AdminCompanion(String userID) {
        this.userID = userID;
    }

    /**
     * Returns all routes in the system as user is admin. (/admin/routes) GET
     * @return Response entity containing json of all routes.
     */
    public ResponseEntity<String> routesGet() {
        ResponseEntity<String> response;
        HttpStatus responseStatus = HttpStatus.OK;
        String json = AdminProcedures.getRoutes(userID);
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
     * Get one specific route for editing, this includes locations. (/admin/route) GET
     * @param routeID The id of route to be edited.
     * @return Json of the route to be edited or Error json if not found.
     */
    public ResponseEntity<String> routeGet(String routeID) {
        ResponseEntity<String> response;
        HttpStatus responseStatus = HttpStatus.OK;
        String json = AdminProcedures.getRoute(routeID, userID);
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
     * Post for creating new routes. (/admin/route) POST
     * @param headers get route-json from headers and post to database, specification in api documentation.
     * @return OK response or error.
     */
    public ResponseEntity<String> routePost(String body) {
        ResponseEntity<String> response;
        if(body.isEmpty() || body == null){
            response = new ResponseEntity<>("{\"error\" : \"Internal Server Error.\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            response = new ResponseEntity<>("{\"OK\" : \"Request recieved by server.\"}", HttpStatus.OK);
            Gson gson = new Gson();
            Root r;
            r = gson.fromJson(body, Root.class);
            int numLocations = r.route.locations;
            AdminProcedures.createRoute(r.route.title, r.route.description, r.route.type, numLocations);
        }
        return response;
    }

    /**
     * Patch to route, include the parts that should be updated. (/admin/route) PATCH
     * @param headers For getting Json string containing the id and requested changes to the route.
     * @return OK message body if sucessfull, error with details if not.
     */
    public ResponseEntity<String> routePatch(Map<String, String> headers) {
        ResponseEntity<String> response;
        response = new ResponseEntity<>("{\"error\" : \"not implemented\"}", HttpStatus.NOT_IMPLEMENTED);
        return response;
    }

    /**
     * Delete route if exists. (/admin/route) DELETE
     * @param routeID ID for route to be deleted.
     * @return OK if deleted, Error if not found.
     */
    public ResponseEntity<String> routeDelete(String routeID) {
        ResponseEntity<String> response;
        if(routeID.isEmpty() || routeID == null){
            response = new ResponseEntity<>("{\"error\" : \"Internal Server Error.\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            response = new ResponseEntity<>("{\"OK\" : \"Request recieved by server.\"}", HttpStatus.OK);
            AdminProcedures.deleteRoute(routeID);
        }
        return response;
    }
}
