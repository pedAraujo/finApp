import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container}>
            <Text>{title}</Text>

            <View style={styles.inputField}>
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="gray"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                    {...props}
                />

                {title === "Password" && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}>
                        <View>
                            {!showPassword ? (
                                <MaterialIcons
                                    name="remove-red-eye"
                                    size={24}
                                    color="black"
                                />
                            ) : (
                                <MaterialCommunityIcons
                                    name="eye-off"
                                    size={24}
                                    color="black"
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;

const styles = {
    container: {
        width: "100%",
        marginTop: 10,
    },
    inputField: {
        width: "100%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginTop: 5,
    },
};
