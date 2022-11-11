
package com.GeoFlex.GeoFlexBackend.PoJo.RouteUpdate;

import java.util.List;
import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class RouteUpdate {

    @SerializedName("route-id")
    @Expose
    public String routeId;
    @SerializedName("title")
    @Expose
    public String title;
    @SerializedName("description")
    @Expose
    public String description;
    @SerializedName("image")
    @Expose
    public String image;
    @SerializedName("type")
    @Expose
    public String type;
    @SerializedName("location")
    @Expose
    public List<LocationUpdate> location = null;

}
