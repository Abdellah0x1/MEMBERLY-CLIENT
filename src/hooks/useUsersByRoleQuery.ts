import { getUsersByRole } from "../api/requests";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/auth";



type UsersByRolePayload = {
    users?: User[];
};

function normalizeUsers(payload: unknown): User[] {
    if (Array.isArray(payload)) {
        return payload as User[];
    }

    if (payload && typeof payload === "object" && Array.isArray((payload as UsersByRolePayload).users)) {
        return (payload as UsersByRolePayload).users ?? [];
    }

    return [];
}

export const useUsersByRoleQuery = (role: string, gymId: string | undefined) =>
    useQuery({
        queryKey: ["users-by-role", role, gymId],
        enabled: Boolean(role && gymId),
        queryFn: async () => {
            const response = await getUsersByRole(role, gymId);
            return normalizeUsers(response.data?.data);
        },
    });