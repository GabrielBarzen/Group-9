package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import com.GeoFlex.GeoFlexBackend.PoJo.Route.Content;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Location;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Root;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Route;
import com.google.gson.Gson;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ModeratorProcedures {

    /**
     * Method to get all the routes from the database.
     *
     * @param userID The user id.
     * @return The routes as a string.
     */
    public static String getRoutes(String userID) {
        DatabaseConnection dc = new DatabaseConnection();
        String response = "";
        System.out.println("Starting cs");
        List<Route> routes = new ArrayList<>();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_all_routes_for_user(?)}")) {
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
        }
        catch (SQLException e) {
            response = null;
        } catch (NumberFormatException e) {
            response = null;
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        System.out.println(response);
        return response;
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
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return null;
    }

    /**
     * Delets a location in a route.
     * @param routeId The route id.
     * @param locationIdDelete The location id to delete.
     */
    public static void routeDeleteLocation(int routeId, int locationIdDelete) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_delete_location(?,?)}")) {
            cs.setInt("in_route_id", routeId);
            cs.setInt("in_location_id", locationIdDelete);
            cs.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * Swaps two locations indexes with each other.
     * @param locationIdFrom The id from where to swap.
     * @param locationIdTo The id to swap with.
     */
    public static void routeSwapLocation(int locationIdFrom, int locationIdTo) {
        System.out.println("from id : " + locationIdFrom);
        System.out.println("to id : " + locationIdTo);
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_swap_location(?,?)}")) {
            cs.setInt(1, locationIdFrom);
            cs.setInt(2, locationIdTo);
            cs.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * Updates a route title.
     * @param routeID The id of the route.
     * @param title The new title of the route.
     */
    public static void routeUpdateTitle(String routeID, String title){
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_route_title(?, ?)}")) {
            cs.setString("in_route_id", String.valueOf(routeID));
            cs.setString("in_title", title);
            cs.executeQuery();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * Updates description of a route.
     * @param routeID The id of the route.
     * @param description The new description of the route.
     */
    public static void routeUpdateDescription(String routeID, String description){
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_route_description(?, ?)}")) {
            cs.setString("in_route_id", String.valueOf(routeID));
            cs.setString("in_description", description);
            cs.executeQuery();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * Updates the route type.
     * @param routeID The id of the route.
     * @param type The description of the route.
     */
    public static void routeUpdateType(String routeID, String type){
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_route_type(?, ?)}")) {
            cs.setString("in_route_id", String.valueOf(routeID));
            cs.setString("in_type", type);

            cs.executeQuery();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * Gets all locations of a route from the database.
     * @param routeID The id of the route.
     * @return Json containing all locations of a specific route.
     */
    public static String getRouteLocations(String routeID) {
        DatabaseConnection dc = new DatabaseConnection();
        Root r = new Root();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_locations_for_route(?)}")) {
            cs.setInt("in_route_id", Integer.parseInt(routeID));
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            boolean first = true;
            Location currentLocation = new Location();
            while(res.next()){
                if(first){
                    r.route = new Route();
                    r.route.location = new ArrayList<>();
                }
                if (!first) {
                    r.route.location.add(currentLocation);
                } else {
                    first = false;
                }
                currentLocation = new Location();
                currentLocation.name = res.getString("name");
                currentLocation.text_info = res.getString("text_info");
                currentLocation.id = res.getString("id");
                currentLocation.location_index = res.getString("location_index");
                currentLocation.last_location = String.valueOf(res.getBoolean("last_location"));
            }
            r.route.location.add(currentLocation);
            Gson gson = new Gson();
            System.out.println(gson.toJson(r));
            return gson.toJson(r);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * Adds new locations to a route in the database.
     * @param numLocations Amount of locations to add.
     * @param routeId The id of the route.
     */
    public static void routeNewLocations(int numLocations, int routeId) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_route_add_location(?, ?)}")) {
            cs.setInt("in_num_locations", numLocations);
            cs.setInt("in_route_id", routeId);

            cs.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * Uploads a file path to the database.
     * @param routeId The id of the route.
     * @param filePath The path to save in the database.
     */
    public static void routeUploadFile(int routeId, String filePath) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_route_image(?, ?)}")) {
            cs.setInt("in_route_id", routeId);
            cs.setString("in_image", filePath);
            cs.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * Retrivies a filepath from the database.
     * @param routeId The id of the route to retrieve from.
     * @return Filepath of a video or image saved on the server.
     */
    public static String routeGetFile(int routeId){
        DatabaseConnection dc = new DatabaseConnection();
        String filepath = "";
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_route_imgvid(?)}")) {
            cs.setInt("in_route_id", routeId);
            cs.execute();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                 filepath = res.getString("image");
            }
            Gson gson = new Gson();
            return gson.toJson(filepath);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
