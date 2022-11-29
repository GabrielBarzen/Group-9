package com.GeoFlex.GeoFlexBackend.Process.Mail;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class MailService {

    /**
     * Sends an email to a user/moderator after account creation.
     * @param recipient The email to send the account details to.
     * @param username The username of the created account.
     * @param password The password of the created account.
     * @param accountType Enum containing the type of the account created.
     */
    public void sendEmailCreateAccount(String recipient, String username, String password, AccountTypes accountType) {
        /**
         * TODO: Create a google account to send emails from and insert details below.
         * TODO: Need to enable 2FA for the account and set an app password.
         */
        String sender = "";
        String senderPassword = "";

        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.socketFactory.port", "465");
        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.port", "465");


        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(sender, senderPassword);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(sender));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(recipient));

            if(accountType == AccountTypes.MODERATOR){
                message.setSubject("Ditt moderartor konto för GeoFlex är skapad");
                message.setText("Hej, ditt moderator konto för GeoFlex har nu blivit skapad. Dina inloggningsuppgifter är" +
                        "\n\nAnvändarnamn: " + username + "\nLösenord: " + password);
            }
            else if(accountType == AccountTypes.USER){
                message.setSubject("Ditt konto för GeoFlex är skapad");
                message.setText("Hej, ditt konto för GeoFlex har nu blivit skapad. Dina inloggningsuppgifter är" +
                        "\n\nAnvändarnamn: " + username + "\nLösenord: " + password);
            }
            Transport.send(message);
        } catch (AddressException e) {
            throw new RuntimeException(e);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }
}

