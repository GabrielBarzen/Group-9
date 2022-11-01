package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import com.GeoFlex.GeoFlexBackend.PoJo.Route.Content;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Location;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Root;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Route;
import com.google.gson.Gson;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AdminProcedures {


    /**
     * Method to get all the routes from the database.
     *
     * @param userID The user id.
     * @return The routes as a string.
     */
    public static String getRoutes(String userID) {
        DatabaseConnection dbc = new DatabaseConnection();
        String response = "";
        System.out.println("Starting cs");
        List<Route> routes = new ArrayList<>();
        try (CallableStatement cs = dbc.getConnection().prepareCall("{CALL sp_get_all_routes_for_user(?)}")) {
            cs.setInt("in_user_id", Integer.parseInt(userID));
            System.out.println("executing");
            cs.executeQuery();
            System.out.println("executed");
            ResultSet res = cs.getResultSet();
            while (res.next()) {
                Route route = new Route();
                route.id = res.getString("id");
                route.title = res.getString("title");
                route.description = res.getString("description");
                route.type = res.getString("type");
                route.code = res.getString("code");
                route.locations = res.getInt("locations");
                routes.add(route);
            }
            Gson gson = new Gson();
            response = gson.toJson(routes);
        } catch (SQLException e) {
            response = null;
        } catch (NumberFormatException e) {
            response = null;
        }
        System.out.println(response);
        return response;
    }

    /**
     * Creats a route in the database and a specified amount of locations.
     *
     * @param title        Title of the route.
     * @param description  Description of the route.
     * @param type         Type of the route IE. QUIZ or INFO
     * @param numLocations Amount of locations to create.
     * @return The route ID as an output parameter.
     */
    public static void createRoute(String title, String description, String type, int numLocations) {
        DatabaseConnection dbc = new DatabaseConnection();
        try (CallableStatement cs = dbc.getConnection().prepareCall("{CALL sp_initialize_route(?, ?, ?, ?, ?, ?)}")) {

            cs.setString(1, title);
            cs.setString(2, description);
            cs.setString(3, type); //QUIZ or INFO
            cs.setInt(4, numLocations);

            //Register the out param from the proecure.
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.executeQuery();

            //Return the out param from the procedure.
            //return cs.getInt(5);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    public static void main(String[] args) {
        getRoute("1","1");
    }
    /**
     * Returns a full quiz or info route from the database.
     *
     * @param routeId The id of the route.
     * @return Json object with route information.
     */
    public static String getRoute(String routeId, String userId) {
        DatabaseConnection dc = new DatabaseConnection();
        Root r = new Root();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_full_route_no_imgvideo_with_id(?, ?, ?)}")) {
            cs.setInt("in_route_id", Integer.parseInt(routeId));
            cs.setInt("in_route_code", 0);
            cs.setInt("in_user_id", Integer.parseInt(userId));
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            boolean first = true;
            String currentLocationId = "0";
            Location currentLocation = new Location();
            while(res.next()){
                if (first) {
                    r.route = new Route();
                    r.route.id = res.getString("id");
                    r.route.title = res.getString("title");
                    r.route.description = res.getString("description");
                    r.route.type = res.getString("type");
                    r.route.code = res.getString("code");
                    r.route.location = new ArrayList<>();
                }
                if (!currentLocationId.equals(res.getString("location_id"))) {
                    //System.out.println("current id : " + currentLocationId);
                    //System.out.println("Current res id : " + res.getString(7));

                    if (!first) {
                        r.route.location.add(currentLocation);
                    } else {
                        first = false;
                    }
                    currentLocationId = res.getString("location_id");
                    currentLocation = new Location();
                    currentLocation.content = new ArrayList<>();
                    currentLocation.id = currentLocationId;
                    currentLocation.name = res.getString("name");
                    currentLocation.text_info = res.getString("text_info");
                }
                if (r.route.type.equals("QUIZ")) {
                    Content content = new Content();
                    content.id = res.getString("id");
                    content.answer = res.getString("answer");
                    content.correct = res.getBoolean("correct");
                    currentLocation.content.add(content);
                }
            }
            r.route.location.add(currentLocation);
            Gson gson = new Gson();
            return gson.toJson(r);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Deletes a route and all related location/content from the database.
     * @param routeId The ID of the route to be deleted.
     */
    public static void deleteRoute(String routeId) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_delete_route_with_id(?)}")) {
            cs.setInt(1, Integer.parseInt(routeId));
            cs.executeQuery();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void routeUpdateTitle(String routeID, String title){
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_route_title(?, ?)}")) {
            cs.setString("in_route_id", String.valueOf(routeID));
            cs.setString("in_title", title);
            cs.executeQuery();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void routeUpdateDescription(String routeID, String description){
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_route_description(?, ?)}")) {
            cs.setString("in_route_id", String.valueOf(routeID));
            cs.setString("in_description", description);
            cs.executeQuery();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void routeUpdateType(String routeID, String type){
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_route_type(?, ?)}")) {
            cs.setString("in_route_id", String.valueOf(routeID));
            cs.setString("in_type", type);
            cs.executeQuery();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
