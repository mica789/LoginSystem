package com.raab.authbackend.util;

import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public class PasswordUtils {

    private static final int SALT_LENGTH = 32;
    private static final int HASH_LENGTH = 64;
    private static final int ITERATIONS = 100000;
    private static final String ALGORITHM = "PBKDF2WithHmacSHA512";

    public static String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[SALT_LENGTH];
        random.nextBytes(salt);
        return bytesToHex(salt);
    }

    public static String hashPassword(String password, String salt) {
        try {
            // Convert hex salt back to bytes
            byte[] saltBytes = hexToBytes(salt);

            // Create PBKDF2 key specification
            PBEKeySpec spec = new PBEKeySpec(
                    password.toCharArray(),
                    saltBytes,
                    ITERATIONS,
                    HASH_LENGTH * 8 // Convert bytes to bits
            );

            SecretKeyFactory factory = SecretKeyFactory.getInstance(ALGORITHM);

            byte[] hashedBytes = factory.generateSecret(spec).getEncoded();

            spec.clearPassword();

            return bytesToHex(hashedBytes);

        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException("Error hashing password: " + e.getMessage(), e);
        }
    }

    public static boolean verifyPassword(String password, String storedHash, String storedSalt) {
        String hashedInput = hashPassword(password, storedSalt);
        return slowEquals(hashedInput, storedHash);
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    private static byte[] hexToBytes(String hex) {
        int length = hex.length();
        byte[] bytes = new byte[length / 2];
        for (int i = 0; i < length; i += 2) {
            bytes[i / 2] = (byte) ((Character.digit(hex.charAt(i), 16) << 4)
                    + Character.digit(hex.charAt(i + 1), 16));
        }
        return bytes;
    }

    private static boolean slowEquals(String a, String b) {
        if (a.length() != b.length()) {
            return false;
        }

        int diff = 0;
        for (int i = 0; i < a.length(); i++) {
            diff |= a.charAt(i) ^ b.charAt(i);
        }
        return diff == 0;
    }
}