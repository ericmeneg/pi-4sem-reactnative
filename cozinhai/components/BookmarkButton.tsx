"use client"

import type React from "react"
import { useState } from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

interface BookmarkButtonProps {
  size?: number
  activeColor?: string
  inactiveColor?: string
}

export default function BookmarkButton({
  size = 24,
  activeColor = "#22577A",
  inactiveColor = "#CCCCCC",
}: BookmarkButtonProps){
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handlePress = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
      <FontAwesome
        name={isBookmarked ? "bookmark" : "bookmark-o"}
        size={size}
        color={isBookmarked ? activeColor : inactiveColor}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
  },
})