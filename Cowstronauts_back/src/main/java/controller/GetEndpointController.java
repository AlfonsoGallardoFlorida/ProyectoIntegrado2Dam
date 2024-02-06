package main.java.controller;


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
	ResponseEntity<JSONObject> login(@RequestParam(value = "user") String user, @RequestParam(value = "pass") String pass) {
		JSONObject jsonString = new JSONObject();
		List<Users> listUsers = usersRepository.findAll();
			System.out.println(listUsers);
			for(Users u : listUsers) {
				String name = u.getName().toLowerCase();
				System.out.println(name);
				if(name.equals(user.toLowerCase())) {
					if(checkPassword(pass, u.getPassword())) {
						return ResponseEntity.status(HttpStatus.OK).body(jsonString);
					}else {
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
		for(Upgrades u : listUpgrades) {
			jsonString.put("upgrade", u);
		}
		return ResponseEntity.status(HttpStatus.OK).body(jsonString);
	}
	
	private Boolean checkPassword(String dbPass, String userPass) {
		
		if(dbPass.equals(userPass)) {
			return true;
		}else {
			return false;
		}
		
	}
}
