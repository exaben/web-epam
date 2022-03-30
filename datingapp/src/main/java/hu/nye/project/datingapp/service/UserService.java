package hu.nye.project.datingapp.service;

import hu.nye.project.datingapp.dto.UserDTO;

import java.util.List;

public interface UserService {

    List<UserDTO> findAll();
}
