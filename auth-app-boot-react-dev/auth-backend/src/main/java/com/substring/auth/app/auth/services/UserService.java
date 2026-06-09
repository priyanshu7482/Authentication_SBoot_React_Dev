package com.substring.auth.app.auth.services;

import com.substring.auth.app.auth.payload.UserDto;

public interface UserService {

    //create user
    UserDto createUser(UserDto userDto);

    //get user by email
    UserDto getUserByEmail(String email);

    //update user
    UserDto updateUser(UserDto userDto, String userId);

    //delete user
    void deleteUser(String userId);

    //get user by id
    UserDto getUserById(String userId);

    //get all users
    Iterable<UserDto> getAllUsers();


    // change password
    boolean changePassword(String userId, String oldPassword, String newPassword);
    // user service se related __


}
