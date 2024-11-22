import { useState, useEffect } from "react";
import { AiFillCode } from "react-icons/ai";
import { FiRefreshCw } from "react-icons/fi";
import { FaHtml5, FaCss3Alt, FaJsSquare } from "react-icons/fa";

const CodePenClone = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [error, setError] = useState("");

  // Generate combined HTML, CSS, and JavaScript for the preview
  const renderOutput = () => {
    try {
      setError(""); // Clear errors before rendering
      return `
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>
              (function() {
                ${js}
              })();
            </script>
          </body>
        </html>
      `;
    } catch (err) {
      // TypeScript fix: explicitly type 'err' as 'any'
      const errorMessage = (err as Error).message || "Unknown error occurred";
      setError(errorMessage); // Capture errors for display
      return "";
    }
  };

  // Auto-refresh preview on code change if enabled
  useEffect(() => {
    if (autoRefresh) {
      const timeout = setTimeout(() => setSrcDoc(renderOutput()), 300); // Debounce update
      return () => clearTimeout(timeout);
    }
  }, [html, css, js, autoRefresh]);

  // Handle Refresh Button Click
  const handleRefresh = () => {
    setSrcDoc(renderOutput());
  };

  // Save code to localStorage
  const saveCode = () => {
    const codeData = { html, css, js };
    localStorage.setItem("codePenData", JSON.stringify(codeData));
    alert("Code saved!");
  };

  // Load code from localStorage
  const loadCode = () => {
    const savedData = JSON.parse(localStorage.getItem("codePenData") || "{}");
    setHtml(savedData.html || "");
    setCss(savedData.css || "");
    setJs(savedData.js || "");
    setSrcDoc(renderOutput());
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <AiFillCode className="text-3xl" />
            CodePen Clone
          </h1>
          <div className="flex gap-4">
            <button
              onClick={saveCode}
              className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-500 transition"
            >
              Save
            </button>
            <button
              onClick={loadCode}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-500 transition"
            >
              Load
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Editor Section */}
        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 border-r border-gray-300">
          <EditorField
            label="HTML"
            value={html}
            setValue={setHtml}
            placeholder="Write HTML code..."
            icon={<FaHtml5 className="text-orange-500 text-2xl" />}
          />
          <EditorField
            label="CSS"
            value={css}
            setValue={setCss}
            placeholder="Write CSS code..."
            icon={<FaCss3Alt className="text-blue-500 text-2xl" />}
          />
          <EditorField
            label="JavaScript"
            value={js}
            setValue={setJs}
            placeholder="Write JavaScript code..."
            icon={<FaJsSquare className="text-yellow-500 text-2xl" />}
          />
        </div>

        {/* Preview Section */}
        <div className="lg:w-1/2 bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Live Preview</h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-gray-600 font-medium">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={() => setAutoRefresh((prev) => !prev)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                Auto Refresh
              </label>
              <button
                onClick={handleRefresh}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow flex items-center gap-2 hover:bg-indigo-500 transition"
              >
                <FiRefreshCw />
                Refresh
              </button>
            </div>
          </div>
          <div className="border rounded-lg shadow-md overflow-hidden">
            <iframe
              srcDoc={srcDoc}
              title="Live Preview"
              sandbox="allow-scripts"
              className="w-full h-[500px]"
            />
          </div>
          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-md mt-4">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Editor Field Component
interface EditorFieldProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
}

const EditorField: React.FC<EditorFieldProps> = ({
  label,
  value,
  setValue,
  placeholder,
  icon,
}) => {
  return (
    <div
      className={`flex flex-col border p-4 rounded-md shadow focus-within:border-indigo-500 focus-within:shadow-lg`}
    >
      <label className="text-gray-600 font-medium mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="bg-gray-100 text-gray-800 p-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y h-40"
      />
    </div>
  );
};

export default CodePenClone;
