import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return Response.json("Hello, Wave Plus Academy!");
}
