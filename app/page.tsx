import Logo from "../components/Logo";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Sundial from "@/components/Sundial";

export default async function Index() {
    const cookieStore = cookies();

    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient(cookieStore);
            return true;
        } catch (e) {
            return false;
        }
    };

    const isSupabaseConnected = canInitSupabaseClient();

    return (
        <div className="flex-1 h-full w-full flex flex-col items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    <Logo />
                    {isSupabaseConnected && <AuthButton />}
                </div>
            </nav>

            <Sundial />
        </div>
    );
}
