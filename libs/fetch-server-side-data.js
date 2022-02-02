import { supabase } from "libs/initAdminSupabase";

export const fetchServerSideBattle = async (battleId) => {
    // The users table in the DB has a Row Level Security policy, that only a user can retrieve it's own data
    // To get the names of the players we need to user the Admin Key from Supabase.
    // Since this function is only called on the server side, we never expose it.
    const { data, error } = await supabase
        .from("battles")
        .select(
            `*,
        user1:player1 ( id, username, image, display_name ),
        user2:player2 ( id, username, image, display_name )`
        )
        .eq("id", battleId)
        .single();
    if (error) throw error;

    return data;
};
