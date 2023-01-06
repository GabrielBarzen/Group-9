package com.GeoFlex.GeoFlexBackend.Process.Mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;
import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Configuration
@PropertySource("classpath:/config.properties")
public class MailService implements EnvironmentAware {


    private Environment env;
    private static String sender;
    private static String senderPassword;
    @PostConstruct
    private void postConstruct() {
        sender = env.getProperty("domain.email");
        senderPassword = env.getProperty("domain.password");
    }

    /**
     * Sends an email to a user/moderator after account creation.
     * @param recipient The email to send the account details to.
     * @param username The username of the created account.
     * @param password The password of the created account.
     * @param accountType Enum containing the type of the account created.
     */
    public void sendEmailCreateAccount(String recipient, String username, String password, AccountTypes accountType) {
        Properties props = System.getProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "send.one.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {
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
                message.setSubject("Ditt moderartor konto för GeoFlex är skapad!");
                String txt = "Hej!\n" +
                        "\n" +
                        "Ditt moderator-konto för Geoflex är nu skapat! Logga in med nedanstående uppgifter för att börja använda appen\n" +
                        "\n" +
                        "Användarnamn:" + username + "\n" +
                        "Lösenord:" + password +"\n" +
                        "\n" +
                        "Https://länk-till-webb-appen-här";
                message.setText(txt);
            }
            else if(accountType == AccountTypes.USER){
                message.setSubject("Ditt konto för GeoFlex är skapad!");
                String txt = "Hej!\n" +
                        "\n" +
                        "Ditt konto för Geoflex är nu skapat! Logga in med nedanstående uppgifter för att börja använda appen\n" +
                        "\n" +
                        "Användarnamn:" + username + "\n" +
                        "Lösenord:" + password +"\n" +
                        "\n" +
                        "Https://länk-till-webb-appen-här";
                message.setText(txt);
            }
            Transport.send(message);
        } catch (AddressException e) {
            throw new RuntimeException(e);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void setEnvironment(Environment environment) {
        this.env = environment;
    }
}

