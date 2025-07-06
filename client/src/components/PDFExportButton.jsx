import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileDown, Loader2 } from "lucide-react";
import { exportReviewAsPDF } from "../services/pdfService";

export default function PDFExportButton({ contentRef }) {
    const [loading, setLoading] = useState(false);

    const handleExport = async () => {
        if (!contentRef?.current) return;
        const htmlContent = contentRef.current.outerHTML;

        try {
            setLoading(true);
            await exportReviewAsPDF(htmlContent);
        } catch (err) {
            console.error("❌ PDF export failed:", err);
            alert("Something went wrong while generating PDF.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.button
            onClick={handleExport}
            whileTap={{ scale: 0.96 }}
            disabled={loading}
            aria-label="Export PR Review as PDF"
            className="cursor-pointer group inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating PDF...
                </>
            ) : (
                <>
                    <FileDown className="w-5 h-5" />
                    Export as PDF
                </>
            )}
        </motion.button>
    );
}
