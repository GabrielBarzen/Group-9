package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import com.GeoFlex.GeoFlexBackend.PoJo.Location;
import com.GeoFlex.GeoFlexBackend.PoJo.Root;
import com.GeoFlex.GeoFlexBackend.PoJo.Route;
import com.google.gson.Gson;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;

public class AdminProcedures {


    public static String getRoutes(String userID) {
        DatabaseConnection dbc = new DatabaseConnection();
        String response = "";
        System.out.println("Starting cs");
        List<Route> routes = new ArrayList<>();
        try (CallableStatement cs = dbc.getConnection().prepareCall("{CALL sp_get_all_routes_for_user(?)}")) {
            cs.setInt("in_user_id", Integer.parseInt(userID));
            System.out.println("executing");
            cs.executeQuery();
            System.out.println("executed" );
            ResultSet res = cs.getResultSet();
            while (res.next()) {
                //id, title, description, type, code,  locations
                Route route = new Route();
                route.id = res.getString("id");
                route.title = res.getString("title");
                route.description = res.getString("description");
                route.type = res.getString("type");
                route.code = res.getString("code");
                route.locations = res.getInt("locations");
                routes.add(route);
                System.out.println("id = " + res.getString("id"));
                System.out.println("title = " + res.getString("title"));
                System.out.println("description = " + res.getString("description"));
                System.out.println("type = " + res.getString("type"));
                System.out.println("code = " + res.getString("code"));
                System.out.println("locations = " + res.getString("locations"));
            }
            Gson gson = new Gson();
            response = gson.toJson(routes);
        }
        catch (SQLException e) {
            response = null;
        } catch (NumberFormatException e) {
            response = null;
        }
        System.out.println(response);
        return response;
    }
}
