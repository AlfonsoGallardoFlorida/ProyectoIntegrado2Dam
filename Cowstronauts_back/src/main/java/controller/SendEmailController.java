package main.java.controller;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class SendEmailController {

	public SendEmailController() {

	}

	public SendEmailController(String messageToSend, String matter, String email_sender, String email_sender_pass,
			String host_email, String port_email, String[] email_desti)
			throws UnsupportedEncodingException, MessagingException {
		Properties props = System.getProperties();
		props.put("mail.smtp.host", host_email);
		props.put("mail.smtp.user", email_sender);
		props.put("mail.smtp.clave", email_sender_pass);
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.port", port_email);
		Session session = Session.getDefaultInstance(props);
		MimeMessage message = new MimeMessage(session);
		message.setFrom(new InternetAddress(email_sender));
		message.addRecipients(Message.RecipientType.TO, email_desti[0]);
		message.setSubject(matter);
		BodyPart messageBodyPart1 = new MimeBodyPart();
		messageBodyPart1.setText(messageToSend);
		Multipart multipart = new MimeMultipart();
		multipart.addBodyPart(messageBodyPart1);
		message.setContent(multipart, "text/html");
		Transport transport = session.getTransport("smtp");
		transport.connect(host_email, email_sender, email_sender_pass);
		transport.sendMessage(message, message.getAllRecipients());
		transport.close();
	}
}
