import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthButton() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const signOut = async () => {
        "use server";

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        await supabase.auth.signOut();
        return redirect("/");
    };

    return user ? (
        <div className="flex items-center gap-4">
            <form action={signOut}>
                <button className="py-2 ml-2 text-stone-100 px-5 rounded-md no-underline bg-stone-900 hover:bg-stone-700">
                    Logout
                </button>
            </form>
        </div>
    ) : (
        <Link
            href="/login"
            className="py-2 ml-2 px-4 text-stone-100 flex rounded-md no-underline bg-stone-900 hover:bg-stone-700"
        >
            Login
        </Link>
    );
}
