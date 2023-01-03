package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AuthenticationProcedures {

    /**
     * Returns salt number from the database.
     * @param userId The id of the user.
     * @return Salt number.
     */
    public String getSalt(String userId) {
        DatabaseConnection dc = new DatabaseConnection();
        String salt = "-1";
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_salt_for_user(?)}")) {
            cs.setInt("in_user_id", Integer.parseInt(userId));
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                salt = res.getString("salt");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return salt;
    }

    /**
     * Deletes a user from the database.
     * @param userId The id of the user.
     * @return Boolean with the status of the request.
     */
    public boolean deleteUser(String userId) {
        DatabaseConnection dc = new DatabaseConnection();
        boolean success = false;
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_delete_user(?)}")) {
            cs.setInt("in_user_id", Integer.parseInt(userId));
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                success = res.getBoolean("success");
            }
        } catch (SQLException e) {
            success = false;
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return success;
    }

    /**
     * Gets the access level from the database.
     * @param userid The id of the user.
     * @return The access level.
     */
    public int getAccesLevel(String userid) {
        DatabaseConnection dc = new DatabaseConnection();
        int accessLevel = -1;
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_access_level_for_user(?)}")) {
            cs.setInt("in_user_id", Integer.parseInt(userid));
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                accessLevel = res.getInt("access_level");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return accessLevel;
    }

    /**
     * Gets a user id from the database.
     * @param userName The name of the user.
     * @return The userid.
     */
    public String getUserId(String userName) {
        DatabaseConnection dc = new DatabaseConnection();
        String userid = "-2";
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_user_id(?)}")) {
            cs.setString("in_user_name", userName);
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                userid = res.getString("id");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return userid;
    }

    /**
     * Checks login information in the database.
     * @param id The id of the user.
     * @param passwordhash The password used to log in.
     * @return Boolean with the status of the request.
     */
    public boolean login(String id, String passwordhash) {
        DatabaseConnection dc = new DatabaseConnection();
        boolean success = false;
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_login_user(?,?)}")) {
            cs.setInt("in_user_id", Integer.parseInt(id));
            cs.setString("in_password_hash", passwordhash);

            ResultSet res = cs.executeQuery();
            while (res.next()) {
                success = res.getBoolean("success");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

        return success;
    }

    /**
     * Procedure to create an account.
     * @param username The username of the account.
     * @param email The email of the account.
     * @param salt The salt number of the account.
     * @param hashedPassword The password of the account.
     * @return The user id of the account.
     */
    public String createUser(String username, String email, String salt, String hashedPassword) {
        DatabaseConnection dc = new DatabaseConnection();
        String userid = null;
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_create_user(?,?,?,?)}")) {
            cs.setString("in_user_name", username);
            cs.setString("in_user_email", email);
            cs.setString("in_salt", salt);
            cs.setString("in_user_hashed_password", hashedPassword);
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                userid = res.getString("id");
            }
        } catch (SQLException e) {
            return null;
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return userid;
    }

    /**
     * Sets acceslevel for a user.
     * @param id The if of the user.
     * @param accessLevelInput The accesslevel to set.
     * @return Boolean with the status of the request.
     */
    public boolean setAccessLevelForUser(String id, String accessLevelInput) {
        DatabaseConnection dc = new DatabaseConnection();
        int accessLevel = Integer.parseInt(accessLevelInput);
        boolean success = false;
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_set_access(?,?)}")) {
            cs.setString("in_user_id", id);
            cs.setInt("in_access_level", accessLevel);

            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                success = res.getBoolean("success");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return success;
    }

    /**
     * Returns the accesslevel of a user.
     * @param id The id of the user.
     * @return Role(accesslevel) of the user.
     */
    public int getAccessLevelForUser(String id) {
        DatabaseConnection dc = new DatabaseConnection();
        int role = -1;
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_access(?)}")) {
            cs.setInt("in_user_id", Integer.parseInt(id));
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                role = res.getInt("role");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return role;
    }

    /**
     * Assigns a route to a user.
     * @param userId The id of the user.
     * @param assign NOT USED.
     * @return Boolean with the status of the request.
     */
    public boolean assignRoute(String userId, String assign) {
        DatabaseConnection dc = new DatabaseConnection();
        boolean success = false;
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_assign_route(?,?)}")) {
            cs.setInt("in_user_id", Integer.parseInt(userId));
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                success = res.getBoolean("success");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return success;
    }

    /**
     * Un-assigns a route to a user.
     * @param userId The id of the user.
     * @param assign NOT USED.
     * @return Boolean with the status of the request.
     */
    public boolean unAssignRoute(String userId, String assign) {
        DatabaseConnection dc = new DatabaseConnection();
        boolean success = false;
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_unassign_route(?,?)}")) {
            cs.setInt("in_user_id", Integer.parseInt(userId));
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                success = res.getBoolean("success");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            try {
                dc.getConnection().close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return success;
    }
}
