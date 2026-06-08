import Link from "next/link";

import FavoriteButton from "./FavoriteButton";
import type { DisplayAlgorithm } from "../lib/types";

export default function AlgorithmCard({ algorithm, index }: { algorithm: DisplayAlgorithm; index: number }) {
  return (
    <article className="card">
      <div className="card-top">
        <span className="number">{String(index + 1).padStart(2, "0")}</span>
        <span className="badge">{algorithm.displayDifficulty}</span>
      </div>
      <div>
        <div className="eyebrow">{algorithm.displayCategory}</div>
        <h2>{algorithm.displayName}</h2>
      </div>
      <p className="summary">{algorithm.summary}</p>
      <div className="card-actions">
        <Link className="link" href={`/algorithms/${algorithm.slug}`}>
          開始學習
        </Link>
        <FavoriteButton slug={algorithm.slug} />
      </div>
    </article>
  );
}
