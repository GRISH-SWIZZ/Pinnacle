import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { levelService } from "../../services/levelService";
import { contentService } from "../../services/contentService";
import { progressService } from "../../services/progressService";

export default function Project() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const courseId = searchParams.get("course");
    const levelCode = "project";

    const [level, setLevel] = useState(null);
    const [content, setContent] = useState(null);

    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        load();
    }, [courseId]);

    const load = async () => {
        const levelData = await levelService.getLevel(courseId, levelCode);
        setLevel(levelData);

        const contentData = await contentService.getByLevel(levelData.id);
        setContent(contentData?.[0]);
    };

    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files);

        const allowed = selected.every(f =>
            f.name.endsWith(".html") ||
            f.name.endsWith(".css") ||
            f.name.endsWith(".js")
        );

        if (!allowed) {
            alert("Only HTML, CSS and JS files allowed");
            return;
        }

        setFiles(selected);
    };

    const handleUpload = () => {
        if (files.length === 0) {
            alert("Please select files");
            return;
        }

        setUploading(true);

        setTimeout(() => {
            setUploading(false);
            setUploaded(true);
            alert("Project uploaded successfully");
        }, 5000);
    };

    const handleComplete = async () => {
        await progressService.completeLevel(courseId, level.id);
        setCompleted(true);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">

            <h1 className="text-4xl text-white mb-2">{level?.title}</h1>
            <p className="text-(--text-secondary) mb-6">{level?.description}</p>

            <div className="card">

                <h3 className="text-xl text-white font-semibold mb-3">
                    {content?.title}
                </h3>

                <p className="text-(--text-secondary) mb-4">
                    {content?.instructions}
                </p>

                <input
                    type="file"
                    multiple
                    accept=".html,.css,.js"
                    onChange={handleFileChange}
                    className="mb-4 text-white"
                />

                {files.length > 0 && (
                    <ul className="text-sm text-(--text-secondary) mb-4">
                        {files.map(f => (
                            <li key={f.name}>• {f.name}</li>
                        ))}
                    </ul>
                )}

                <button
                    disabled={uploading || uploaded}
                    onClick={handleUpload}
                    className="btn-primary w-full disabled:opacity-50"
                >
                    {uploading ? "Uploading..." : uploaded ? "Uploaded" : "Submit Project"}
                </button>
            </div>

            <button
                disabled={!uploaded}
                onClick={handleComplete}
                className="btn-primary mt-6 w-full disabled:opacity-50"
            >
                Mark Level as Completed
            </button>

            {completed && (
                <button
                    onClick={() => navigate(`/certificate?course=${courseId}`)}
                    className="btn-secondary mt-4 w-full"
                >
                    View Course Certificate
                </button>
            )}

        </div>
    );
}
