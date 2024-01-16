import { Sender } from "./senderType";

  export interface Message {
    content: string;
    sender: Sender;
  }