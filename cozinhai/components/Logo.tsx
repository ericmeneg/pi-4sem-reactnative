// /components/Logo.tsx
import React from "react";
import { View, Image, StyleSheet } from "react-native";

type LogoProps = {
  size?: number;
};

export default function Logo({ size = 200 }: LogoProps) {
  return (
    <>
      <Image
        source={require("../assets/logo.png")}
        style={[styles.logo, { width: size, height: size }]}
      />

      <View style={{ height: size + 20 }} /> 
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
