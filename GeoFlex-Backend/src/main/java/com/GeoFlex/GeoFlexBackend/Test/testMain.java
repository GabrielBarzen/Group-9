package com.GeoFlex.GeoFlexBackend.Test;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.DatabaseConnection;
import com.GeoFlex.GeoFlexBackend.DatabaseAccess.Procedures;
import com.GeoFlex.GeoFlexBackend.Process.VideoManager;

import java.io.IOException;

public class testMain {
    public static void main(String[] args) throws IOException {
        DatabaseConnection dc = new DatabaseConnection();
        //Pass the DataBaseConnection objcet to the constructor.
        Procedures procedures = new Procedures(dc);
        //procedures.queryTest();
        procedures.createRoute("Runescape Quiz", "A quiz about the game runescape", "QUIZ");

        //VideoManager vm = new VideoManager();
        //vm.convertToWebm();
    }
}
