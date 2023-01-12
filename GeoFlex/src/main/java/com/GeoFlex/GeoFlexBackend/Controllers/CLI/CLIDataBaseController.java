package com.GeoFlex.GeoFlexBackend.Controllers.CLI;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.DatabaseConfiguration;

/**
 * Class for executing databse command line instructions
 * @author Gabriel Modin Bärzén
 * @version 1.0
 */
public class CLIDataBaseController implements CLIDatabaseInterface, CLIDelegationController{

    /**
     * A copy of this object stored in a static method, for regestering the {@link DatabaseConfiguration}.
     */
    public static CLIDataBaseController cliDataBaseController;
    /**
     * The registered object of the {@link DatabaseConfiguration}, what the commands are executed on.
     */
    private DatabaseConfiguration databaseConfiguration;

    /**
     * Constructor that sets the static variable for registering {@link DatabaseConfiguration}.
     */
    public CLIDataBaseController(){
        cliDataBaseController = this;
    }
    /**
     * String containing help information for database level CLI
     */
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

    /**
     * Gets ip from {@link DatabaseConfiguration}.
     */
    public void ipGet() {
        String ip = databaseConfiguration.getIp();
        if (Character.isDigit(databaseConfiguration.getIp().charAt(0))) {
            System.out.println("IP is : " + ip);
        } else {
            System.out.println("URI is : " + ip);
        }
    }

    /**
     * Sets ip in {@link DatabaseConfiguration}.
     * @param s ip to set.
     */
    public void ipSet(String s) {
        System.out.println("Setting ip to : " + s);
        databaseConfiguration.setIp(s);
        System.out.println("ip set to : " + s);
    }


    /**
     * Gets password from {@link DatabaseConfiguration}.
     */
    public void passwordGet() {
        System.out.println("Database password : " + databaseConfiguration.getPassword());
    }

    /**
     * Sets password in {@link DatabaseConfiguration}.
     * @param s password to set.
     */
    public void passwordSet(String s) {
        System.out.println("Setting password to : " + s);
        databaseConfiguration.setPassword(s);
        System.out.println("password set to : " + s);
    }

    /**
     * Get username from {@link DatabaseConfiguration}.
     */
    public void usernameGet() {
        System.out.println("Database username : " + databaseConfiguration.getUsername());
    }


    /**
     * Sets username in {@link DatabaseConfiguration}.
     * @param s username to set.
     */
    public void usernameSet(String s) {
        System.out.println("Setting usernme to : " + s);
        databaseConfiguration.setUsername(s);
        System.out.println("usernme set to : " + s);
    }

    /**
     * Gets port from {@link DatabaseConfiguration}.
     */
    public void portGet() {
        System.out.println("Database port : " + databaseConfiguration.getPort());
    }

    /**
     * Sets port in {@link DatabaseConfiguration};
     * @param s port to set
     */
    public void portSet(String s) {
        System.out.println("Setting port to : " + s);
        databaseConfiguration.setPort(s);
        System.out.println("port set to : " + s);
    }

    /**
     * Gets cumulative connection configuration from {@link DatabaseConfiguration}.
     */
    public void connectionGet() {
        String str =
                "======Conn======\n" +
                "URI: " + databaseConfiguration.getIp() + ":" + databaseConfiguration.getPort() + "\n"+
                "USER: " + databaseConfiguration.getUsername() + "\n"+
                "PASS: " + databaseConfiguration.getPassword() + "\n" +
                "======Conn======\n";
        System.out.println(str);
    }

    /**
     * Registers the {@link DatabaseConfiguration} in {@link CLIDataBaseController}.
     * @param databaseConfiguration {@link DatabaseConfiguration} to register.
     */
    @Override
    public void registerCLIDatabaseConfigurator(DatabaseConfiguration databaseConfiguration) {
        this.databaseConfiguration = databaseConfiguration;
    }
}
