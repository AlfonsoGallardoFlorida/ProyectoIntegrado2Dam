package main.java.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import main.java.model.Users;

public interface UsersRepository extends MongoRepository<Users, String> {
	
}
