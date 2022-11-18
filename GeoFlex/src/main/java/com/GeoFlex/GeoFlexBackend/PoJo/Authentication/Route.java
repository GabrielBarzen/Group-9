package com.GeoFlex.GeoFlexBackend.PoJo.Authentication;

import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class Route {

    @SerializedName("assign")
    @Expose
    public String assign;
    @SerializedName("un-assign")
    @Expose
    public String unAssign;

}