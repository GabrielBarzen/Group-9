package com.GeoFlex.GeoFlexBackend.PoJo;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.DatabaseConnection;
import com.GeoFlex.GeoFlexBackend.DatabaseAccess.Procedures;
import com.google.gson.Gson;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;

/**
 * This class handles Json objects and inserts data to the database.
 */
public class JsonManager {

    /**
     * Declare variables
     */

    private DatabaseConnection dc;
    private Procedures p;

    /**
     * Constructs the class then initializes the DatabaseConnection and Procedures objects.
     */
    public JsonManager(){
        //Create a DatabaseConnection.
        dc = new DatabaseConnection();
        //Pass the DatabaseConnection object to the Procedures constructor.
        p = new Procedures(dc);
    }

    /**
     * This method extracts data from the recieved Json object then adds it to the database.
     * @param input A Json object.
     * @throws FileNotFoundException
     */
    public void jsonToDatabaseCreateRoute(File input) throws FileNotFoundException {
        Gson gson = new Gson();
        Root r;
        r = gson.fromJson(new FileReader(input), Root.class);

        //p.createRoute(r.route.title, r.route.description, r.route.type);
        System.out.println("Title: " + r.route.title);
        System.out.println("Description: " +r.route.description);
        System.out.println("Type: " +r.route.type);

        for (int i = 0; i < r.route.location.size(); i++) {
            System.out.println(r.route.location.get(i).id);
            System.out.println(r.route.location.get(i).name);
            System.out.println(r.route.location.get(i).text_info);
            for (int j = 0; j < r.route.location.get(i).content.size(); j++) {
                System.out.print(r.route.location.get(i).content.get(j).answer);
                System.out.print(" " + r.route.location.get(i).content.get(j).correct);
                System.out.println(" "+ r.route.location.get(i).content.get(j).id);
            }
        }
        //String test = gson.toJson(r);
        //System.out.println(test);
    }
}
