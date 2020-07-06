import { Id } from "../entity";
import uniqid from "uniqid";
import { User } from "../user";

const makeUser = (): User => {
  const id = uniqid();
  return {
    id,
    created: Date.now(),
    avatar: `http://tinygraphs.com/squares/${id}?theme=duskfalling&numcolors=4&size=220&fmt=png`,
    username: `testuser_${id}`,
    display_name: `Test ${id}`,
  };
};

export default makeUser;
