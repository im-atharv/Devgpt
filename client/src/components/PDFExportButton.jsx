import React, { useState } from "react";
import { exportReviewAsPDF } from "../services/pdfService";
import { motion } from "framer-motion";
import { FileDown, Loader2 } from "lucide-react";

export default function PDFExportButton({ contentRef }) {
    const [loading, setLoading] = useState(false);

    const handleExport = async () => {
        if (!contentRef.current) return;

        const htmlContent = contentRef.current.outerHTML;

        try {
            setLoading(true);
            await exportReviewAsPDF(htmlContent);
        } catch (err) {
            console.error("❌ PDF export failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.button
            onClick={handleExport}
            whileTap={{ scale: 0.96 }}
            disabled={loading}
            aria-label="Export review as PDF"
            className="group mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
            ) : (
                <FileDown className="w-5 h-5" />
            )}
            {loading ? "Generating PDF..." : "Export as PDF"}
        </motion.button>
    );
}
