import { test } from './same';

export default function main() {
  console.log("from B");
  test();
}

throw Error("from B");
