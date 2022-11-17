package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AuthenticationProcedures {
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

    public String getUserId(String userName) {
        DatabaseConnection dc = new DatabaseConnection();
        String userid = "-2";
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_user_id(?)}")) {
            cs.setString("in_user_name", userName);
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                userid = res.getString("id");
                System.out.println("gotten user id " + userid);
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

    public String createUser(String username, String email, String salt, String hashedPassword) {
        DatabaseConnection dc = new DatabaseConnection();
        String userid= "-1";
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
            return "-1";
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

    public boolean setAccessLevelForUser(String id, int accessLevel) {
        DatabaseConnection dc = new DatabaseConnection();
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
}
