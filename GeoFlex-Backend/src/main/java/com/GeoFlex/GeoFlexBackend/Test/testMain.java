package com.GeoFlex.GeoFlexBackend.Test;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.DatabaseConnection;

public class testMain {
    public static void main(String[] args) {
        DatabaseConnection dc = new DatabaseConnection();
        dc.queryTest();
    }
}
