package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import java.sql.*;

public class Procedures {

    /**
     * Initialize variables.
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
        } ;
    }

    /**
     * Function to create a route in the database.
     * @param title Title of the route.
     * @param description Description of the route.
     * @param type Type of the round, QUIZ or INFO.
     */
    public void createRoute(String title, String description, String type){
        try {
            CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_initialiseRoute(?, ?, ?, ?)}");
            cs.setString(2, title);
            cs.setString(3, description);
            cs.setString(4, type); //QUIZ or INFO

            //Register the out param from the proecure.
            cs.registerOutParameter(1, Types.INTEGER);
            cs.executeQuery();

            //Print the out param from the procedure.
            String outParam1 = cs.getString(1);
            System.out.println(outParam1);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
