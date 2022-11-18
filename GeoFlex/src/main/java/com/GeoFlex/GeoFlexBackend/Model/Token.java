package com.GeoFlex.GeoFlexBackend.Model;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

public class Token {
    final LocalDate expiery;
    final String token;

    private final SecureRandom secureRandom = new SecureRandom(); //threadsafe
    private final Base64.Encoder base64Encoder = Base64.getUrlEncoder(); //threadsafe

    public Token(TokenType type) {
        LocalDate date = LocalDate.now();
        if (type == TokenType.WEEK) {
            date.plus(1, ChronoUnit.WEEKS);
        } else if (type == TokenType.MONTH){
            date.plus(1, ChronoUnit.MONTHS);
        } else if (type == TokenType.DAY) {
            date.plus(1, ChronoUnit.DAYS);

        }
        expiery = date;
        this.token = createToken();
    }

    public Token() {
        this(TokenType.DAY);
    }

    public Token(String token) {
        LocalDate date = LocalDate.now();
        expiery = date;
        this.token = token;
    }


    private String createToken(){
        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }

    public LocalDate getExpiery() {
        return expiery;
    }

    public String getToken() {
        return token;
    }

    @Override
    public String toString() {
        return String.format("Value : %s, Expiery :%s%n",token,expiery);
    }
}
