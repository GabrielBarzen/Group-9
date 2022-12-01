package com.GeoFlex.GeoFlexBackend.DatabaseProcedures;

import com.GeoFlex.GeoFlexBackend.Controllers.Authentication.Authenticator;
import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AdminProcedures;
import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AuthenticationProcedures;
import com.GeoFlex.GeoFlexBackend.PoJo.Route.Root;
import com.google.gson.Gson;
import org.junit.jupiter.api.*;
import org.springframework.test.context.event.annotation.AfterTestClass;

import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.*;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class Admin {
    AdminProcedures adminProcedures;
    AuthenticationProcedures authenticationProcedures;


    private static final String username = "AutomatedTestAdminUser";
    private static final String email = "AutomatedTestUserEmail.Delete if seen in databse!";

    private static final String password = "NotARealPass";

    private final static int ACCESS_LEVEL_SET = 2;

    private static String userID = "-1";
    private static String routeID = "-1";
    private static Root routeRoot = null;



    @BeforeAll
    static void createTestUser(){
        AuthenticationProcedures tempAuthenticationProcedures = new AuthenticationProcedures();
        String salt = Authenticator.generateSalt();
        String hashedPassword = Authenticator.getHash(password, salt);
        userID = tempAuthenticationProcedures.createUser(username,email,salt,hashedPassword);

        tempAuthenticationProcedures.setAccessLevelForUser(userID, String.valueOf(ACCESS_LEVEL_SET));
    }
    @BeforeEach
    public void initTest(){
        adminProcedures = new AdminProcedures();
        authenticationProcedures = new AuthenticationProcedures();
    }

    @Test
    @Order(0)
    public void getRoutes() {

        assertNotNull(adminProcedures.getRoutes(userID));
    }

    @Test
    @Order(1)
    public void createRoute() {
        routeID = String.valueOf(adminProcedures.createRoute("Automated test route","Automated test route, should NEVER be visible in database, remove and fix tests", "INFO",5));
        assertNotEquals("-1", routeID);
    }

    @Test
    @Order(2)
    public void getRoute() {
        Gson gson = new Gson();
        routeRoot = gson.fromJson(adminProcedures.getRoute(routeID,userID),Root.class);
        assertNotNull(routeRoot);
    }

    @Test
    @Order(3)
    public void routeSwapLocation() {
        adminProcedures.routeSwapLocation(routeRoot.route.location.get(0).id, routeRoot.route.location.get(1).id);
        String routeIndexFrom = routeRoot.route.location.get(0).location_index;
        String routeIndexTo = routeRoot.route.location.get(1).location_index;
        Gson gson = new Gson();
        routeRoot = gson.fromJson(adminProcedures.getRoute(routeID,userID),Root.class);
        assertEquals(routeRoot.route.location.get(0).location_index, routeIndexTo);
        assertEquals(routeRoot.route.location.get(1).location_index, routeIndexFrom);
    }


    @Test
    @Order(4)
    public void routeDeleteLocation() {
        Gson gson = new Gson();
        routeRoot = gson.fromJson(adminProcedures.getRoute(routeID,userID),Root.class);
        String tempId = routeRoot.route.location.get(0).id;
        adminProcedures.routeDeleteLocation(routeID,routeRoot.route.location.get(0).id);

        routeRoot = gson.fromJson(adminProcedures.getRoute(routeID,userID),Root.class);
        assertNotEquals(tempId, routeRoot.route.location.get(0).id);
    }

    @Test
    @Order(5)
    public void routeUpdateTitle() {
        adminProcedures.routeUpdateTitle(routeID,"tempTitle");
        Gson gson = new Gson();
        routeRoot = gson.fromJson(adminProcedures.getRoute(routeID,userID),Root.class);
        assertEquals("tempTitle",routeRoot.route.title);
        adminProcedures.routeUpdateTitle(routeID,"Automated test route");
    }
    @Test
    @Order(6)
    public void deleteRoute() {
        Gson gson = new Gson();
        routeRoot = gson.fromJson(adminProcedures.getRoute(routeID,userID),Root.class);
        assertTrue(adminProcedures.deleteRoute(routeID));
    }


    @AfterAll
    static void cleanupTestUser() {
        AuthenticationProcedures tempAuthenticationProcedures = new AuthenticationProcedures();
        tempAuthenticationProcedures.deleteUser(userID);
    }

}
