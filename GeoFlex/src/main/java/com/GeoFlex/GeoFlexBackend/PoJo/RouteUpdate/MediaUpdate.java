package com.GeoFlex.GeoFlexBackend.PoJo.RouteUpdate;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import javax.annotation.Generated;

@Generated("jsonschema2pojo")
public class MediaUpdate {
    @SerializedName("mediaUrl")
    @Expose
    public String mediaUrl;
    @SerializedName("mediaType")
    @Expose
    public String mediaType;
    @SerializedName("externalMedia")
    @Expose
    public boolean externalMedia;
}
