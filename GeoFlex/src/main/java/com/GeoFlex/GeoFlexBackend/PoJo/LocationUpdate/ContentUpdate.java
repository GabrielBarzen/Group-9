
package com.GeoFlex.GeoFlexBackend.PoJo.LocationUpdate;

import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class ContentUpdate {

    @SerializedName("new")
    @Expose
    public String _new;
    @SerializedName("delete")
    @Expose
    public String delete;
    @SerializedName("answer")
    @Expose
    public String answer;
    @SerializedName("correct")
    @Expose
    public Boolean correct;
    @SerializedName("content-id")
    @Expose
    public String contentId;
}
