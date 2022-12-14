package com.GeoFlex.GeoFlexBackend.PoJo.CompleteLocation;

import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class MediaEdit {
    @SerializedName("mediaURL")
    @Expose
    public String mediaURL;
    @SerializedName("mediaType")
    @Expose
    public String mediaType;
    @SerializedName("externalMedia")
    @Expose
    public boolean externalMedia;
}
