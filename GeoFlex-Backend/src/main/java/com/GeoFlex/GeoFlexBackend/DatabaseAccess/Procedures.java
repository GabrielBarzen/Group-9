package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import java.sql.*;

public class Procedures {

    /**
     * Initialize variables.
     */
    DatabaseConnection dc;


    /**
     * Construct the class and set the passed database connection in the param to the local variable.
     * @param dc database connection
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
     * Test function for inserting through stored procedures.
     */
    public void procedureTest(){
        try {
            CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_initialiseRoute(?, ?, ?, ?)}");
            cs.setString(2, "Test Title5");
            cs.setString(3, "Test Description");
            cs.setString(4, "INFO"); //QUIZ or INFO

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
