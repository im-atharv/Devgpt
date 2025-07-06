// controllers/pdfController.js
import puppeteer from "puppeteer";
import { getPDFTemplate } from "../utils/pdfTemplate.js";

export const exportPDF = async (req, res) => {
    const { html } = req.body;

    if (!html) {
        return res.status(400).json({ success: false, message: "Missing HTML content." });
    }

    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        const enhancedHTML = getPDFTemplate(html);

        await page.setContent(enhancedHTML, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "40px", bottom: "40px", left: "40px", right: "40px" },
        });

        await browser.close();

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=devgpt-review.pdf",
            "Content-Length": pdfBuffer.length,
        });

        return res.send(pdfBuffer);
    } catch (error) {
        console.error("❌ PDF export failed:", error.message);
        res.status(500).json({ success: false, message: "Failed to generate PDF" });
    }
};
