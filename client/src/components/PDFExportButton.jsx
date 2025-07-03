import React from "react";
import { exportReviewAsPDF } from "../services/pdfService";

export default function PDFExportButton({ contentRef }) {
    const handleExport = async () => {
        if (!contentRef.current) return;

        const htmlContent = contentRef.current.outerHTML;

        try {
            await exportReviewAsPDF(htmlContent);
        } catch (err) {
            console.error("❌ PDF export failed:", err);
        }
    };

    return (
        <button
            onClick={handleExport}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
            📄 Export as PDF
        </button>
    );
}
