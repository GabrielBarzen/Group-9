package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;
import java.sql.*;

/**
 * This class handles database connections.
 */

public class DatabaseConnection  {

    /**
     * Declare variables.
     */
    DatabaseConfiguration databaseConfiguration = DatabaseConfiguration.getConfig();

    String ip;
    String username;
    String password;
    String port;

    private final Connection conn;

    /**
     * Connects to the database.
     */
    public DatabaseConnection(){
        ip = databaseConfiguration.getIp();
        username = databaseConfiguration.getUsername();
        password = databaseConfiguration.getPassword();
        port = databaseConfiguration.getPort();


        try {
            //Connect to database.
            conn = DriverManager.getConnection("jdbc:mariadb://"+ip+":"+port+"/GeoFlex?user="+username+"&password="+password);
            //System.out.println("Connected to database.");
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
