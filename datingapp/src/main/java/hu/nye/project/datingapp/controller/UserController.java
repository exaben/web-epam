package hu.nye.project.datingapp.controller;

import hu.nye.project.datingapp.dto.UserDTO;
import hu.nye.project.datingapp.entity.User;
import hu.nye.project.datingapp.repository.UserRepository;
import hu.nye.project.datingapp.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;

    }

    @RequestMapping(path = "/users", method = RequestMethod.GET)
    public List<UserDTO> findAll(){
        return userService.findAll();
    }
}
