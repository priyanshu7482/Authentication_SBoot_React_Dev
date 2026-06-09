package com.substring.auth.app.auth.controllers;

import com.substring.auth.app.auth.services.impl.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/{userId}/upload-image")
    public ResponseEntity<Map<String, String>> uploadImage(
            @PathVariable String userId,
            @RequestParam("file") MultipartFile file) throws Exception {

        String imageUrl = imageService.uploadImage(file, userId);
        return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
    }
}
