import { EventEmitter } from 'events';
import tauri from 'tauri';

class TauriProxyIPC extends EventEmitter {
  send(channel, ...args) {
    return ipc.send(internal, channel, args);
  };

  sendSync(channel, ...args) {
    return ipc.sendSync(internal, channel, args);
  };

  sendToHost(channel, ...args) {
    return ipc.sendToHost(channel, args);
  };

  sendTo(webContentsId, channel, ...args) {
    return ipc.sendTo(internal, webContentsId, channel, args);
  };

  async invokeasync(channel, ...args) {
    const { error, result } = await ipc.invoke(internal, channel, args);
    if (error) {
      throw new Error(`Error invoking remote method '${channel}': ${error}`);
    }
    return result;
  };

  postMessage(channel: string, message: any, transferables: any) {
    return ipc.postMessage(channel, message, transferables);
  };
}

export const ipcRenderer = new TauriProxyIPC();
