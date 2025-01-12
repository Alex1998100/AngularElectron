import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    invoke: (channel: string, data: any) => {
        let validChannels = ["get-user-data", "save-settings"]; // Whitelist
        if (validChannels.includes(channel)) {
            try {
                return ipcRenderer.invoke(channel, data);
            } catch (error) {
                console.error("Error invoking IPC:", error);
                throw error; 
            }
        } else {
            throw new Error(`Invalid IPC channel: ${channel}`);
        }
    }
});