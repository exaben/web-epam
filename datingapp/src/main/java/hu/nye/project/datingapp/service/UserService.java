package hu.nye.project.datingapp.service;

import hu.nye.project.datingapp.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<UserDTO> findAll();

    UserDTO create(UserDTO userDTO);

    Optional<UserDTO> findById(Long id);

    UserDTO update(UserDTO userDTO);

    void delete (Long id);
}
