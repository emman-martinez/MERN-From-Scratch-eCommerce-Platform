import { Alert } from "react-bootstrap";
import type { MessageProps } from "../../types";

const Message = ({ children, variant = "info" }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
