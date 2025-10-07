"use server";
import { auth } from "@/lib/better-auth/auth"
import { inngest } from "@/lib/inngest/client"
import {headers} from "next/headers";

export const signUpWithEmail = async (data : SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: { email: data.email, password: data.password, name: data.fullName },
        });

        if (response) {
            await inngest.send({
                name: "app/user.created",
                data: {
                    email: data.email,
                    name: data.fullName,
                    country: data.country,
                    investmentGoals: data.investmentGoals,
                    preferredIndustry: data.preferredIndustry,
                    riskTolerance: data.riskTolerance,
                }
            })
        }

        return { success: true, data: response }

    } catch (e) {
        console.log("Sign Up Failed", e);
        return { success: false, error: "Sign Up Failed" };
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() });
    } catch (e) {
        console.log("Sign Out Failed", e);
        return { success: false, error: "Sign Out Failed" };
    }
}

export const signInWithEmail = async ({ email, password } : SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({
            body: { email, password },
        });

        return { success: true, data: response }

    } catch (e) {
        console.log("Sign In Failed", e);
        return { success: false, error: "Sign In Failed" };
    }
}
