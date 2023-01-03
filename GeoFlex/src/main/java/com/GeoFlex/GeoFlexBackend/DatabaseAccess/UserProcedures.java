package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import com.GeoFlex.GeoFlexBackend.PoJo.Route.Content;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.FullRouteUser.*;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Location;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Root;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Route;
import com.google.gson.Gson;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserProcedures {

    /**
     * Returns a full quiz or info route from the database.
     * @param routeId The id of the route.
     * @param routeCode The code of the route.
     * @return Json object with route information.
     */
    public String getRouteFromDatabase(String routeId, String routeCode){
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_full_route_no_imgvideo(?, ?)}")){
            cs.setInt("in_route_id", Integer.parseInt(routeId));
            cs.setInt("in_route_code", Integer.parseInt(routeCode));
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            Root r = new Root();
            boolean first = true;
            String currentLocationId = "0";
            Location currentLocation = new Location();
            while(res.next()){
                if (first) {
                    r.route = new Route();
                    r.route.id = res.getString("route_id");
                    r.route.code = res.getString("code");
                    r.route.title = res.getString("title");
                    r.route.description = res.getString("description");
                    r.route.type = res.getString("type");
                    r.route.location = new ArrayList<>();
                }
                if (!currentLocationId.equals(res.getString("location_id"))) {
                    if (!first) {
                        r.route.location.add(currentLocation);
                    } else {
                        first = false;
                    }
                    currentLocationId = res.getString("location_id");
                    currentLocation = new Location();
                    currentLocation.content = new ArrayList<>();
                    currentLocation.id = currentLocationId;
                    currentLocation.name = res.getString("name");
                    currentLocation.text_info = res.getString("text_info");
                }
                if (r.route.type.equals("QUIZ")) {
                    Content content = new Content();
                    content.answer = res.getString("answer");
                    content.correct = res.getBoolean("correct");
                    currentLocation.content.add(content);
                }
            }
            r.route.location.add(currentLocation);
            Gson gson = new Gson();
            return gson.toJson(r);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return null;
    }

    /**
     * Retrieves a complete route from the database that contains everything needed to start a game.
     * @param routeCode The code of the route.
     * @return Json object containing everything needed ti start a game.
     */
    public String getFullRouteFromDatabase(String routeCode) {
        DatabaseConnection dc = new DatabaseConnection();
        RootFullRouteUser r = new RootFullRouteUser();
        try(CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_full_route_for_user(?)}")){
            //cs.setInt("in_route_id", Integer.parseInt("0"));
            cs.setInt("in_route_code", Integer.parseInt(routeCode));
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            String currentLocationId = "0";
            String currentRouteId = "0";
            LocationFullRouteUser lfr = new LocationFullRouteUser();
            List<RouteFullRouteUser> list = new ArrayList<>();
            while(res.next()){
                if (!currentRouteId.equals(res.getString("route_id"))){
                    currentRouteId = res.getString("route_id");
                    r.route = new RouteFullRouteUser();
                    r.route.id = res.getString("route_id");
                    r.route.code = res.getString("code");
                    r.route.title = res.getString("title");
                    r.route.description = res.getString("description");
                    r.route.type = res.getString("type");
                    r.route.routeMedia = new ArrayList<>();
                    MediaFullRouteUser routeMedia = new MediaFullRouteUser();
                    routeMedia.mediaURL = res.getString("routeMedia");
                    routeMedia.mediaType = res.getString("routeMediaType");
                    routeMedia.externalMedia = res.getBoolean("routeExternalMedia");
                    r.route.routeMedia.add(routeMedia);
                    r.route.location = new ArrayList<>();
                    list.add(r.route);
                }
                if(!currentLocationId.equals(res.getString("location_id"))){
                    lfr = new LocationFullRouteUser();
                    currentLocationId = res.getString("location_id");
                    lfr.name = res.getString("name");
                    lfr.textInfo = res.getString("text_info");
                    lfr.locationId = res.getString("location_id");
                    lfr.locationIndex = res.getString("location_index");
                    lfr.lastLocation = String.valueOf(res.getBoolean("last_location"));
                    lfr.qr = String.valueOf(res.getBoolean("qr"));
                    lfr.xCoords = res.getString("x_coordinate");
                    lfr.yCoords = res.getString("y_coordinate");
                    lfr.directions = res.getString("directions");
                    lfr.media = new ArrayList<>();
                    lfr.content = new ArrayList<>();
                    r.route.location.add(lfr);

                    if(res.getString("data") != null){
                        MediaFullRouteUser media = new MediaFullRouteUser();
                        media.mediaURL = res.getString("data");
                        media.mediaType = res.getString("dataType");
                        media.externalMedia = res.getBoolean("external_media");
                        lfr.media.add(media);
                    }
                }
                if(res.getString("content_id") != null){
                    ContentFullRouteUser content = new ContentFullRouteUser();
                    content.answer = res.getString("answer");
                    content.correct = res.getBoolean("correct");
                    content.contentId = res.getString("content_id");
                    lfr.content.add(content);
                }
            }
            Gson gson = new Gson();
            return gson.toJson(list);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * Updates that the route has been completed.
     * @param routeId The id of the route that was completed.
     */
    public void updateRouteStatsFinished(String routeId) {
        DatabaseConnection dc = new DatabaseConnection();
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_update_route_finished(?)}")) {
            cs.setInt("in_route_id", Integer.parseInt(routeId));
            cs.executeQuery();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }
}
