import "./App.css";
import DataTableOrg from "./OrgDataTable";
import { useQuery } from "react-query";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function Org(): JSX.Element {
  const { status, data, error, isFetching } = useOrg();

  async function getOrg() {
    const base = process.env.REACT_APP_FN_BASE;
    const code = process.env.REACT_APP_FN_ORG_CODE;
    const url = `${base}/org?code=${code}`;

    const response = await fetch(url);
    const json = await response.json();

    return { org: json, date: json[0]?.customDateUploaded.slice(0, 10) };
  }

  function useOrg() {
    return useQuery({
      queryKey: ["Org"],
      queryFn: getOrg,
    });
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <div className="App">
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {(error as Error).message}</span>
        ) : (
          <>
            {data && (
              <DataTableOrg data={data.org} collectionDate={data.date} />
            )}
            {!data && <>No data found</>}
          </>
        )}
        <div>{isFetching ? "Background Updating..." : " "}</div>
      </div>
    </ErrorBoundary>
  );
}

export default Org;
