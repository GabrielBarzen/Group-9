package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import com.GeoFlex.GeoFlexBackend.Controllers.CLI.CLIController;
import com.GeoFlex.GeoFlexBackend.Controllers.CLI.CLIDataBaseController;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;

@Configuration
@PropertySource("classpath:/config.properties")
@DependsOn("CLIController")
public class DatabaseConfiguration implements EnvironmentAware {



    private Environment env;
    private String ip;
    private String port;
    private String username;
    private String password;

    @Override
    public void setEnvironment(final Environment environment) {
        this.env = environment;
    }

    @PostConstruct
    private void postConstruct() {
        ip = env.getProperty("database.ip");
        username =  env.getProperty("database.username");
        password = env.getProperty("database.password");
        port = env.getProperty("database.port");
        CLIDataBaseController.cliDataBaseController.registerCLIDatabaseConfigurator(this);
    }



    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
