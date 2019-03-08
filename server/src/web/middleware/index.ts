import {
  handleAuth,
  handleCors,
  handleBodyRequestParsing,
  handleCompression
} from "./common";

export default [
  handleAuth,
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
];
