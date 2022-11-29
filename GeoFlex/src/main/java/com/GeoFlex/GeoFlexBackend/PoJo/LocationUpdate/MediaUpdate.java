package com.GeoFlex.GeoFlexBackend.PoJo.LocationUpdate;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import javax.annotation.Generated;

@Generated("jsonschema2pojo")
public class MediaUpdate {
    @SerializedName("mediaURL")
    @Expose
    public String mediaUrl;
    @SerializedName("mediaType")
    @Expose
    public String mediaType;
}
