import Image from "next/image";
import classes from "./challenge-details.module.scss";

interface Props {
  name: string;
  statement: string;
  difficulty: string;
  description: string;
  examples: {
    input: string;
    output: string;
  }[];
}

export function ProblemStatement({
  name,
  difficulty,
  statement,
  description,
  examples,
}: Props) {
  return (
    <div className={classes.statement}>
      <h2>{name}</h2>
      <div className={classes.info}>
        <Image src="/js.svg" height={24} width={24} alt="JavaScript" />
        <span className={classes.difficulty}>{difficulty}</span>
      </div>
      <p dangerouslySetInnerHTML={{ __html: statement }}></p>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
      <div>
        {examples.map((example, idx) => (
          <div key={idx}>
            <p>
              <b>Example {idx + 1}</b>
            </p>

            <pre
              className="rounded-md p-4 mt-2 text-md"
              style={{
                backgroundColor: "var(--gray-5)",
              }}
            >
              <span>Input: {example.input}</span>
              <span>Output: {example.output}</span>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
