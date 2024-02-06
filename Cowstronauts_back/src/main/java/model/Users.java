package main.java.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Cowstronauts.users")
public class Users {

	@Id
	private String mongoId;
	private int id;
	private String name;
	private String password;
	private String dateCreated;
	private String lastSave;
	private userSave save;

	public String getMongoId() {
		return mongoId;
	}

	public void setMongoId(String mongoId) {
		this.mongoId = mongoId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(String dateCreated) {
		this.dateCreated = dateCreated;
	}

	public String getLastSave() {
		return lastSave;
	}

	public void setLastSave(String lastSave) {
		this.lastSave = lastSave;
	}

	public userSave getSave() {
		return save;
	}

	public void setSave(userSave save) {
		this.save = save;
	}
}
