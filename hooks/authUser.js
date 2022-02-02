import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "libs/initSupabase";
import { useRouter } from "next/router";

export const RequireAuth = () => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        // Only if user is "false" we redirect to the login page, if it is "null" it means we dind't check for a session yet
        if (user === false) {
            router.push("/login");
        }
    }, [user, router]);
};

export const AuthRedirect = () => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);
};

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [userLoaded, setUserLoaded] = useState(false);
    const [session, setSession] = useState(false);
    const [user, setUser] = useState(null); // "null" means we didn't check for a user session yet, "false" means the user is not logged in
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const session = supabase.auth.session();
        setSession(session);
        setUser(session?.user ?? false);
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setSession(session);
                setUser(session?.user ?? false);
            }
        );

        return () => {
            authListener.unsubscribe();
        };
    }, []);
    const getUserDetails = () =>
        supabase.from("users").select("*").eq("id", user.id).single();

    useEffect(() => {
        if (user) {
            Promise.allSettled([getUserDetails()]).then((results) => {
                setUserDetails(results[0].value.data);
                setUserLoaded(true);
            });
        }
    }, [user]);

    const value = {
        session,
        user,
        userDetails,
        userLoaded,
        signIn: (options) => supabase.auth.signIn(options),
        signUp: (data, options) => supabase.auth.signUp(data, options),
        signOut: () => {
            setUserDetails(null);
            return supabase.auth.signOut();
        },
    };
    return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error(`useUser must be used within a UserContextProvider.`);
    }
    return context;
};

const AuthUser = () => {
    const { user } = useUser();
    return user;
};

export default AuthUser;
