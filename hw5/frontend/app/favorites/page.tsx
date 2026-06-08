import { getAlgorithms } from "../../lib/algorithms";
import FavoritesView from "./view";

export default function FavoritesPage() {
  return <FavoritesView algorithms={getAlgorithms()} />;
}
