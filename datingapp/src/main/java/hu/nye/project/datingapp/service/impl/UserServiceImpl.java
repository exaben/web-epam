package hu.nye.project.datingapp.service.impl;

import hu.nye.project.datingapp.dto.UserDTO;
import hu.nye.project.datingapp.entity.User;
import hu.nye.project.datingapp.exception.UserNotFoundException;
import hu.nye.project.datingapp.repository.UserRepository;
import hu.nye.project.datingapp.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;


        User user1 = new User();
        user1.setFirstname("Anna");
        User user2 = new User();
        user2.setFirstname("Béla");
        userRepository.save(user1);
        userRepository.save(user2);
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
    public UserDTO create(UserDTO userDTO) {
        User userToSave = modelMapper.map(userDTO, User.class);
        userToSave.setId(null);
        User savedUser = userRepository.save(userToSave);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public Optional<UserDTO> findById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.map(user -> modelMapper.map(user, UserDTO.class));
    }

    @Override
    public UserDTO update(UserDTO userDTO) {
        Long id = userDTO.getId();
        Optional<User> optionalUser = userRepository.findById(id);

        if(optionalUser.isEmpty()){
            throw new UserNotFoundException("User not found with id="+ id);
        }

        User userToUpdate = modelMapper.map(userDTO, User.class);
        User savedUser = userRepository.save(userToUpdate);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public void delete(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if(optionalUser.isPresent()){
            User userToDelete = optionalUser.get();
            userRepository.delete(userToDelete);
        }else{
            throw new UserNotFoundException("User not found with id="+ id);
        }
    }


}
