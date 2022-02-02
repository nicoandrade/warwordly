import { supabase } from "libs/initSupabase";

export const fetchBattle = async (battleId) => {
    const { data, error } = await supabase
        .from("battles")
        .select(`*`)
        .eq("id", battleId)
        .single();
    if (error) throw error;

    return data;
};
