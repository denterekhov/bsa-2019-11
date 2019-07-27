import { getAllFighters, getFighter, update, create, remove } from '../helpers/apiHelper';

class FighterService {
  async getFighters() {
    try {
      const apiResult = await getAllFighters('/user');
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterById(_id) {
    try {
      const apiResult = await getFighter(`/user/${_id}`);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async updateFighter(updatedFighter) {
    try {
      const apiResult = await update(`/user/${updatedFighter._id}`, JSON.stringify(updatedFighter));
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async createFighter(newFighter) {
    try {
      const apiResult = await create(`/user`, JSON.stringify(newFighter));
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async removeFighter(_id) {
    try {
      const apiResult = await remove(`/user/${_id}`);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
