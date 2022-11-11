package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import com.GeoFlex.GeoFlexBackend.PoJo.Route.Content;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Location;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Root;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Route;
import com.google.gson.Gson;

import java.sql.*;
import java.util.ArrayList;

/**
 * This class handles all the stored procedures in the database.
 */
public class Procedures {

    /**
     * Declare variables.
     */
    private DatabaseConnection dc;


    /**
     * Construct the class and set the passed database connection in the param to the local variable.
     * @param dc Database Connection object
     */
    public Procedures(DatabaseConnection dc){
        this.dc = dc;
    }

    /**
     * Test function.
     */
    public void queryTest(){
        try(PreparedStatement statement = dc.getConnection().prepareStatement("SELECT * FROM route")) {
            ResultSet rs = statement.executeQuery();
            while(rs.next()){
                System.out.println(rs.getString(1));
                System.out.println(rs.getString(2));
                System.out.println(rs.getString(3));
                System.out.println(rs.getString(4));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Function to create a route in the database.
     * @param title Title of the route.
     * @param description Description of the route.
     * @param type Type of the round, QUIZ or INFO.
     * @return Returns an int holding the route id.
     */
    public int createRoute(String title, String description, String type, int numLocations){
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_initialize_route(?, ?, ?, ?, ?, ?)}")){

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

    /**
     * Method to create a location in the database.
     * @param routeId ID of the route.
     * @param name Name of the route.
     * @param textInfo Text information of the route.
     * @return Returns the location ID.
     */
    public int createLocation(int routeId, String name, String textInfo){
        try(CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_create_location(?, ?, ?, ?)}")) {
            cs.setInt(1, routeId);
            cs.setString(2, name);
            cs.setString(3, textInfo);

            //Register the out param from the proecure.
            cs.registerOutParameter(4, Types.INTEGER);
            cs.executeQuery();

            //Return the out param from the procedure.
            int outParam;
            outParam = cs.getInt(4);
            return outParam;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Method to create content in the database.
     * @param locationId The locations ID.
     * @param answer The answers.
     * @param correct Boolean that says if answer is correct or not.
     */
    public void createContent(int locationId, String answer, boolean correct){
        try(CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_create_content(?, ?, ?)}")) {
            cs.setInt(1, locationId);
            cs.setString(2, answer);
            cs.setBoolean(3, correct);
            cs.executeQuery();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    /**
     * Returns a full quiz or info route from the database.
     * @param routeId The id of the route.
     * @param routeCode The code of the route.
     * @return Json object with route information.
     */
    public Route getRouteFromDatabase(int routeId, int routeCode){
        Root r = new Root();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_full_route_no_imgvideo(?, ?)}")){
            cs.setInt(1, routeId);
            cs.setInt(2, routeCode);
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            boolean first = true;
            String currentLocationId = "0";
            Location currentLocation = new Location();
            while(res.next()){
                if (first) {
                    r.route = new Route();
                    r.route.id = res.getString(1);
                    r.route.code = res.getString(2);
                    r.route.title = res.getString(3);
                    r.route.description = res.getString(4);
                    r.route.type = res.getString(5);
                    r.route.location = new ArrayList<>();
                }
                if (!currentLocationId.equals(res.getString(6))) {
                    System.out.println("current id : " + currentLocationId);
                    System.out.println("Current res id : " + res.getString(7));

                    if (!first) {
                        r.route.location.add(currentLocation);
                    } else {
                        first = false;
                    }
                    currentLocationId = res.getString(6);
                    currentLocation = new Location();
                    currentLocation.content = new ArrayList<>();
                    currentLocation.id = currentLocationId;
                    currentLocation.name = res.getString(7);
                    currentLocation.text_info = res.getString(8);
                }
                if (r.route.type.equals("QUIZ")) {
                    Content content = new Content();
                    content.id = res.getString(9);
                    content.answer = res.getString(10);
                    content.correct = res.getBoolean(11);
                    currentLocation.content.add(content);
                }
            }
            r.route.location.add(currentLocation);

            Gson gson = new Gson();
            System.out.println(gson.toJson(r.route));
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return r.route;
    }
}
