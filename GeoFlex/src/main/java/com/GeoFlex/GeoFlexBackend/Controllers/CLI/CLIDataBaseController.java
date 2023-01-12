package com.GeoFlex.GeoFlexBackend.Controllers.CLI;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.DatabaseConfiguration;

public class CLIDataBaseController implements CLIDatabaseInterface {

    public static CLIDataBaseController cliDataBaseController;
    private DatabaseConfiguration databaseConfiguration;
    public CLIDataBaseController(){
        cliDataBaseController = this;
    }

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
                    "====================";

    public void runCommand(String[] inputSplitArray){
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

    public void ipGet() {
        String ip = databaseConfiguration.getIp();
        if (Character.isDigit(databaseConfiguration.getIp().charAt(0))) {
            System.out.println("IP is : " + ip);
        } else {
            System.out.println("URI is : " + ip);
        }
    }

    public void ipSet(String s) {
        System.out.println("Setting ip to : " + s);
        databaseConfiguration.setIp(s);
        System.out.println("ip set to : " + s);
    }


    @Override
    public void registerCLIDatabaseConfigurator(DatabaseConfiguration databaseConfiguration) {
        this.databaseConfiguration = databaseConfiguration;
    }

    public void passwordGet() {
    }

    public void passwordSet(String s) {
        System.out.println("Setting password to : " + s);
        databaseConfiguration.setPassword(s);
        System.out.println("password set to : " + s);
    }

    public void usernameGet() {
    }

    public void usernameSet(String s) {
        System.out.println("Setting usernme to : " + s);
        databaseConfiguration.setUsername(s);
        System.out.println("usernme set to : " + s);
    }

    public void portGet() {
    }

    public void portSet(String s) {
        System.out.println("Setting port to : " + s);
        databaseConfiguration.setPort(s);
        System.out.println("port set to : " + s);
    }

    public void connectionGet() {
        String str =
                "======Conn======\n" +
                "URI: " + databaseConfiguration.getIp() + ":" + databaseConfiguration.getPort() + "\n"+
                "USER: " + databaseConfiguration.getUsername() + "\n"+
                "PASS: " + databaseConfiguration.getPassword() + "\n" +
                "======Conn======\n";
        System.out.println(str);
    }
}
