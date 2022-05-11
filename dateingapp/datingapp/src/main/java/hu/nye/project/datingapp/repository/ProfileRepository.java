package hu.nye.project.datingapp.repository;

import hu.nye.project.datingapp.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
