package main.java.controller;

import java.io.File;
import java.io.IOException;
import java.io.FileReader;
import java.text.ParseException;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.json.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;

@RestController
public class GetEndpointController {

	private String databaseName;
	private JSONArray collections;
	private MongoClient mongoClient;
	private MongoDatabase database;
	
	GetEndpointController() {
		connect();
	}
	
	@GetMapping("/login")
	ResponseEntity<JSONObject> login() {
		JSONObject jsonString = new JSONObject();
		return ResponseEntity.status(HttpStatus.OK).body(jsonString);
	}
	
	public void connect() {
		JSONObject dbData = readJSONFile();
		Logger mongoLogger = Logger.getLogger("org.mongodb.driver");
		mongoLogger.setLevel(Level.SEVERE);
		
		String ip = (String) dbData.get("ip");
		int port = Integer.parseInt((String) dbData.get("port"));
		this.databaseName = (String) dbData.get("database");
		this.collections = (JSONArray) dbData.get("collections");
		this.mongoClient = new MongoClient(ip, port);
		this.database = this.mongoClient.getDatabase(databaseName);
	}
	
	private JSONObject readJSONFile() {
		JSONParser jsonParser = new JSONParser();
		
		File jsonFile = new File("./src/config.json");
		JSONObject obj;
		try {
			obj = (JSONObject) jsonParser.parse(new FileReader(jsonFile));
			return obj;
		} catch (IOException | org.json.simple.parser.ParseException e) {
			e.printStackTrace();
			obj = new JSONObject();
			return obj;
		}
	}
}
