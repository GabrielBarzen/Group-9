package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import java.sql.*;

public class DatabaseConnection {

    private String username = "root";
    private String password = "RLMK5xFqRb5i2QsJyDyo39xxr9JPxJpnZj";
    private Connection conn;

    /**
     * Connects to the database.
     */
    public DatabaseConnection(){
        try {
            conn = DriverManager.getConnection("jdbc:mariadb://gabnet.se:33306/GeoFlex?user="+username+"&password="+password);
            System.out.println("Connected to database.");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Test function.
     */
    public void queryTest(){
        try(PreparedStatement statement = conn.prepareStatement("SELECT * FROM route")) {
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
     * Returns the connection.
     * @return conn
     */
    public Connection getConnection(){
        return this.conn;
    }
}
