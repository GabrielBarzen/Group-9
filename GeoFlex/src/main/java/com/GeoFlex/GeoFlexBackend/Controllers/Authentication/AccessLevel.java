package com.GeoFlex.GeoFlexBackend.Controllers.Authentication;


/**
 * Enum for defining access constants.
 */
public enum AccessLevel {
    ADMIN(2),
    MODERATOR(1),
    USER(0);

    private final int level;

    AccessLevel(int level) {
        this.level = level;
    }

    public int getLevel() {
        return level;
    }
}
