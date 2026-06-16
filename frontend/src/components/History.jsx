import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.detail || "Failed to fetch history");
        }
        const data = await response.json();
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-400 p-8">{error}</div>;
  }

  return (
    <div className="p-4 md:p-8 text-white w-full h-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8">Analysis History</h1>
      {history.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-400 text-lg">
            You have no analysis history yet.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {history.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700"
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-4 border-b border-gray-600 pb-4">
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-cyan-400">
                    {item.analysis_result.report_title ||
                      "Code Analysis Report"}
                  </h2>
                  <p className="text-sm text-gray-400 mt-2">
                    Language:{" "}
                    <span className="font-mono bg-gray-900 px-2 py-1 rounded text-cyan-300">
                      {item.language}
                    </span>
                    <span className="mx-2">|</span>
                    Reviewed on: {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-center ml-0 md:ml-4 mt-4 md:mt-0 bg-gray-900 p-3 rounded-lg">
                  <p className="text-gray-300 text-sm font-semibold">
                    Overall Score
                  </p>
                  <p className="text-4xl font-bold text-green-400">
                    {item.analysis_result.overall_score}/10
                  </p>
                </div>
              </div>

              <div className="space-y-5 mt-4">
                {item.analysis_result.code_overview?.summary && (
                  <section>
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                      Code Overview
                    </h3>
                    <p className="whitespace-pre-wrap bg-gray-900/50 p-3 rounded">
                      {item.analysis_result.code_overview.summary}
                    </p>
                  </section>
                )}
                {item.analysis_result.code_quality?.feedback && (
                  <section>
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                      Code Quality Analysis
                    </h3>
                    <p className="whitespace-pre-wrap bg-gray-900/50 p-3 rounded">
                      {item.analysis_result.code_quality.feedback}
                    </p>
                  </section>
                )}
                {item.analysis_result.performance_analysis?.report && (
                  <section>
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                      Performance Analysis
                    </h3>
                    <p className="whitespace-pre-wrap bg-gray-900/50 p-3 rounded">
                      {item.analysis_result.performance_analysis.report}
                    </p>
                  </section>
                )}
                {item.analysis_result.optimization_and_security
                  ?.suggestions && (
                  <section>
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                      Optimization & Security Suggestions
                    </h3>
                    <p className="whitespace-pre-wrap bg-gray-900/50 p-3 rounded">
                      {
                        item.analysis_result.optimization_and_security
                          .suggestions
                      }
                    </p>
                  </section>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
