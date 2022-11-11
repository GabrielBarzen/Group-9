
package com.GeoFlex.GeoFlexBackend.PoJo.Authentication;

import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class Login {
    @SerializedName("email")
    @Expose
    public String email;
    @SerializedName("user-name")
    @Expose
    public String userName;
    @SerializedName("password")
    @Expose
    public String password;

}
