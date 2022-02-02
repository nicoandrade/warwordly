import useSWR from "swr";
import { fetchBattle } from "libs/fetch-app-data";

export default function useBattle(battleId, swrOptions = null) {
    const { data, error, mutate } = useSWR(
        battleId ? battleId : null,
        fetchBattle,
        swrOptions
    );
    return {
        battle: data,
        battleLoading: !error && !data,
        battleError: error,
        battleMutate: mutate,
    };
}
