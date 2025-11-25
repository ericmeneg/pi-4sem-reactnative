"use client"
import type React from "react"
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

interface BookmarkButtonProps {
  isFavorite: boolean
  onPress: (e?: any) => void
  loading?: boolean
  size?: number
  activeColor?: string
  inactiveColor?: string
}

export default function BookmarkButton({
  isFavorite,
  onPress,
  loading = false,
  size = 24,
  activeColor = "#22577A",
  inactiveColor = "#CCCCCC",
}: BookmarkButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress} 
      activeOpacity={0.7}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={activeColor} />
      ) : (
        <FontAwesome
          name={isFavorite ? "bookmark" : "bookmark-o"}
          size={size}
          color={isFavorite ? activeColor : inactiveColor}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
})