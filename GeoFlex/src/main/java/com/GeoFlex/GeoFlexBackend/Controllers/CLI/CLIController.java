package com.GeoFlex.GeoFlexBackend.Controllers.CLI;
import org.springframework.context.annotation.Configuration;

import java.util.Scanner;

@Configuration
public class CLIController {


    public CLIController(){
        start();
    }

    class CLIThread implements Runnable {

        private final String databaseHelp =
                "==database==Help====" + "\n"+
                        "Available commands :"+"\n"+
                        "ip set {IP}           , set ip for current session"+ "\n"+
                        "port set {PORT}       , set port for current session"+ "\n"+
                        "username set {USER}   , set username for current session"+ "\n"+
                        "password set {PASS}   , set password for current session"+ "\n"+
                        "ip get                , get ip for current session"+ "\n"+
                        "port get              , get port for current session"+ "\n"+
                        "username get          , get username for current session"+ "\n"+
                        "password get          , get password for current session"+ "\n"+
                        "connection get        , get current db connection info"+ "\n"+
                        "===================="+"\n";

        Scanner scanner = new Scanner(System.in);

        @Override
        public void run() {
            while (running) {
                String input = scanner.nextLine();
                String[] inputSplitArray = input.split(" ");
                switch (inputSplitArray[0]) {
                    case "exit" -> {
                        System.out.println("shutting down now");
                        exit();
                    }
                    case "database" -> {
                        if (inputSplitArray.length>2) {
                            switch (inputSplitArray[1]) {
                                case "ip" -> {
                                    switch ((inputSplitArray[2])) {
                                        case "set" -> {
                                            if (inputSplitArray.length >= 4) ipSet(inputSplitArray[3]);
                                            else {
                                                System.out.println("IP set requires one additional parameter IP");
                                            }
                                        }
                                        case "get" -> ipGet();
                                        default -> {
                                            System.out.println("Help :");
                                            System.out.println("Available commands :");
                                            System.out.println("set {ip}");
                                            System.out.println("get");
                                        }

                                    }
                                }
                                case "port" -> {
                                    switch ((inputSplitArray[2])) {
                                        case "set" -> {
                                            if (inputSplitArray.length >= 4) portSet(inputSplitArray[3]);
                                            else {
                                                System.out.println("port set requires one additional parameter PORT");
                                            }
                                        }
                                        case "get" -> portGet();

                                        default -> {
                                            System.out.println("Help :");
                                            System.out.println("Available commands :");
                                            System.out.println("set {port}");
                                            System.out.println("get");
                                        }
                                    }
                                }
                                case "username" -> {
                                    switch ((inputSplitArray[2])) {
                                        case "set" -> {
                                            if (inputSplitArray.length >= 4) usernameSet(inputSplitArray[3]);
                                            else {
                                                System.out.println("username set requires one additional parameter USERNAME");
                                            }
                                        }
                                        case "get" -> usernameGet();

                                        default -> {
                                            System.out.println("Help :");
                                            System.out.println("Available commands :");
                                            System.out.println("set {username}");
                                            System.out.println("get");

                                        }
                                    }
                                }
                                case "password" -> {
                                    switch ((inputSplitArray[2])) {
                                        case "set" -> {
                                            if (inputSplitArray.length >= 4) passwordSet(inputSplitArray[3]);
                                            else {
                                                System.out.println("password set requires one additional parameter PASSWORD");
                                            }
                                        }
                                        case "get" -> passwordGet();
                                        default -> {
                                            System.out.println("Help :");
                                            System.out.println("Available commands :");
                                            System.out.println("set {password}");
                                            System.out.println("get");


                                        }
                                    }
                                }
                                case "connection" -> {
                                    switch ((inputSplitArray[2])) {
                                        case "get" -> connectionGet();
                                        default -> {
                                            System.out.println("Help :");
                                            System.out.println("Available commands :");
                                            System.out.println("set {password}");
                                            System.out.println("get");


                                        }
                                    }
                                }

                                default -> System.out.println(databaseHelp);
                            }
                        } else System.out.println(databaseHelp);


                    }
                    case "user" -> {
                        new CLIUserController(inputSplitArray);
                    }
                    default -> {
                        System.out.println("Help :");
                        System.out.println("Available commands :");
                        System.out.println("database");
                        System.out.println("exit");
                    }
                }
            }
        }
    }




    ////CLI DataBase Methods
    private void connectionGet() {
        cliDataBaseController.connectionGet();
    }
    CLIDataBaseController cliDataBaseController = new CLIDataBaseController();

    private void ipGet() {
        cliDataBaseController.ipget();
    }

    private void ipSet(String ip) {
        cliDataBaseController.ipSet(ip);
    }

    private void passwordGet() {
        cliDataBaseController.passwordGet();
    }

    private void passwordSet(String s) {
        cliDataBaseController.passwordSet(s);
    }

    private void usernameGet() {
        cliDataBaseController.usernmeGet();
    }

    private void usernameSet(String s) {
        cliDataBaseController.usernmeSet(s);
    }

    private void portGet() {
        cliDataBaseController.portGet();
    }

    private void portSet(String s) {
        cliDataBaseController.portSet(s);
    }


    ////Threading Methods
    private void exit() {
        running = false;
        System.exit(0);
    }

    Thread thread = null;
    boolean running = false;

    public boolean start() {
        if (!running) {
            thread = new Thread(new CLIThread());
            thread.start();
            running = true;
        } else {
            System.out.println("Already running");
        }
        return running;
    }
    public boolean stop(){
        if (running) running = false;
        return running;
    }

    public boolean isRunning(){
        return running;
    }

}

