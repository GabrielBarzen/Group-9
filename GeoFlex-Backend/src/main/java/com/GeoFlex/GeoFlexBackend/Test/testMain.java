package com.GeoFlex.GeoFlexBackend.Test;

import com.google.gson.*;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class testMain {
    public static void main(String[] args) throws IOException {
        //DatabaseConnection dc = new DatabaseConnection();
        //Pass the DataBaseConnection objcet to the constructor.
        //Procedures procedures = new Procedures(dc);
        //procedures.queryTest();
        //procedures.createRoute("Runescape Quiz", "A quiz about the game runescape", "QUIZ");

        //VideoManager vm = new VideoManager();
        //vm.convertToWebm();

        File input = new File("src/main/resources/ExampleUploadRouteToDatabase.json");
        JsonElement fileElement = JsonParser.parseReader(new FileReader(input));
        JsonObject fileObject = fileElement.getAsJsonObject();

        //Extract general data
        System.out.println(fileObject);
        System.out.println(fileObject.get("title").getAsString());
        System.out.println(fileObject.get("description").getAsString());

        //Extract data in the array inside the json object.
        JsonArray jsonArray = fileObject.getAsJsonArray("content");
        for(int i = 0; i < jsonArray.size(); i++){
            String value = jsonArray.get(i).getAsJsonObject().get("question").getAsString();
            System.out.println(value);
            //Extract the data from the answers array.
            JsonArray answers = jsonArray.get(i).getAsJsonObject().get("answers").getAsJsonArray();
            System.out.println(answers);
            //System.out.println(answers.get(i).getAsString());
        }
    }
}
