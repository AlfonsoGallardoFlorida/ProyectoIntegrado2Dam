package main.java.controller;

import java.io.File;
import java.io.IOException;
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

import main.java.model.Users;
import main.java.repository.UpgradesRepository;
import main.java.repository.UsersRepository;

import java.util.List;

@RestController
public class PostEndpointController {

	@Autowired
	private UsersRepository usersRepository;

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody Users newUser) {
		List<Users> existingUsers = usersRepository.findAll();

		for (Users existingUser : existingUsers) {
			if (existingUser.getName().equals(newUser.getName())) {
				return new ResponseEntity<>("El nombre de usuario ya está en uso.", HttpStatus.BAD_REQUEST);
			}
		}

		usersRepository.save(newUser);

		return new ResponseEntity<>("Usuario registrado exitosamente.", HttpStatus.OK);
	}

	private Boolean checkUser(String name, String dbName) {

		if (name.equals(dbName)) {
			return true;
		} else {
			return false;
		}

	}

}
