package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.*;

class DatabaseConnectionTest {

    DatabaseConnection dbConn = null;

    @BeforeEach
    void dbConnSetup() {
        dbConn = new DatabaseConnection();
    }

    @Test
    void connectionTest() {
        try {
            assertFalse(dbConn.getConnection().isClosed());
        } catch (SQLException e) {
            fail();
        }
    }
}