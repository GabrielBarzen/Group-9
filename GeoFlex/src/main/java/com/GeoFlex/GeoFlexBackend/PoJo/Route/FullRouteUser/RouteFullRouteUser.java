
package com.GeoFlex.GeoFlexBackend.PoJo.Route.FullRouteUser;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class RouteFullRouteUser {

    @SerializedName("title")
    @Expose
    public String title;
    @SerializedName("description")
    @Expose
    public String description;
    @SerializedName("type")
    @Expose
    public String type;
    @SerializedName("id")
    @Expose
    public String id;
    @SerializedName("code")
    @Expose
    public String code;
    @SerializedName("location")
    @Expose
    public List<LocationFullRouteUser> location = null;
    @SerializedName("routeMedia")
    @Expose
    public ArrayList<MediaFullRouteUser> routeMedia;
}
