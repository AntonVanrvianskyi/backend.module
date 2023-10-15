import {updatePriceAdvertisement} from "./update.price.crone";

export const cronRunner = () => {
  updatePriceAdvertisement.start()
}