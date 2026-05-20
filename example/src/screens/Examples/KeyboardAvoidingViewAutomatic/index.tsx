import React, { useState } from "react";
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  KeyboardAvoidingView,
  useReanimatedKeyboardAnimation,
} from "react-native-keyboard-controller";
import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

import type { TextInputProps } from "react-native";

type Behavior = "padding" | "height" | "position";
const behaviors: Behavior[] = ["padding", "height", "position"];

function TextInput(props: TextInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <RNTextInput
      {...props}
      style={[styles.textInput, focused && styles.textInputFocused]}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      onFocus={(e) => {
        setFocused(true);
        props.onFocus?.(e);
      }}
    />
  );
}

function KAVContent({
  behavior,
  keyboardVerticalOffset,
  automaticOffset,
}: {
  behavior: Behavior;
  keyboardVerticalOffset: number;
  automaticOffset: boolean;
}) {
  const [rememberMe, setRememberMe] = useState(false);
  const { progress } = useReanimatedKeyboardAnimation();

  const hideOnKeyboardStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0]),
    maxHeight: interpolate(progress.value, [0, 1], [200, 0]),
    overflow: "hidden" as const,
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0]),
  }));

  return (
    <KeyboardAvoidingView
      automaticOffset={automaticOffset}
      behavior={behavior}
      contentContainerStyle={
        behavior === "position" ? styles.container : undefined
      }
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.content}
    >
      <View style={styles.inner}>
        <Animated.View style={[styles.headerSection, hideOnKeyboardStyle]}>
          <Animated.Image
            source={require("../../../assets/logo_black.png")}
            style={[styles.logo, logoAnimatedStyle]}
          />
          <Text style={styles.heading}>
            Good to see{"\n"}you again<Text style={styles.headingDot}>.</Text>
          </Text>
          <Text style={styles.subtitle}>
            Enter your credentials below to access your account and get back to
            what matters most.
          </Text>
        </Animated.View>
        <View style={styles.formSection}>
          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="name@example.com"
              placeholderTextColor="#B0B7C3"
            />
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry
              autoCapitalize="none"
              placeholder="Enter your password"
              placeholderTextColor="#B0B7C3"
            />
          </View>

          {/* Forgot */}
          <View style={styles.forgotRow}>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.85} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity activeOpacity={0.7} style={styles.socialButton}>
          <Text style={styles.socialIcon}>G</Text>
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>


        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default function KeyboardAvoidingViewAutomaticExample() {
  const [behavior, setBehavior] = useState<Behavior>(behaviors[0]);
  const [automaticOffset, setAutomaticOffset] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const offsets = [0, 50, 100];

  return (
    <>
      <KAVContent
        automaticOffset={automaticOffset}
        behavior={behavior}
        keyboardVerticalOffset={offset}
      />
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            Modal ({automaticOffset ? "Auto" : "Manual"})
          </Text>
        </View>
        <KAVContent
          automaticOffset={automaticOffset}
          behavior={behavior}
          keyboardVerticalOffset={offset}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 100,
    height: 24,
    resizeMode: "contain",
    marginBottom: 24,
  },
  headerSection: {
    marginBottom: 32,
  },
  heading: {
    color: "#000000",
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: -0.5,
    lineHeight: 43,
  },
  headingDot: {
    color: "#007AFF",
  },
  subtitle: {
    color: "#8E8E93",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 10,
    lineHeight: 22,
    letterSpacing: -0.24,
  },
  formSection: {
    gap: 20,
  },
  fieldGroup: {
    gap: 7,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3A3A3C",
    letterSpacing: -0.08,
    textTransform: "uppercase",
  },
  textInput: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#D1D1D6",
    paddingHorizontal: 16,
    fontSize: 17,
    color: "#000000",
    letterSpacing: -0.41,
  },
  textInputFocused: {
    borderColor: "#007AFF",
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#007AFF",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  forgotRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: -12,
  },
  forgotText: {
    color: "#007AFF",
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: -0.24,
  },
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#007AFF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 17,
    color: "#FFFFFF",
    letterSpacing: -0.41,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#C6C6C8",
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 13,
    color: "#8E8E93",
    fontWeight: "400",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#D1D1D6",
    backgroundColor: "#FFFFFF",
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  socialText: {
    fontSize: 17,
    fontWeight: "400",
    color: "#000000",
    letterSpacing: -0.41,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    paddingBottom: 28,
  },
  footerText: {
    fontSize: 15,
    color: "#8E8E93",
    letterSpacing: -0.24,
  },
  footerLink: {
    fontSize: 15,
    fontWeight: "600",
    color: "#007AFF",
    letterSpacing: -0.24,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F2F2F7",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#C6C6C8",
  },
  closeButton: {
    color: "#007AFF",
    fontSize: 17,
    fontWeight: "400",
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    marginRight: 40,
    color: "#000000",
  },
});
