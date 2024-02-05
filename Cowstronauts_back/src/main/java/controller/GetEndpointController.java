package main.java.controller;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetEndpointController {

	
	@GetMapping("/login")
	ResponseEntity<JSONObject> login() {
		JSONObject jsonString = new JSONObject();
		return ResponseEntity.status(HttpStatus.OK).body(jsonString);
	}
}
