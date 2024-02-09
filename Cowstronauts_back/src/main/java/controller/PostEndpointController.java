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
import main.java.model.userAchievements;
import main.java.model.userSave;
import main.java.repository.AchievementsRepository;
import main.java.repository.UpgradesRepository;
import main.java.repository.UsersRepository;

import java.util.List;
import java.util.Random;

@RestController
public class PostEndpointController {

	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private UpgradesRepository upgradesRepository;

	@Autowired
	private AchievementsRepository achievementsRepository;

	@PostMapping("/register")
	public ResponseEntity<JSONObject> register(@RequestBody Users newUser) {

		List<Users> existingUsers = usersRepository.findAll();
		JSONObject jsonString = new JSONObject();

		for (Users existingUser : existingUsers) {
			if (existingUser.getName().equals(newUser.getName())) {
				jsonString.put("Status", "400");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonString);
			}
			if (existingUser.getEmail().equals(newUser.getEmail())) {
				jsonString.put("Status", "400");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonString);
			}
		}
		int maxId = getMaxIdUser();
		int newId = maxId + 1;
		String encryptedPass = encryptToMD5(newUser.getPassword());
		newUser.setPassword(encryptedPass);
		newUser.setId(newId);
		newUser.setValidationNum(validationNumGenerator());
		newUser.setValidated(false);
		System.out.println(encryptedPass);
		usersRepository.save(newUser);
		jsonString.put("Status", "200");
		return ResponseEntity.status(HttpStatus.OK).body(jsonString);
	}

	@PostMapping("/newUpgrade")
	public ResponseEntity<String> newUpgrade(@RequestBody Upgrades newUpgrade) {
		List<Upgrades> existingUpgrades = upgradesRepository.findAll();

		for (Upgrades existingUpgrade : existingUpgrades) {
			if (existingUpgrade.getName().equals(newUpgrade.getName())) {
				return new ResponseEntity<>("La mejora ya existe.", HttpStatus.BAD_REQUEST);
			}
		}

		int maxId = getMaxIdUpgrade();
		int newId = maxId++;
		newUpgrade.setId(newId);
		upgradesRepository.save(newUpgrade);

		return new ResponseEntity<>("Mejora registrada exitosamente.", HttpStatus.OK);
	}

	@PostMapping("/newAchievement")
	public ResponseEntity<String> newAchievement(@RequestBody userAchievements newAchievement) {
		List<userAchievements> existingAchievements = achievementsRepository.findAll();

		for (userAchievements existingAchievement : existingAchievements) {
			if (existingAchievement.getName().equals(newAchievement.getName())) {
				return new ResponseEntity<>("El logro ya existe.", HttpStatus.BAD_REQUEST);
			}
		}

		int maxId = getMaxIdAchievement();
		int newId = maxId++;
		newAchievement.setId(newId);
		achievementsRepository.save(newAchievement);

		return new ResponseEntity<>("Logro registrado exitosamente.", HttpStatus.OK);
	}

	private int getMaxIdUser() {
		int maxId = 0;
		List<Users> listUser = usersRepository.findAll();
		for (Users u : listUser) {
			int id = u.getId();
			if (id > maxId) {
				maxId = id;
			}
		}
		return maxId;

	}

	private int getMaxIdUpgrade() {
		int maxId = 0;
		List<Upgrades> listUpgrades = upgradesRepository.findAll();
		for (Upgrades u : listUpgrades) {
			int id = u.getId();
			if (id > maxId) {
				maxId = id;
			}
		}
		return maxId;

	}

	private int getMaxIdAchievement() {
		int maxId = 0;
		List<userAchievements> listAchievements = achievementsRepository.findAll();
		for (userAchievements a : listAchievements) {
			int id = a.getId();
			if (id > maxId) {
				maxId = id;
			}
		}
		return maxId;

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

	public static String validationNumGenerator() {
		Random random = new Random();

		int randomNumber = random.nextInt(10000);

		String formattedRandomNumber = String.format("%04d", randomNumber);

		return formattedRandomNumber;
	}

}
