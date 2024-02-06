package main.java.controller;

import java.io.File;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.io.FileReader;
import java.io.FileWriter;
import java.text.ParseException;
import java.util.Calendar;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.bson.Document;
import org.json.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import main.java.model.Upgrades;
import main.java.model.Users;
import main.java.repository.UpgradesRepository;
import main.java.repository.UsersRepository;

import java.util.List;

@RestController
public class PostEndpointController {

	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private UpgradesRepository upgradesRepository;

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody Users newUser) {
		List<Users> existingUsers = usersRepository.findAll();

		for (Users existingUser : existingUsers) {
			if (existingUser.getName().equals(newUser.getName())) {
				return new ResponseEntity<>("El nombre de usuario ya está en uso.", HttpStatus.BAD_REQUEST);
			}
		}

		String encryptedPass = encryptToMD5(newUser.getPassword());
		newUser.setPassword(encryptedPass);
		System.out.println(encryptedPass);
		usersRepository.save(newUser);

		return new ResponseEntity<>("Usuario registrado exitosamente.", HttpStatus.OK);
	}

	@PostMapping("/newUpgrade")
	public ResponseEntity<String> newUpgrade(@RequestBody Upgrades newUpgrade) {
		List<Upgrades> existingUpgrades = upgradesRepository.findAll();

		for (Upgrades existingUser : existingUpgrades) {
			if (existingUser.getName().equals(newUpgrade.getName())) {
				return new ResponseEntity<>("La mejora ya existe.", HttpStatus.BAD_REQUEST);
			}
		}

		upgradesRepository.save(newUpgrade);

		return new ResponseEntity<>("Mejora registrada exitosamente.", HttpStatus.OK);
	}

	public static String encryptToMD5(String input) {
		try {

			MessageDigest md = MessageDigest.getInstance("MD5");

			byte[] inputBytes = input.getBytes();

			byte[] hashBytes = md.digest(inputBytes);

			StringBuilder hexStringBuilder = new StringBuilder();
			for (byte b : hashBytes) {
				String hex = Integer.toHexString(0xFF & b);
				if (hex.length() == 1) {
					hexStringBuilder.append('0');
				}
				hexStringBuilder.append(hex);
			}

			return hexStringBuilder.toString();

		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		}
	}

}
