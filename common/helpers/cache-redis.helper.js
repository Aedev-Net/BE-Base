const { setToRedis, getFromRedis } = require('../../services/redis.service');

class CachedRedisHelper {
  async cacheToRedis(key, data) {
    try {
      if (!key || !data) return;

      data = JSON.stringify(data);
      await setToRedis(key, data);
    } catch (error) {
      console.error(error);
    }
  }

  async getDataFromRedis(key) {
    try {
      if (!key) return;

      let data = await getFromRedis(key);

      if (data) data = JSON.parse(data);

      return data;
    } catch (error) {
      console.error(error);
      return;
    }
  }
}

module.exports = new CachedRedisHelper();