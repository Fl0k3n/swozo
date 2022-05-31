package com.swozo.security.util;

import com.swozo.api.auth.dto.AppRole;
import com.swozo.model.users.Role;
import com.swozo.model.users.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;

public class AuthUtils {
    public static String GRANTED_AUTHORITY_PREFIX = "ROLE_";

    private AuthUtils() {
    }

    public static Collection<? extends GrantedAuthority> getUsersAuthorities(User user) {
        return getUsersAuthorities(user.getRoles().stream().map(Role::getName).toList());
    }

    public static Collection<? extends GrantedAuthority> getUsersAuthorities(List<String> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(GRANTED_AUTHORITY_PREFIX + role))
                .toList();
    }

    public static String toSpringRole(AppRole role) {
        return GRANTED_AUTHORITY_PREFIX + role.toString();
    }
}