import React, { useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

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
        <View style={styles.headerSection}>
          <Text style={styles.heading}>
            Good to see{"\n"}you again<Text style={styles.headingDot}>.</Text>
          </Text>
          <Text style={styles.subtitle}>
            Enter your credentials below to access your account and get back to
            what matters most.
          </Text>
        </View>
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
    backgroundColor: "#FFFFFF",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  headerSection: {
    marginBottom: 12,
  },
  heading: {
    color: "#0F172A",
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: -1,
    lineHeight: 46,
  },
  headingDot: {
    color: "#007AFF",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
    lineHeight: 23,
  },
  formSection: {
    paddingTop: 28,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  textInput: {
    height: 52,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#0F172A",
  },
  textInputFocused: {
    borderColor: "#007AFF",
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#007AFF",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
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
    marginTop: -4,
    marginBottom: 8,
  },
  forgotText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#007AFF",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 17,
    color: "#FFFFFF",
    letterSpacing: -0.2,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "500",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    gap: 10,
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  socialText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 28,
  },
  footerText: {
    fontSize: 14,
    color: "#94A3B8",
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#007AFF",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E2E8F0",
  },
  closeButton: {
    color: "#007AFF",
    fontSize: 17,
    fontWeight: "600",
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    marginRight: 40,
    color: "#0F172A",
  },
});
