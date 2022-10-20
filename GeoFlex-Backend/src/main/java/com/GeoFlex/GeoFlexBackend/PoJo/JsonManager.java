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
     * Identifies the route type in the passed input then calls the appropriate method.
     * @param input A Json object.
     * @return True or False depending on input.
     * @throws FileNotFoundException
     */
    public boolean identifyThenCreateRoute(File input) throws FileNotFoundException {
        Gson gson = new Gson();
        Root r;
        r = gson.fromJson(new FileReader(input), Root.class);

        if(r.route.type.equals("QUIZ")){
            //jsonToDatabaseCreateQuiz(input);
            p.getRouteFromDatabase(0, 572748);
            return true;
        }
        else if(r.route.type.equals("INFO"))
        {
            //jsonToDatabaseCreateInfo(input);
            return true;
        }
        else {
            System.out.println("Route has invalid TYPE.");
            return false;
        }
    }

    /**
     * This method extracts the quiz data from the recieved Json object then adds it to the database.
     * @param input A Json object.
     * @throws FileNotFoundException
     */
    public void jsonToDatabaseCreateQuiz(File input,int numLocations) throws FileNotFoundException {
        Gson gson = new Gson();
        Root r;
        r = gson.fromJson(new FileReader(input), Root.class);

        //int variable to hold the out parameter returned from the createRoute method.
        int outParamRoute;
        outParamRoute = p.createRoute(r.route.title, r.route.description, r.route.type, numLocations);
        //int variable to hold the out parameter returned from the createLocation method.
        int outParamLocation;

        for (int i = 0; i < r.route.location.size(); i++) {
            outParamLocation = p.createLocation(outParamRoute, r.route.location.get(i).name, r.route.location.get(i).text_info);
            for (int j = 0; j < r.route.location.get(i).content.size(); j++) {
                p.createContent(outParamLocation, r.route.location.get(i).content.get(j).answer, r.route.location.get(i).content.get(j).correct);
            }
        }
    }

    /**
     * This method extracts the info data from the recieved Json object then adds it to the database.
     * @param input A Json object.
     * @throws FileNotFoundException
     */
    public void jsonToDatabaseCreateInfo(File input, int numLocations) throws FileNotFoundException {
        Gson gson = new Gson();
        Root r;
        r = gson.fromJson(new FileReader(input), Root.class);

        //int Array to hold the out parameters returned from the createRoute method.
        int outParamRoute;
        outParamRoute = p.createRoute(r.route.title, r.route.description, r.route.type, numLocations);

        for (int i = 0; i < r.route.location.size(); i++) {
            p.createLocation(outParamRoute, r.route.location.get(i).name, r.route.location.get(i).text_info);
        }
    }
}
