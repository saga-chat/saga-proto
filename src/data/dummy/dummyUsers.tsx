import { times, keyBy } from "lodash";
import makeUser from "./makeUser";

export default keyBy(times(10, makeUser), "id");
