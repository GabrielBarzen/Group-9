package com.GeoFlex.GeoFlexBackend.Controllers.CLI;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AuthenticationProcedures;

import java.util.Scanner;

public class CLIUserController {
    public CLIUserController(String[] inputSplitArray) {
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
                }
            }
            case "get" -> {
                AuthenticationProcedures ap = new AuthenticationProcedures();


                ap.getAllUsers();

            }
        }
    }
}
