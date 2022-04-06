package hu.nye.project.datingapp.controller;

import hu.nye.project.datingapp.dto.UserDTO;
import hu.nye.project.datingapp.entity.User;
import hu.nye.project.datingapp.exception.InvalidUserException;
import hu.nye.project.datingapp.repository.UserRepository;
import hu.nye.project.datingapp.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;

    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<UserDTO>> findAll(){
        return ResponseEntity.ok(userService.findAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<UserDTO> create(@RequestBody @Valid UserDTO userDTO, BindingResult bindingResult){
        chekErrors(bindingResult);

      UserDTO savedUser = userService.create(userDTO);
      return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @RequestMapping(path="/{id}", method = RequestMethod.GET)
    public ResponseEntity<UserDTO> findById(@PathVariable Long id){
       Optional<UserDTO> optionalUserDTO = userService.findById(id);

       ResponseEntity<UserDTO> response;

       if(optionalUserDTO.isPresent()){
           response = ResponseEntity.ok(optionalUserDTO.get());
       }else{
           response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
       }

       return response;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<UserDTO> update(@RequestBody @Valid UserDTO userDTO, BindingResult bindingResult){
        chekErrors(bindingResult);

        UserDTO updatedUser = userService.update(userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @RequestMapping(path="/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Long id){
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private void chekErrors(BindingResult bindingResult){
        LOGGER.info("bindingResult has errors = {}", bindingResult.hasErrors());
        LOGGER.info("errors = {}", bindingResult.getAllErrors());

        if(bindingResult.hasErrors()){
            List<String> messages = new ArrayList<>();

            for(FieldError fieldError : bindingResult.getFieldErrors()){
                messages.add(fieldError.getField() + " - " + fieldError.getDefaultMessage());
            }
            throw new InvalidUserException("Invalid user", messages);
        }
    }
}
