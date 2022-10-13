package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import java.sql.*;

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
    public int createRoute(String title, String description, String type){
        try {
            CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_initialiseRoute(?, ?, ?, ?, ?)}");
            cs.setString(3, title);
            cs.setString(4, description);
            cs.setString(5, type); //QUIZ or INFO

            //Register the out param from the proecure.
            cs.registerOutParameter(1, Types.INTEGER);
            cs.registerOutParameter(2, Types.INTEGER);
            cs.executeQuery();

            //Print the out param from the procedure.
            int outParam = cs.getInt(1);
            return outParam;
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
        try {
            CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_create_location(?, ?, ?, ?)}");
            cs.setInt(1, routeId);
            cs.setString(2, name);
            cs.setString(3, textInfo);

            //Register the out param from the proecure.
            cs.registerOutParameter(4, Types.INTEGER);
            cs.executeQuery();

            //Print the out param from the procedure.
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
        try {
            CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_create_content(?, ?, ?)}");
            cs.setInt(1, locationId);
            cs.setString(2, answer);
            cs.setBoolean(3, correct);
            cs.executeQuery();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
