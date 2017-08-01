import { StoreController } from "./../lib/index";
import storeList from "./storeList";
import subscriptionMap from "./subscriptionMap.json";

const stores = new StoreController({ storeList: storeList, subscriptionMap: subscriptionMap });

export default stores;