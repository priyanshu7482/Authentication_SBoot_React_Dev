package com.substring.auth.app.auth.config;

public class AppConstants {

    public static final String[] AUTH_PUBLIC_URLS = {
            "/api/v1/auth/**",
            "/v3/api-docs/**",
            "/swagger-ui.html",
            "/swagger-ui/**"
    };

    public static final String[] AUTH_ADMIN_URLS = {
            "/api/v1/users"  // get all users - admin only
    };

    public static final String[] AUTH_GUEST_URLS = {
            "/api/v1/users/*/change-password",  // change password
            "/api/v1/users/email/**",            // get by email
            "/api/v1/users/*"                    // update, delete, get by id
    };

    public static final String ADMIN_ROLE = "ADMIN";
    public static final String GUEST_ROLE = "GUEST";
}