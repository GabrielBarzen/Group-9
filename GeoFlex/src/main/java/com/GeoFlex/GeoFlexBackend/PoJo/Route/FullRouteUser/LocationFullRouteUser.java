
package com.GeoFlex.GeoFlexBackend.PoJo.Route.FullRouteUser;

import java.util.List;
import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class LocationFullRouteUser {

    @SerializedName("location_id")
    @Expose
    public String locationId;
    @SerializedName("name")
    @Expose
    public String name;
    @SerializedName("text_info")
    @Expose
    public String textInfo;
    @SerializedName("qr")
    @Expose
    public String qr;
    @SerializedName("location_index")
    @Expose
    public String locationIndex;
    @SerializedName("last_location")
    @Expose
    public String lastLocation;
    @SerializedName("x_coords")
    @Expose
    public String xCoords;
    @SerializedName("y_coords")
    @Expose
    public String yCoords;
    @SerializedName("directions")
    @Expose
    public String directions;
    @SerializedName("content")
    @Expose
    public List<ContentFullRouteUser> content = null;
    @SerializedName("media")
    @Expose
    public List<MediaFullRouteUser> media = null;

}
