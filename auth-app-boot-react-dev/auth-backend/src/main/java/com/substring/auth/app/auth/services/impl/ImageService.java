package com.substring.auth.app.auth.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.substring.auth.app.auth.entities.User;
import com.substring.auth.app.auth.helpers.UserHelper;
import com.substring.auth.app.auth.repositories.UserRepository;
import com.substring.auth.app.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final Cloudinary cloudinary;
    private final UserRepository userRepository;

    public String uploadImage(MultipartFile file, String userId) throws Exception {
        // Cloudinary pe upload karo
        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "folder", "auth-app/profiles",
                        "public_id", "user_" + userId,
                        "overwrite", true
                )
        );

        String imageUrl = (String) uploadResult.get("secure_url");

        // Seedha DB mein sirf image update karo — password touch mat karo
        UUID uId = UserHelper.parseUUID(userId);
        User user = userRepository
                .findById(uId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setImage(imageUrl);
        userRepository.save(user);

        return imageUrl;
    }
}