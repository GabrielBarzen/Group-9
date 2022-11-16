package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import com.GeoFlex.GeoFlexBackend.PoJo.LocationUpdate.LocationEdit;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Content;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Location;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Root;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Route;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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

    /**
     * Function to update a locations name in the database.
     * @param locationId The id of the location.
     * @param name The name of the location.
     */
    public static void locationUpdateName(String locationId, String name) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_location_name(?, ?)}")) {
            cs.setString("in_location_id", String.valueOf(locationId));
            cs.setString("in_name", name);
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
     * Function to update a locations text info in the database.
     * @param locationId The id of the location.
     * @param textInfo The text info of the location.
     */
    public static void locationUpdateTextInfo(String locationId, String textInfo) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_location_text_info(?, ?)}")) {
            cs.setString("in_location_id", String.valueOf(locationId));
            cs.setString("in_text_info", textInfo);
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
     * Function to update a location positions x coordinate in the database.
     * @param locationId The id of the location.
     * @param xCoords The locations x coordinate.
     */
    public static void locationPositionUpdateXcoords(String locationId, String xCoords) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_location_position_x_coordinate(?, ?)}")) {
            cs.setString("in_location_id", String.valueOf(locationId));
            cs.setString("in_x_coordinate", xCoords);
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
     * Function to update a location positions y coordinate in the database.
     * @param locationId The id of the location.
     * @param yCoords The locations y coordinate.
     */
     public static void locationPositionUpdateYcoords(String locationId, String yCoords) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_location_position_y_coordinate(?, ?)}")) {
            cs.setString("in_location_id", String.valueOf(locationId));
            cs.setString("in_y_coordinate", yCoords);
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
     * Function to update a location positions directions in the database.
     * @param locationId The id of the location.
     * @param directions The locations directions.
     */
    public static void locationPositionUpdateDirections(String locationId, String directions) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_location_position_directions(?, ?)}")) {
            cs.setString("in_location_id", String.valueOf(locationId));
            cs.setString("in_directions", directions);
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
     * Function to add content to an existing location in the database.
     * @param locationId The id of the location.
     * @param answer The answer to add, will be placeholder until changed.
     * @param correct Wether the answer is correct or not, default value is false.
     */
    public static void createContent(String locationId, String answer, boolean correct, String contentId) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_create_content(?, ?, ?, ?)}")) {
            cs.setString("in_location_id", locationId);
            cs.setString("in_answer", answer);
            cs.setBoolean("in_correct", correct);
            cs.setString("in_content_id", contentId);
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
     * Function to delete content from the database.
     * @param contentId The id of the content to delete.
     */
    public static void deleteContent(String contentId) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_delete_content(?)}")) {
            cs.setString("in_content_id", String.valueOf(contentId));
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
     * Uploads a file path to the database.
     * @param locationId The id of the route.
     * @param filePath The path to save in the database.
     */
    public static void locationUploadFile(int locationId, String filePath) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_location_data(?, ?)}")) {
            cs.setInt("in_location_id", locationId);
            cs.setString("in_data", filePath);
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
     * @param locationId The id of the route to retrieve from.
     * @return Filepath of a video or image saved on the server.
     */
    public static String locationGetFile(int locationId){
        DatabaseConnection dc = new DatabaseConnection();
        String filepath = "";
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_location_get_imgvid(?)}")) {
            cs.setInt("in_location_id", locationId);
            cs.execute();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                filepath = res.getString("data");
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

    /**
     * Retrieves the content for a specific location by its ID.
     * @param locationId The ID of the location.
     * @return Json object containing the content.
     */
    public static String locationGetContent(int locationId){
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_content_for_location(?)}")) {
            cs.setInt("in_location_id", locationId);
            cs.execute();
            ResultSet res = cs.getResultSet();
            JSONObject jsonObject = new JSONObject();
            JSONArray array = new JSONArray();
            while(res.next()){
                JSONObject row = new JSONObject();
                try {
                    row.put("answer", res.getString("answer"));
                    row.put("correct", res.getBoolean("correct"));
                    row.put("content-id", res.getInt("id"));
                    array.put(row);
                }
                catch (JSONException e){
                    e.printStackTrace();
                }
            }
            try {
                jsonObject.put("content", array);
            }
            catch (JSONException e){
                e.printStackTrace();
            }
            return jsonObject.toString();
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
     * Retrieves the position for a specific location by its ID.
     * @param locationId The ID of the location.
     * @return Json object containing the content.
     */
    public static String locationGetPosition(int locationId){
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_location_position_by_id(?)}")) {
            cs.setInt("in_location_id", locationId);
            cs.execute();
            ResultSet res = cs.getResultSet();
            JSONObject jsonObject = new JSONObject();
            JSONArray array = new JSONArray();
            while(res.next()){
                JSONObject row = new JSONObject();
                try {
                    row.put("location-id", res.getInt("location_id"));
                    row.put("long", res.getFloat("x_coordinate"));
                    row.put("lat", res.getFloat("y_coordinate"));
                    row.put("directions", res.getString("directions"));
                    //row.put("qr", res.getBlob("qr"));
                    array.put(row);
                }
                catch (JSONException e){
                    e.printStackTrace();
                }
            }
            try {
                jsonObject.put("location-position", array);
            }
            catch (JSONException e){
                e.printStackTrace();
            }
            return jsonObject.toString();
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
