package com.GeoFlex.GeoFlexBackend.Controllers.CLI;

import com.GeoFlex.GeoFlexBackend.DatabaseAccess.DatabaseConfiguration;

public class CLIDataBaseController implements CLIDatabaseInterface {

    public static CLIDataBaseController cliDataBaseController;
    private DatabaseConfiguration databaseConfiguration;
    public CLIDataBaseController(){
        cliDataBaseController = this;
    }
    public void ipget() {
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

    public void usernmeGet() {
    }

    public void usernmeSet(String s) {
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
