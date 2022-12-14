
package com.GeoFlex.GeoFlexBackend.PoJo.Route.FullRouteUser;

import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class MediaFullRouteUser {

    @SerializedName("mediaURL")
    @Expose
    public String mediaURL;
    @SerializedName("mediaType")
    @Expose
    public String mediaType;
    @SerializedName("externalMedia")
    @Expose
    public Boolean externalMedia;

}
