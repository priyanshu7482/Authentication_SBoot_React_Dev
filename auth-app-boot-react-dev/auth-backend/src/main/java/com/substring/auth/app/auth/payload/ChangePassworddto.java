package com.substring.auth.app.auth.payload;

import lombok.Data;

@Data
public class ChangePassworddto {
    private String oldPassword;
    private String newPassword;
}