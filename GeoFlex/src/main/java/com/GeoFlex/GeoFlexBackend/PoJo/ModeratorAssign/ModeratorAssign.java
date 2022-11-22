package com.GeoFlex.GeoFlexBackend.PoJo.ModeratorAssign;

import java.util.List;
import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class ModeratorAssign {

    @SerializedName("user-id")
    @Expose
    public String userId;
    @SerializedName("access-level")
    @Expose
    public String accessLevel;
    @SerializedName("route")
    @Expose
    public List<Route> route = null;

}