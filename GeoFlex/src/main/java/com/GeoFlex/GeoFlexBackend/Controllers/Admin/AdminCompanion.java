package com.GeoFlex.GeoFlexBackend.Controllers.Admin;

import com.GeoFlex.GeoFlexBackend.Controllers.Authentication.Authenticator;
import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AdminProcedures;
import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AuthenticationProcedures;
import com.GeoFlex.GeoFlexBackend.PoJo.ModeratorAssign.ModeratorAssign;
import com.GeoFlex.GeoFlexBackend.PoJo.ModeratorAssign.Route;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Root;
import com.GeoFlex.GeoFlexBackend.PoJo.RouteUpdate.RootUpdate;
import com.GeoFlex.GeoFlexBackend.Process.FileHandler;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Objects;

public class AdminCompanion {

    final String userID;

    public String getUserID() {
        return userID;
    }

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
     * @param body get route-json from headers and post to database, specification in api documentation.
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
     * @param body For getting Json string containing the id and requested changes to the route.
     * @return OK message body if sucessfull, error with details if not.
     */
    public ResponseEntity<String> routePatch(String body) {
        ResponseEntity<String> response;
        response = new ResponseEntity<>("{\"error\" : \"Internal server error, contact the admin.\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        Gson gson = new Gson();
        RootUpdate ru = gson.fromJson(body, RootUpdate.class);
        if(ru.routeUpdate.routeId == null){
            return new ResponseEntity<>("Bad request", HttpStatus.BAD_REQUEST);
        }
        if(ru.routeUpdate.title != null){
            AdminProcedures.routeUpdateTitle(ru.routeUpdate.routeId, ru.routeUpdate.title);
            response = new ResponseEntity<>("", HttpStatus.OK);
        }
        if(ru.routeUpdate.description != null){
            AdminProcedures.routeUpdateDescription(ru.routeUpdate.routeId, ru.routeUpdate.description);
            response = new ResponseEntity<>("", HttpStatus.OK);
        }
        if(ru.routeUpdate.type != null){
            AdminProcedures.routeUpdateType(ru.routeUpdate.routeId, ru.routeUpdate.type);
            response = new ResponseEntity<>("", HttpStatus.OK);
        }
        if(ru.routeUpdate.image != null){
            System.out.println(ru.routeUpdate.image);
            response = new ResponseEntity<>("", HttpStatus.OK);
        }
        if(ru.routeUpdate.location != null){
            for (int i = 0; i < ru.routeUpdate.location.size(); i++) {
                if(ru.routeUpdate.location.get(i).to != null){
                    try {
                        System.out.println("swapping from: " + Integer.parseInt(ru.routeUpdate.location.get(i).from) + ", to :" +  Integer.parseInt(ru.routeUpdate.location.get(i).to));
                        AdminProcedures.routeSwapLocation(Integer.parseInt(ru.routeUpdate.location.get(i).from), Integer.parseInt(ru.routeUpdate.location.get(i).to));
                        response = new ResponseEntity<>("", HttpStatus.OK);
                    } catch (NumberFormatException e) {
                        System.out.println("excepting swap");
                        response = new ResponseEntity<>("{\"error\" : \"malformatted input\"}", HttpStatus.BAD_REQUEST);
                    }
                } else if (ru.routeUpdate.location.get(i).newLocation != null) {
                    try {
                        System.out.println("addning: " + Integer.parseInt(ru.routeUpdate.location.get(i).newLocation));
                        AdminProcedures.routeNewLocations(Integer.parseInt(ru.routeUpdate.location.get(i).newLocation), Integer.parseInt(ru.routeUpdate.routeId));
                        response = new ResponseEntity<>("", HttpStatus.OK);
                    } catch (NumberFormatException e) {
                        System.out.println("excepting delete");
                        response = new ResponseEntity<>("{\"error\" : \"malformatted input\"}", HttpStatus.BAD_REQUEST);
                    }
                }
                else {
                    try {
                        System.out.println("deleting: " + Integer.parseInt(ru.routeUpdate.location.get(i).delete));
                        AdminProcedures.routeDeleteLocation(Integer.parseInt(ru.routeUpdate.routeId),Integer.parseInt(ru.routeUpdate.location.get(i).delete));
                        FileHandler fh = new FileHandler();
                        fh.deleteFileDirectory(Integer.parseInt(ru.routeUpdate.location.get(i).delete), "locations");
                        response = new ResponseEntity<>("", HttpStatus.OK);
                    } catch (NumberFormatException e) {
                        System.out.println("excepting delete");
                        response = new ResponseEntity<>("{\"error\" : \"malformatted input\"}", HttpStatus.BAD_REQUEST);
                    }
                }
            }
        }
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
            FileHandler fh = new FileHandler();
            fh.deleteFileDirectory(Integer.parseInt(routeID), "routes");
        }
        return response;
    }

    /**
     * Gets all locations related to a route by its ID.
     * @param routeID The id of the route.
     * @return Json object containing all locations of a route.
     */
    public ResponseEntity<String> routeGetLocations(String routeID) {
        ResponseEntity<String> response;
        if(routeID.isEmpty() || routeID == null){
            response = new ResponseEntity<>("{\"error\" : \"Internal Server Error.\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            String json = AdminProcedures.getRouteLocations(routeID);
            response = new ResponseEntity<>(json, HttpStatus.OK);
        }
        return response;
    }

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
