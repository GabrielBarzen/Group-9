package com.GeoFlex.GeoFlexBackend.Controllers.CLI;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AuthenticationProcedures;

import java.util.Scanner;

/**
 * Class for executing user command line instructions
 * @author Gabriel Modin Bärzén
 * @version 1.0
 */
public class CLIUserController implements CLIDelegationController {
    /**
     * String containing help information for user level CLI
     */
    private final String userHelp =
            "==user==Help====" + "\n"+
            "Available commands :"+"\n"+
            "get                   , gets all users from database"+ "\n"+
            "password {ID}         , sets the user password using id"+ "\n"+
            "================";

    public void runCommand(String[] inputSplitArray) {
        if (inputSplitArray.length < 2) {
            System.out.println(userHelp);
            return;
        }
        switch(inputSplitArray[1]) {
            case "password" -> {
                AuthenticationProcedures ap = new AuthenticationProcedures();
                if (inputSplitArray.length >= 3) {

                    System.out.println("enter new password");
                    Scanner scanner = new Scanner(System.in);
                    String password = scanner.nextLine();
                    System.out.println("enter password again");
                    String passwordConfirm = scanner.nextLine();
                    if (password.equals(passwordConfirm)) {
                        ap.setUserPassword(inputSplitArray[2], password);
                    } else {
                        System.out.println("Passwords not matching try again");
                    }
                } else {
                    System.out.println("\"password\" requires one additional argument {ID}");
                }
            }
            case "get" -> {
                AuthenticationProcedures ap = new AuthenticationProcedures();


                ap.getAllUsers();

            }
            default -> System.out.println(userHelp);
        }
    }
}
