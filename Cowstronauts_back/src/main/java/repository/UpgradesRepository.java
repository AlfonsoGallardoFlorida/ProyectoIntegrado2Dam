package main.java.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import main.java.model.Users;

public interface UpgradesRepository extends MongoRepository<Users, String> {
	
}
