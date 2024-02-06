package main.java.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import main.java.model.Users;
import main.java.model.Upgrades;
import main.java.repository.UpgradesRepository;
import main.java.repository.UsersRepository;

@RestController
public class GetEndpointController {

	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private UpgradesRepository upgradesRepository;

	@GetMapping("/login")
	ResponseEntity<JSONObject> login(@RequestParam(value = "user") String user,
			@RequestParam(value = "pass") String pass) {
		JSONObject jsonString = new JSONObject();
		List<Users> listUsers = usersRepository.findAll();
		System.out.println(listUsers);
		for (Users u : listUsers) {
			String name = u.getName().toLowerCase();
			System.out.println(name);
			if (name.equals(user.toLowerCase())) {
				if (checkPassword(u.getPassword(), pass)) {
					return ResponseEntity.status(HttpStatus.OK).body(jsonString);
				} else {
					return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonString);
				}
			}
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonString);
	}

	@GetMapping("/upgrades")
	ResponseEntity<JSONObject> getUpgrades() {
		JSONObject jsonString = new JSONObject();
		List<Upgrades> listUpgrades = upgradesRepository.findAll();
		jsonString.put("upgrade", listUpgrades);
		return ResponseEntity.status(HttpStatus.OK).body(jsonString);
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

	private Boolean checkPassword(String dbPass, String userPass) {

		String userEncrypted = encryptToMD5(userPass);
		if (dbPass.equals(userEncrypted)) {
			return true;
		} else {
			return false;
		}

	}
}
