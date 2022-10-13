package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import java.sql.*;

/**
 * This class handles database connections.
 */
public class DatabaseConnection {

    private String username = "root";
    private String password = "RLMK5xFqRb5i2QsJyDyo39xxr9JPxJpnZj";
    private Connection conn;

    /**
     * Connects to the database.
     */
    public DatabaseConnection(){
        try {
            //Connect to database.
            conn = DriverManager.getConnection("jdbc:mariadb://gabnet.se:33306/GeoFlex?user="+username+"&password="+password);
            System.out.println("Connected to database.");
        } catch (SQLException e) {
            System.out.println("Failed to connect to database.");
            throw new RuntimeException(e);
        }
    }

    /**
     * Returns the connection.
     * @return Connection to the database.
     */
    public Connection getConnection(){
        return this.conn;
    }
}
