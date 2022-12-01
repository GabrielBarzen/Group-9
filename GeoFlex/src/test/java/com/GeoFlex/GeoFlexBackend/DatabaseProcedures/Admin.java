package com.GeoFlex.GeoFlexBackend.DatabaseProcedures;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AdminProcedures;
import org.junit.jupiter.api.BeforeEach;

public class Admin {
    AdminProcedures ap;

    @BeforeEach
    public void init(){
        ap = new AdminProcedures();
    }
}
