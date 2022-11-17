package com.GeoFlex.GeoFlexBackend.DatabaseProcedureTests;

import com.GeoFlex.GeoFlexBackend.Controllers.Authentication.Authenticator;
import com.GeoFlex.GeoFlexBackend.DatabaseAccess.AuthenticationProcedures;
import org.junit.jupiter.api.*;

import java.sql.SQLOutput;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AuthenticationTests {

    static AuthenticationProcedures ap = new AuthenticationProcedures();

    private static String username = "AutomatedTestUser";
    private static String email = "AutomatedTestUserEmail";

    private static String password = "NotARealPass";

    private final static int ACCESS_LEVEL_SET = 1;

    private String id;

    @BeforeEach
    public void setUserId(){
        id = ap.getUserId(username);
    }

    @Test
    @Order(0)
    public void createUserTest() {

        String salt = Authenticator.generateSalt();
        String hashedPassword = Authenticator.getHash(password, salt);
        id = ap.createUser(username,email,salt,hashedPassword);
        System.out.println("new user id : " + id);
        assertEquals(ap.getUserId(username),id);
    }

    @Test
    @Order(1)
    public void getUserIdTest() {

        System.out.println("stored id : " + id);
        System.out.println("fetched id : " + ap.getUserId(username));
        assertEquals(ap.getUserId(username),id);
    }

    @Test
    @Order(2)
    public void setAccessLevelTest() {

        id = ap.getUserId(username);
        System.out.println("got id : " + id + ", for username : " + username);
        System.out.println("user id to set acces level for : " + id);
        assertTrue(ap.setAccessLevelForUser(id, ACCESS_LEVEL_SET));
    }

    @Test
    @Order(3)
    public void getAccessLevelTest() {

        id = ap.getUserId(username);
        assertEquals(ACCESS_LEVEL_SET,ap.getAccesLevel((id)));
    }

    @Test
    @Order(4)
    public void loginUserTest() {

        id = ap.getUserId(username);
        String hashedPass = Authenticator.getHash(password,ap.getSalt(id));
        System.out.printf("logging in with username : %s, id : %s, Hashed password : %s, salt is %s%n",username,id,hashedPass,ap.getSalt(id));
        assertTrue(ap.login((id), hashedPass));
    }

    @Test
    @Order(5)
    public void deleteUserTest() {

        id = ap.getUserId(username);
        System.out.println("Removing user with id : " + id );
        boolean success = ap.deleteUser((id));
        assertTrue(success);
    }


}
