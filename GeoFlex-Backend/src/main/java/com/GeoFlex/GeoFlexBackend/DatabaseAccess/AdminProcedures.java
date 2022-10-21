package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import com.GeoFlex.GeoFlexBackend.PoJo.Location;
import com.GeoFlex.GeoFlexBackend.PoJo.Root;
import com.GeoFlex.GeoFlexBackend.PoJo.Route;
import com.google.gson.Gson;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AdminProcedures {


    /**
     * Method to get all the routes from the database.
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
            System.out.println("executed" );
            ResultSet res = cs.getResultSet();
            while (res.next()) {
                //id, title, description, type, code,  locations
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
        System.out.println(response);
        return response;
    }

    /**
     * Creats a route in the database and a specified amount of locations.
     * @param title Title of the route.
     * @param description Description of the route.
     * @param type Type of the route IE. QUIZ or INFO
     * @param numLocations Amount of locations to create.
     * @return The route ID as an output parameter.
     */
    public int createRoute(String title, String description, String type, int numLocations){
        DatabaseConnection dbc = new DatabaseConnection();
        try (CallableStatement cs = dbc.getConnection().prepareCall("{CALL sp_initialize_route(?, ?, ?, ?, ?, ?)}")){

            cs.setString(1, title);
            cs.setString(2, description);
            cs.setString(3, type); //QUIZ or INFO
            cs.setInt(4, numLocations);

            //Register the out param from the proecure.
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.executeQuery();

            //Return the out param from the procedure.
            return cs.getInt(5);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
