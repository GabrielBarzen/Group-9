package com.GeoFlex.GeoFlexBackend.Controllers.CLI;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.DatabaseConfiguration;
/**
 * Inteface for regestering the {@link DatabaseConfiguration}
 * @author Gabriel Modin Bärzén
 * @version 1.0
 */
public interface CLIDatabaseInterface {
    /**
     * Class for regestering the configuration object in {@link CLIDataBaseController}.
     * @param databaseConfiguration the configuration to register.
     */
    public void registerCLIDatabaseConfigurator(DatabaseConfiguration databaseConfiguration);
}
