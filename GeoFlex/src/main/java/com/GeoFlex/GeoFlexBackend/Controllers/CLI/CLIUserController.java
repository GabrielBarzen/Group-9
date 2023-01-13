package com.GeoFlex.GeoFlexBackend.Controllers.CLI;

import com.GeoFlex.GeoFlexBackend.Controllers.Authentication.Authenticator;
import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AuthenticationProcedures;

import java.sql.SQLOutput;
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
            "get                     , gets all users from database"+ "\n"+
            "password {ID}           , sets the user password using id"+ "\n"+
            "new                     , creates new user"+ "\n"+
            "set-access {ID} {level] , sets the user accesslevel using id"+ "\n"+

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
            case "new" -> {
                AuthenticationProcedures ap = new AuthenticationProcedures();
                Scanner scanner = new Scanner(System.in);
                System.out.println("Enter username");
                String username = scanner.nextLine();
                System.out.println("Enter email");
                String email = scanner.nextLine();
                System.out.println("Enter password");
                String passwprd = scanner.nextLine();
                System.out.println("Confirm password");
                String passwordConfirm = scanner.nextLine();
                if (passwordConfirm.equals(passwordConfirm)) {
                    String salt = Authenticator.generateSalt();
                    String passwordhash = Authenticator.getHash(passwprd,salt);
                    ap.createUser(username,email,salt,passwordhash);
                }
                System.out.println("User created");

            }
            case "set-access" -> {
                if (inputSplitArray.length >= 4) {
                    AuthenticationProcedures ap = new AuthenticationProcedures();
                    ap.setAccessLevelForUser(inputSplitArray[2],inputSplitArray[3]);
                    System.out.println("Acces level set");
                } else {
                    System.out.println("Missing arguments {ID} or access level {0-2}");
                }
            }
            default -> System.out.println(userHelp);
        }
    }
}
