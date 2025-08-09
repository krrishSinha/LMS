import { NextRequest } from "next/server";

export async function getAuthenticatedUser(request: NextRequest) {
    const userId = request.headers.get('userId');
    if (!userId) return null;
    return userId;
}