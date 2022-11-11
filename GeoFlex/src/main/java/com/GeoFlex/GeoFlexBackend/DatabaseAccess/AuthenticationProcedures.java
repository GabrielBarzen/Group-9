package com.GeoFlex.GeoFlexBackend.DatabaseAccess;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AuthenticationProcedures {
    public  String getSalt(String userId) {
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

    public  String getID(String identification) {
        DatabaseConnection dc = new DatabaseConnection();
        String userid = "-1";
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_user_id(?)}")) {
            cs.setInt("in_user_name", Integer.parseInt(userid));
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                userid = res.getString("user_id");
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

    public  String getHashedPassword(String userid) {
        DatabaseConnection dc = new DatabaseConnection();
        String userid = "-1";
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_user_id(?)}")) {
            cs.setInt("in_user_name", Integer.parseInt(userid));
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                userid = res.getString("user_id");
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
        String userid = "-1";
        try (CallableStatement cs = dc.getConnection().prepareCall("{CALL sp_get_user_id(?)}")) {
            cs.setInt("in_user_name", Integer.parseInt(userid));
            cs.executeQuery();
            ResultSet res = cs.getResultSet();
            while(res.next()){
                userid = res.getString("user_id");
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
        return null; //TODO;
    }
}
