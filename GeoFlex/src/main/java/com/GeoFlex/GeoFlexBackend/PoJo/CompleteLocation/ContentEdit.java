
package com.GeoFlex.GeoFlexBackend.PoJo.CompleteLocation;

import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class ContentEdit {

    @SerializedName("content-id")
    @Expose
    public String contentId;
    @SerializedName("answer")
    @Expose
    public String answer;
    @SerializedName("correct")
    @Expose
    public Boolean correct;

}
