/* eslint-disable @typescript-eslint/no-explicit-any */
import { Solution } from "@/ui/components/challenge/challenge-details/solution";
import classes from "./submissions-table.module.scss";
import { Trash } from "lucide-react";
import { Code } from "lucide-react";
import { Fragment, useState } from "react";

interface Props {
  records: any[];
  deleteSubmission: (submissionId: string) => void;
  isLoading: boolean;
}

export function SubmissionsTable({
  records,
  deleteSubmission,
  isLoading,
}: Props) {
  const [shouldDisplayCode, setShouldDisplayCode] = useState<string | null>(
    null
  );

  return (
    <div className={classes.tableWrapper}>
      <table className={classes.submissionsTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Language</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record: any) => (
            <Fragment key={record.$id}>
              <tr>
                <td>{new Date(record.$createdAt).toDateString()}</td>
                <td>JavaScript</td>
                <td>{record.status ? "Pass" : "Fail"}</td>
                <td>
                  <button
                    onClick={() => {
                      setShouldDisplayCode(
                        shouldDisplayCode === record.$id ? null : record.$id
                      );
                    }}
                    className={classes.viewButton}
                    title="code"
                    aria-label="code"
                  >
                    <Code />
                  </button>
                </td>
                <td>
                  <button
                    className={classes.viewButton}
                    onClick={() => deleteSubmission(record.$id)}
                    disabled={isLoading}
                    title="delete"
                    aria-label="delete"
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
              {shouldDisplayCode === record.$id && (
                <tr>
                  <td colSpan={5}>
                    <Solution code={record.code} />
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
