import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { levelService } from "../../services/levelService";
import { contentService } from "../../services/contentService";
import { progressService } from "../../services/progressService";

export default function Coding() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const courseId = searchParams.get("course");
    const levelCode = "coding";

    const [level, setLevel] = useState(null);
    const [content, setContent] = useState(null);

    const [code, setCode] = useState("");
    const [running, setRunning] = useState(false);
    const [result, setResult] = useState(null);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        load();
    }, [courseId]);

    const load = async () => {
        const levelData = await levelService.getLevel(courseId, levelCode);
        setLevel(levelData);

        const contentData = await contentService.getByLevel(levelData.id);
        setContent(contentData?.[0]); // only one coding task
        setCode(contentData?.[0]?.starterCode || "");
    };

    const handleRun = () => {
        setRunning(true);
        setResult(null);

        setTimeout(() => {
            setRunning(false);
            setResult("Accepted ✅");
        }, 5000);
    };

    const handleComplete = async () => {
        await progressService.completeLevel(courseId, level.id);
        setCompleted(true);
    };

    const goNext = () => {
        navigate(`/levels/project?course=${courseId}`);
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">

            <h1 className="text-4xl text-white mb-2">{level?.title}</h1>
            <p className="text-(--text-secondary) mb-6">{level?.description}</p>

            {content && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Problem */}
                    <div className="card h-[420px] overflow-y-auto">
                        <h3 className="text-xl text-white font-semibold mb-3">
                            {content.title}
                        </h3>
                        <pre className="text-(--text-secondary) whitespace-pre-wrap text-sm">
                            {content.problem || "Write HTML page using basic tags."}
                        </pre>
                    </div>

                    {/* Editor */}
                    <div className="card h-[420px] flex flex-col">

                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="flex-1 bg-black text-green-400 font-mono text-sm p-4 rounded resize-none outline-none"
                        />

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleRun}
                                disabled={running}
                                className="btn-secondary disabled:opacity-50"
                            >
                                {running ? "Running..." : "Run & Compile"}
                            </button>

                            <button
                                disabled={!result}
                                onClick={handleComplete}
                                className="btn-primary disabled:opacity-50"
                            >
                                Mark as Completed
                            </button>
                        </div>

                        {result && (
                            <div className="mt-4 text-green-400 font-semibold">
                                Result: {result}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="flex gap-4 mt-8">
                <button
                    disabled
                    className="btn-secondary opacity-50"
                >
                    Previous
                </button>

                <button
                    disabled={!completed}
                    onClick={goNext}
                    className="btn-primary flex-1 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

        </div>
    );
}
