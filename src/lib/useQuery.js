import { useMemo } from "react";
import {
    BrowserRouter as Router,
    useLocation
} from "react-router-dom";

//Gets the url query parameters that determine the classes in the cart
export function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}