package com.GeoFlex.GeoFlexBackend.PoJo.Authentication;

import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class Register {

    @SerializedName("user-name")
    @Expose
    public String userName;
    @SerializedName("password")
    @Expose
    public String password;
    @SerializedName("user-email")
    @Expose
    public String userEmail;

}