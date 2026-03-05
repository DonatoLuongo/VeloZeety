import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  ActivityIndicator,
  BackHandler,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { WEB_APP_URL, WEB_APP_APP_URL } from "./webapp.config";
import { useNotifications } from "./src/hooks/useNotifications";

import SettingsScreen from "./src/screens/SettingsScreen";

type ViewMode = "home" | "webview" | "settings";

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("home");
  const [webLoading, setWebLoading] = useState(true);
  const [webError, setWebError] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const webViewRef = useRef<WebView>(null);
  const { expoPushToken } = useNotifications();

  useEffect(() => {
    // 1. Manejo del botón atrás (Android)
    const backAction = () => {
      if (viewMode === "webview") {
        setViewMode("home");
        return true;
      }
      if (viewMode === "settings") {
        setViewMode("home");
        return true;
      }

      Alert.alert("👋 VeloCity", "¿Deseas cerrar la aplicación?", [
        { text: "Seguir usando", onPress: () => null, style: "cancel" },
        { text: "Salir", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    // 2. Solicitar permisos de ubicación al inicio
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === "granted");
    })();

    return () => backHandler.remove();
  }, [viewMode]);

  const openInBrowser = () => {
    Linking.openURL(WEB_APP_APP_URL);
  };

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <Text style={styles.webMessage}>
          En web usa la aplicación directamente en el navegador:{" "}
          <Text style={styles.link}>{WEB_APP_URL}</Text>
        </Text>
      </View>
    );
  }

  // Vista de Ajustes
  if (viewMode === "settings") {
    return <SettingsScreen onBack={() => setViewMode("home")} />;
  }

  // Pantalla nativa: inicio de la app móvil
  if (viewMode === "home") {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.homeContent}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.title}>VeloCity</Text>
              <Text style={styles.subtitle}>Tu ciudad en movimiento</Text>
            </View>
            <TouchableOpacity
              onPress={() => setViewMode("settings")}
              style={styles.settingsIcon}
            >
              <Text style={styles.settingsIconText}>⚙️</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statusBox}>
            <Text style={styles.statusLabel}>GPS:</Text>
            <Text style={[styles.statusValue, locationPermission ? styles.statusOk : styles.statusError]}>
              {locationPermission === null ? "Verificando…" : locationPermission ? "Activado" : "Denegado"}
            </Text>
          </View>
          <Text style={styles.paragraph}>
            Para ver la aplicación con la interfaz adaptada al móvil (Servicios,
            Perfil, mapa, etc.), ábrela en el navegador de tu teléfono.
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={openInBrowser}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Abrir en navegador</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setViewMode("webview")}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Ver app (mapa, Servicios, Perfil) aquí</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>
            Push Token: {expoPushToken ? "Registrado ✅" : "Pendiente..."}
          </Text>
        </View>
      </View>
    );
  }

  // Vista WebView (opcional)
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.webviewHeader}>
        <TouchableOpacity
          onPress={() => {
            setViewMode("home");
            setWebError(null);
          }}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Explorando VeloCity</Text>
      </View>
      {webError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{webError}</Text>
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: WEB_APP_APP_URL }}
        style={[styles.webview, webLoading && styles.webviewHidden]}
        onLoadStart={() => setWebError(null)}
        onLoadEnd={() => setWebLoading(false)}
        onError={(e) =>
          setWebError(
            e.nativeEvent?.description || "No se pudo cargar la aplicación web."
          )
        }
        onHttpError={(e) => {
          if (e.nativeEvent.statusCode >= 400) {
            setWebError(
              `Error ${e.nativeEvent.statusCode}. ¿Está la web corriendo en la PC (puerto 3000)?`
            );
          }
        }}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        startInLoadingState={false}
        scalesPageToFit
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
      {webLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#F46E20" />
          <Text style={styles.loadingText}>Cargando…</Text>
        </View>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  homeContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  settingsIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  settingsIconText: {
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3F474A",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 15,
    color: "#3F474A",
    lineHeight: 22,
    marginBottom: 28,
  },
  primaryButton: {
    backgroundColor: "#F46E20",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: "#F46E20",
    fontSize: 16,
    fontWeight: "600",
  },
  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginRight: 8,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  statusOk: {
    color: "#10b981",
  },
  statusError: {
    color: "#ef4444",
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#3F474A",
    textAlign: "center",
    marginRight: 40,
  },
  hint: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 20,
  },
  webviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: "#F46E20",
    fontWeight: "600",
  },
  webview: {
    flex: 1,
  },
  webviewHidden: {
    opacity: 0,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#64748b",
  },
  errorBox: {
    margin: 12,
    padding: 16,
    backgroundColor: "#fef2f2",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  errorText: {
    fontSize: 14,
    color: "#b91c1c",
    fontWeight: "500",
  },
  webMessage: {
    padding: 24,
    fontSize: 16,
    color: "#334155",
  },
  link: {
    color: "#F46E20",
    fontWeight: "600",
  },
});
