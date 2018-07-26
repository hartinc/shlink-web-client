import Storage from '../../utils/Storage';
import { dissoc } from 'ramda';

const SERVERS_STORAGE_KEY = 'servers';

export class ServersService {
  constructor(storage) {
    this.storage = storage;
  }

  listServers = () => {
    return this.storage.get(SERVERS_STORAGE_KEY) || [];
  };

  findServerById = serverId => {
    const servers = this.listServers();
    return servers[serverId];
  };

  createServer = server => {
    const servers = this.listServers();
    servers[server.id] = server;
    this.storage.set(SERVERS_STORAGE_KEY, servers);
  };

  deleteServer = server => {
    const servers = dissoc(server.id, this.listServers());
    this.storage.set(SERVERS_STORAGE_KEY, servers);
  };
}

export default new ServersService(Storage);
