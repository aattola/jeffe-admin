class ConfigManager {
  protected static instance: ConfigManager;

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }

    return ConfigManager.instance;
  }

  // constructor() {}

  writeToConfg(key: string, dataWrite: any, identifier?: string | number): Promise<void> {
    return new Promise((resolve, reject) => {
      const data = { ...JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'data.json')) };

      if (identifier) {
        if (!data.personalOptions[identifier]) {
          data.personalOptions[identifier] = {};
        }
        data.personalOptions[identifier][key] = dataWrite;
        SaveResourceFile(GetCurrentResourceName(), 'data.json', JSON.stringify(data, null, 2), -1);
        resolve();
      } else {
        data[key] = dataWrite;
        SaveResourceFile(GetCurrentResourceName(), 'data.json', JSON.stringify(data, null, 2), -1);
        resolve();
      }
    });
  }

  readConfig(): Promise<any> {
    return new Promise((resolve) => {
      const data = JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'data.json'));
      resolve(data);
    });
  }

  readFromConfig(key: string, identifier?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const data = JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'data.json'));

      if (identifier) {
        if (!data.personalOptions[identifier]) {
          data.personalOptions[identifier] = {};
          reject({ error: 'not found' });
        }
        if (!data.personalOptions[identifier][key]) {
          reject({ error: 'not found' });
        }
        const returnData = data.personalOptions[identifier][key];
        if (!returnData) reject({ error: 'not found' });
        resolve(returnData);
      } else {
        const returnData = data[key];

        if (!returnData) reject({ error: 'not found' });

        resolve(returnData);
      }
    });
  }
}

export default ConfigManager;
