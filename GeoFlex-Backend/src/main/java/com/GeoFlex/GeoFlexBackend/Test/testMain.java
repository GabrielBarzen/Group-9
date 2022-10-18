package com.GeoFlex.GeoFlexBackend.Test;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.DatabaseConnection;
import com.GeoFlex.GeoFlexBackend.DatabaseAccess.Procedures;
import com.GeoFlex.GeoFlexBackend.PoJo.JsonManager;
import com.GeoFlex.GeoFlexBackend.PoJo.Root;
import com.google.gson.*;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class testMain {
    public static void main(String[] args) throws IOException {
        //DatabaseConnection dc = new DatabaseConnection();
        //Pass the DataBaseConnection object to the constructor.
        //Procedures procedures = new Procedures(dc);
        //procedures.queryTest();
        //procedures.createRoute("Runescape Quiz", "A quiz about the game runescape", "QUIZ");

        //VideoManager vm = new VideoManager();
        //vm.convertToWebm();

        JsonManager jm = new JsonManager();
        File input = new File("src/main/resources/ExampleRoute.json");
        //jm.identifyThenCreateRoute(input);
        System.out.println(jm.getRouteFromDatabaseAsJson(572748));
        //Procedures p = new Procedures(new DatabaseConnection());
        //System.out.println(p.getRouteFromDatabase(3, 0)[0]);
    }
}
