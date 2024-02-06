package main.java.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import main.java.model.Users;
import main.java.model.userSave;
import main.java.repository.UsersRepository;

@RestController
public class PutEndpointController {

	@Autowired
	private UsersRepository usersRepository;
	
	@PutMapping("/load")
	ResponseEntity<JSONObject> loadSave(@RequestParam(value = "id") int id, @RequestBody userSave body) {
		JSONObject jsonString = new JSONObject();
		Users user = usersRepository.searchOneUser(id);
		System.out.println(body.getCps());
		return ResponseEntity.status(HttpStatus.OK).body(jsonString);
	}
	
}

