import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.8}
            style={containerStyles}
            disabled={isLoading}>
            <Text style={textStyles}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
