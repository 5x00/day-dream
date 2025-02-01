import "./Solutions_Page.css";
import { useState } from "react";

type Solution = {
  id: number;
  title: string;
  info: string;
  image: string;
};

const solutionsData: Solution[] = [
  {
    id: 1,
    title: "Solution 1",
    info: "Detailed information about Solution 1.",
    image: "/images/1.jpg",
  },
  {
    id: 2,
    title: "Solution 2",
    info: "Detailed information about Solution 2.",
    image: "/images/2.jpg",
  },
  {
    id: 3,
    title: "Solution 3",
    info: "Detailed information about Solution 3.",
    image: "/images/3.jpg",
  },
];

function Solutions_Page() {
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);

  return (
    <>
      <div className="solutions-page">
        <div className="solutions-container">
          {/* LEFT SECTION: Titles and More Info */}
          <div className="left-section">
            {solutionsData.map((solution) => (
              <div
                key={solution.id}
                className={`solution-item ${
                  hoveredSolution === solution.id ? "active" : ""
                }`}
                onMouseEnter={() => setHoveredSolution(solution.id)}
                onMouseLeave={() => setHoveredSolution(null)}
              >
                <h2 className="solution-title">{solution.title}</h2>
                <div className="solution-info">{solution.info}</div>
              </div>
            ))}
          </div>

          {/* RIGHT SECTION: Image */}
          <div className="right-section">
            {hoveredSolution && (
              <img
                src={
                  solutionsData.find((sol) => sol.id === hoveredSolution)
                    ?.image || ""
                }
                alt="Solution"
                className="solution-image"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Solutions_Page;
