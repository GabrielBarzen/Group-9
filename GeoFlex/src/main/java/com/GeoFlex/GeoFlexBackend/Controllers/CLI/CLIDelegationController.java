package com.GeoFlex.GeoFlexBackend.Controllers.CLI;

/**
 * Inteface for specifying how CLI instructions are recieved by delegation classes.
 * @author Gabriel Modin Bärzén
 * @version 1.0
 */
public interface CLIDelegationController {
    /**
     * Run cli command.
     * @param inputSplitArray the array containing the input.
     */
    public void runCommand(String[] inputSplitArray);

}
