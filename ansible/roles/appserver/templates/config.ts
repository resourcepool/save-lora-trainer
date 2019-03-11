export const config = {
    // DB Config
    host: "db",
    user: "root", // FIXME
    dbPassword: "root", // FIXME
    database: "lora", // FIXME
    // API config
    // BEGIN SAVELORA Client config
    proxySecret: "{{ save_lora_api_proxy_secret }}",
    publicSecret: "{{ save_lora_api_public_secret }}",
    // LoraAppServer config
    loRaServer: {
        baseUrl: "https://{{ loraserver_host }}/api",
        authToken: "{{ loraserver_api_jwt }}",
        rak811DevProfileId: "{{ loraserver_device_profile_id }}",
        loRaApplicationId: "{{ loraserver_application_id }}",
        targetNwkKey: "42:42:42:42:42:42:42:42:42:42:42:42:42:42:42:42"
    },
    // Mock device config
    mockDevice: {
        appEUI: "42:42:42:42:42:42:42:42",
        devEUI: "13:37:00:00:FF:FF:FF:FF",
        appKey: "2E:A2:9C:4F:54:15:A0:0C:CA:4A:CE:B3:F2:B2:44:69"
    },
    // BEGIN MQTT Client config
	mqttClient: {
		clientId: "gotham-watchdog",
		host: "{{ mqtt_broker_host_forclient }}",
		username: "{{ mqtt_admin_user }}",
		password: "{{ mqtt_admin_password }}"
	},
    // END MQTT Client config
};
