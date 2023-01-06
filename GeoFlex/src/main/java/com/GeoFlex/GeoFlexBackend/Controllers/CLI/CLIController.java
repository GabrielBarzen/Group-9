package com.GeoFlex.GeoFlexBackend.Controllers.CLI;
import java.util.Scanner;

public class CLIController {

    class CLIThread implements Runnable {
        Scanner scanner = new Scanner(System.in);

        @Override
        public void run() {
            String input = scanner.nextLine();
            String[] inputSplitArray = input.split(" ");
            switch (inputSplitArray[0]) {
                case "exit": {

                }
                break;

                case "database": {
                    switch (inputSplitArray[1]) {
                        case "ip": {
                            switch ((inputSplitArray[2])) {
                                case "set": {
                                    if (inputSplitArray.length >= 4) ipSet(inputSplitArray[3]);
                                }
                                break;
                                case "get": {
                                    ipGet();
                                }
                                break;
                                default: {
                                    System.out.println("Unrecognized command : " + input + ", database ip requires");
                                    System.out.println("\"database ip set {ip}\", where ip is address of Mariadb database. Sets temporary database ip, FOR SESSION ONLY.");
                                    System.out.println("\"database ip get\", gets current database ip.");
                                }
                            }
                        }
                    }
                }
                break;
            }
        }
    }


    ////CLI DataBase Methods
    CLIDataBaseController CLIDBC = new CLIDataBaseController();

    private void ipGet() {
        CLIDBC.ipget();
    }

    private void ipSet(String s) {
        CLIDBC.ipget();
    }


    ////Threading Methods
    private void exit() {

    }

    Thread thread = null;
    boolean running = false;

    public boolean start() {
        thread = new Thread(new CLIThread());
        thread.start();

        return running = true;
    }
    public boolean stop(){
        if (running) thread = null;
        return running = false;
    }

    public boolean isRunning(){
        return running;
    }

}

