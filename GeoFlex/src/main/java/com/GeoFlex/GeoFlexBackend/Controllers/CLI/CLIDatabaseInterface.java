package com.GeoFlex.GeoFlexBackend.Controllers.CLI;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.DatabaseConfiguration;

public interface CLIDatabaseInterface {
    public void registerCLIDatabaseConfigurator(DatabaseConfiguration databaseConfiguration);
}
