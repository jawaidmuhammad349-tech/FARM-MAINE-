import type { Metadata } from "next";
import { BoardBuilder } from "./BoardBuilder";

export const metadata: Metadata = {
  title: "Build Your Own Board",
  description: "Design a custom charcuterie board with Brickhouse Farm meats, cheese and add-ons. Boards start at $50.",
};

export default function BuildYourBoard() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Build Your Own Board</p>
          <h1>Your board, your way</h1>
          <p className="lead">
            Start with a $50 board with two of our cured meats and one cheese, then make it your own with extra meats,
            cheeses and finishing touches.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="container">
          <BoardBuilder />
        </div>
      </section>
    </>
  );
}
