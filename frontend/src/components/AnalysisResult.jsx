import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const PdfIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm5 1a1 1 0 00-1 1v1a1 1 0 102 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const ChipIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414m15.556 15.556l-1.414-1.414M18.364 5.636l-1.414 1.414M5.636 18.364l1.414-1.414"
    />
  </svg>
);
const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-green-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const formatKey = (key) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const JsonRenderer = ({ data, isRoot = false }) => {
  if (data === null || typeof data === "undefined") {
    return null;
  }

  if (typeof data === "object" && !Array.isArray(data)) {
    return (
      <div
        className={`space-y-3 ${
          isRoot ? "" : "pl-4 border-l-2 border-gray-700"
        }`}
      >
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <h4 className="font-semibold text-gray-300">{formatKey(key)}</h4>
            <div className="mt-1">
              <JsonRenderer data={value} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (typeof data === "string" && data.includes("```")) {
    return <FormattedOptimization text={data} />;
  }

  if (typeof data === "string" || typeof data === "number") {
    return <p className="text-gray-400 whitespace-pre-wrap">{data}</p>;
  }

  return <p className="text-gray-400">{String(data)}</p>;
};

const ReportSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-teal-400 mb-2">{title}</h3>
    {children}
  </div>
);

const FormattedOptimization = ({ text }) => {
  if (!text) return null;
  const codeBlockRegex = /```(\w+)?\n([\s\S]+?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <p key={lastIndex} className="text-gray-300 mb-3 whitespace-pre-wrap">
          {text.substring(lastIndex, match.index)}
        </p>
      );
    }
    const language = match[1] || "cpp";
    const code = match[2];
    parts.push(
      <div key={match.index} className="my-4">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{ margin: 0, borderRadius: "0.375rem" }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    );
    lastIndex = codeBlockRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(
      <p key={lastIndex} className="text-gray-300 mb-3 whitespace-pre-wrap">
        {text.substring(lastIndex)}
      </p>
    );
  }

  return <div>{parts}</div>;
};

const AnalysisResult = ({
  result,
  error,
  isLoading,
  isPdfLoading,
  onDownloadPdf,
}) => {
  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl h-full flex justify-center items-center">
        <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
          {error}
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl h-full flex flex-col justify-center items-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <h2 className="text-xl font-bold text-gray-400">Analysis Results</h2>
        <p className="text-gray-500">
          Your code analysis will appear here once completed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl h-full overflow-y-scroll flex flex-col animate-fade-in">
      <div className="px-6 py-3.5 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Analysis Report</h2>
        <button
          onClick={onDownloadPdf}
          disabled={isPdfLoading}
          className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-600"
        >
          {isPdfLoading ? (
            "Generating..."
          ) : (
            <>
              <PdfIcon /> Download PDF
            </>
          )}
        </button>
      </div>

      <div className="p-6 overflow-y-auto flex-grow min-h-0">
        <div className="space-y-6">
          {/* Iterate over the top-level keys of the result object */}
          {Object.entries(result).map(([key, value]) => (
            <div key={key} className="bg-gray-900/50 rounded-lg p-4">
              {/* Render the main section title */}
              <h3 className="text-lg font-semibold text-teal-400 mb-3">
                {formatKey(key)}
              </h3>
              {/* Delegate the rendering of the value to our powerful JsonRenderer */}
              <JsonRenderer data={value} isRoot={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
