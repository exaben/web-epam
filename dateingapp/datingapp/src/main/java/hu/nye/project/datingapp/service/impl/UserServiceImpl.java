package hu.nye.project.datingapp.service.impl;

import hu.nye.project.datingapp.dto.UserCreateDTO;
import hu.nye.project.datingapp.dto.UserDTO;
import hu.nye.project.datingapp.dto.UserUpdateDTO;
import hu.nye.project.datingapp.entity.Profile;
import hu.nye.project.datingapp.entity.User;
import hu.nye.project.datingapp.exceptions.NotFoundException;
import hu.nye.project.datingapp.repository.ProfileRepository;
import hu.nye.project.datingapp.repository.UserRepository;
import hu.nye.project.datingapp.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.profileRepository = profileRepository;

    }

    @Override
    public List<UserDTO> findAll() {
        //megkapom az összes user-t
        List<User> userList = userRepository.findAll();

        //átalakítom a listát DTO típusúvá
        return userList.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserCreateDTO create(UserCreateDTO userCreateDTO) {
        User userToSave = modelMapper.map(userCreateDTO, User.class);

        if (this.userRepository.findUserByUsername(userToSave.getUsername()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Username already exist"
            );
        }

        if (this.userRepository.findUserByEmail(userToSave.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email already exist"
            );
        }

        User savedUser = this.userRepository.save(userToSave);

        // Új felhasználóhoz tartozó profil adatok létrehozása
        Profile profile = new Profile();
        profile.setUserID(savedUser.getId());
        this.profileRepository.save(profile);

        return this.modelMapper.map(savedUser, UserCreateDTO.class);
    }

    @Override
    public Optional<UserDTO> findById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.map(user -> modelMapper.map(user, UserDTO.class));
    }

    @Override
    public UserUpdateDTO update(UserUpdateDTO userUpdateDTO) {
        Long id = userUpdateDTO.getId();
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new NotFoundException("User not found with id=" + id);
        }

        if (!userUpdateDTO.getUsername().equals(optionalUser.get().getUsername()) && userRepository.findUserByUsername(userUpdateDTO.getUsername()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Username already exist"
            );
        }

        if (!userUpdateDTO.getEmail().equals(optionalUser.get().getEmail()) && userRepository.findUserByEmail(userUpdateDTO.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email already exist"
            );
        }

        User userToUpdate = modelMapper.map(userUpdateDTO, User.class);
        User savedUser = userRepository.save(userToUpdate);

        return modelMapper.map(savedUser, UserUpdateDTO.class);
    }

    @Override
    public void delete(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User userToDelete = optionalUser.get();
            userRepository.delete(userToDelete);
        } else {
            throw new NotFoundException("User not found with id=" + id);
        }
    }

    @Override
    public Optional<UserDTO> findByUsernameAndPassword(String username, String password) {
        Optional<User> optionalUser = userRepository.findUserByUsernameAndPassword(username, password);
        return optionalUser.map(user -> modelMapper.map(user, UserDTO.class));
    }

    @Override
    public Optional<UserDTO> findUserByUsername(String username) {
        Optional<User> optionalUser = userRepository.findUserByUsername(username);
        return optionalUser.map(user -> modelMapper.map(user, UserDTO.class));
    }
}
