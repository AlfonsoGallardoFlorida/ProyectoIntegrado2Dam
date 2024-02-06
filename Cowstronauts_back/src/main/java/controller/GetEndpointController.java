package main.java.controller;

import java.io.File;
import java.io.IOException;
import java.io.FileReader;
import java.text.ParseException;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.json.simple.JSONObject;
import org.bson.Document;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

@RestController
public class GetEndpointController {

	private String databaseName;
	private JSONArray collections;
	private MongoClient mongoClient;
	private MongoDatabase database;
	

	
	@GetMapping("/login")
	ResponseEntity<JSONObject> login(@RequestParam(value = "user") String user, @RequestParam(value = "pass") String pass) {
		JSONObject jsonString = new JSONObject();
		connect();
		String collection = (String) this.collections.get(1);
		MongoCollection<Document> userCollection = this.database.getCollection(collection);
		MongoCursor<Document> cursor = userCollection.find().iterator();
		while(cursor.hasNext()) {
			JSONObject response = new JSONObject(cursor.next());
			String name = ((String) response.get("name")).toLowerCase();
			System.out.println(name);
			if(name.equals(user)) {
				Boolean passEquals = checkPassword(name, (String) response.get("password"), pass);
				if(passEquals) {
					return ResponseEntity.status(HttpStatus.OK).body(jsonString);
				}else {
					return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonString);
				}
			}
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonString);
	}
	
	private void connect() {
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
	
	private Boolean checkPassword(String name, String dbPass, String userPass) {
		
		if(dbPass.equals(userPass)) {
			return true;
		}else {
			return false;
		}
		
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
