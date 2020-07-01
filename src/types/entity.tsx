export type Id = string;
export type userid = string;
export default interface Entity {
  creator: userid;
  created: number;
  id: Id;
}
