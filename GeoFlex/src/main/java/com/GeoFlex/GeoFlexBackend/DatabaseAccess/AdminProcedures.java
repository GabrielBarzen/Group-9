package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import com.GeoFlex.GeoFlexBackend.PoJo.Route.Content;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Location;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Root;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Route;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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
        }
        catch (SQLException e) {
            response = null;
        } catch (NumberFormatException e) {
            response = null;
        }
        finally {
            try {
                dbc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
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
        finally {
            try {
                dbc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
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
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

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

    public static void main(String[] args) {
        routeDeleteLocation(42,173);
    }

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

    public static void createModerator(String name, String email, String password, String salt) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_create_moderator(?, ?, ?, ?)}")) {
            cs.setString("in_name", name);
            cs.setString("in_email", email);
            cs.setString("in_password_hashed", password);
            cs.setString("in_salt", salt);

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

    public static String getAllModerators() {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_users_by_role(?)}")) {
            cs.setInt("in_role", 1);
            cs.execute();
            ResultSet res = cs.getResultSet();
            JSONObject jsonObject = new JSONObject();
            JSONArray array = new JSONArray();
            while(res.next()){
                JSONObject row = new JSONObject();
                try {
                    row.put("user-id", res.getInt("id"));
                    row.put("name", res.getString("name"));
                    array.put(row);
                }
                catch (JSONException e){
                    e.printStackTrace();
                }
            }
            try {
                jsonObject.put("moderators", array);
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

    public static String getRoutesForUser(int userId) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_all_routes_for_user(?)}")) {
            cs.setInt("in_user_id", userId);
            cs.execute();
            ResultSet res = cs.getResultSet();
            JSONObject jsonObject = new JSONObject();
            JSONArray array = new JSONArray();
            if (res != null) {
                while (res.next()) {
                    JSONObject row = new JSONObject();
                    try {
                        row.put("id", res.getInt("id"));
                        row.put("title", res.getString("title"));
                        row.put("description", res.getString("description"));
                        row.put("type", res.getString("type"));
                        row.put("code", res.getInt("code"));
                        row.put("locations", res.getInt("locations"));
                        array.put(row);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                try {
                    jsonObject.put("routes-for-user", array);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                System.out.println(jsonObject);
                return jsonObject.toString();
            } else {
                return "Den här moderatorn har inget tilldelat.";
            }
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
