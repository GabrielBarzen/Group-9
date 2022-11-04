
package com.GeoFlex.GeoFlexBackend.PoJo.RouteUpdate;

import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class LocationUpdate {

    @SerializedName("from")
    @Expose
    public String from;
    @SerializedName("new")
    @Expose
    public String newLocation;
    @SerializedName("to")
    @Expose
    public String to;
    @SerializedName("delete")
    @Expose
    public String delete;


}
