import { useQuery } from "react-query";
import "./App.css";
import { useSearchParams } from "react-router-dom";
import DataTableRepos from "./RepoDataTable";
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

function Repo(): JSX.Element {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const { status, data, error, isFetching } = useRepo(name);

  async function getData() {
    const url = process.env.REACT_APP_FN_BASE;
    const code = process.env.REACT_APP_FN_REPO_CODE;
    const response = await fetch(`${url}/repo?name=${name}&code=${code}`);
    const json = await response.json();
    return json;
  }
  function useRepo(name: string) {
    return useQuery({
      queryKey: ["Repo", name],
      queryFn: getData,
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
            {data && <DataTableRepos data={data} name={name} />}
            {!data && <>No data found</>}
          </>
        )}
        <div>{isFetching ? "Background Updating..." : " "}</div>
      </div>
    </ErrorBoundary>
  );
}

export default Repo;
