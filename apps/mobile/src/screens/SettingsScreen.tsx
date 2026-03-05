import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, Linking, Platform } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

export default function SettingsScreen({ onBack }: { onBack: () => void }) {
    const [gpsPermission, setGpsPermission] = useState(false);
    const [notifyPermission, setNotifyPermission] = useState(false);

    useEffect(() => {
        checkPermissions();
    }, []);

    const checkPermissions = async () => {
        const loc = await Location.getForegroundPermissionsAsync();
        setGpsPermission(loc.status === 'granted');

        const notif = await Notifications.getPermissionsAsync();
        setNotifyPermission(notif.status === 'granted');
    };

    const toggleGps = async () => {
        if (gpsPermission) {
            // No se puede "quitar" permiso programáticamente en Android fácil, redirigimos a ajustes
            Linking.openSettings();
        } else {
            const { status } = await Location.requestForegroundPermissionsAsync();
            setGpsPermission(status === 'granted');
        }
    };

    const toggleNotifications = async () => {
        if (notifyPermission) {
            Linking.openSettings();
        } else {
            const { status } = await Notifications.requestPermissionsAsync();
            setNotifyPermission(status === 'granted');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Configuración</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Permisos del Sistema</Text>
                    <Text style={styles.sectionDescription}>
                        Gestiona cómo VeloCity interactúa con tu dispositivo para ofrecerte el mejor servicio.
                    </Text>

                    <View style={styles.item}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Ubicación (GPS)</Text>
                            <Text style={styles.itemSubtitle}>
                                Necesaria para encontrarte en el mapa, calcular tarifas precisas y conectar con conductores cercanos.
                            </Text>
                        </View>
                        <Switch
                            value={gpsPermission}
                            onValueChange={toggleGps}
                            trackColor={{ false: "#cbd5e1", true: "#fdba74" }}
                            thumbColor={gpsPermission ? "#F46E20" : "#f1f5f9"}
                        />
                    </View>

                    <View style={styles.item}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Notificaciones Push</Text>
                            <Text style={styles.itemSubtitle}>
                                Te avisaremos cuando tu conductor llegue, recibas pagos o haya promociones importantes.
                            </Text>
                        </View>
                        <Switch
                            value={notifyPermission}
                            onValueChange={toggleNotifications}
                            trackColor={{ false: "#cbd5e1", true: "#fdba74" }}
                            thumbColor={notifyPermission ? "#F46E20" : "#f1f5f9"}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => Linking.openSettings()}
                >
                    <Text style={styles.settingsButtonText}>Abrir ajustes del sistema</Text>
                </TouchableOpacity>

                <Text style={styles.footerNote}>
                    VeloCity respeta tu privacidad. Solo usamos estos datos mientras la aplicación está en uso o durante un viaje activo.
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    backButton: {
        padding: 8,
    },
    backButtonText: {
        fontSize: 16,
        color: '#F46E20',
        fontWeight: '600',
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: '#3F474A',
        textAlign: 'center',
        marginRight: 60,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#3F474A',
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 20,
        marginBottom: 24,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    itemInfo: {
        flex: 1,
        paddingRight: 16,
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#3F474A',
        marginBottom: 4,
    },
    itemSubtitle: {
        fontSize: 13,
        color: '#94a3b8',
        lineHeight: 18,
    },
    settingsButton: {
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        backgroundColor: '#fff',
    },
    settingsButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
    },
    footerNote: {
        marginTop: 24,
        textAlign: 'center',
        fontSize: 12,
        color: '#94a3b8',
        lineHeight: 18,
        paddingHorizontal: 20,
        marginBottom: 40,
    }
});
