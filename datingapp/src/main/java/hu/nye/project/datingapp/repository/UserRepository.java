package hu.nye.project.datingapp.repository;

import hu.nye.project.datingapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
