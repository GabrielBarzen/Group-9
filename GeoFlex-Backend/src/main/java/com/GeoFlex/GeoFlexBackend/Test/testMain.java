package com.GeoFlex.GeoFlexBackend.Test;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.DatabaseConnection;
import com.GeoFlex.GeoFlexBackend.Process.VideoManager;

import java.io.IOException;

public class testMain {
    public static void main(String[] args) throws IOException {
        //DatabaseConnection dc = new DatabaseConnection();
        //dc.queryTest();

        VideoManager vm = new VideoManager();
        vm.convertToWebm();
    }
}
