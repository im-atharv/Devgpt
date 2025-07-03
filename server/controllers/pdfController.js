// controllers/pdfController.js
import puppeteer from "puppeteer";

export const exportPDF = async (req, res) => {
    const { html } = req.body;

    if (!html) {
        return res.status(400).json({ success: false, message: "Missing HTML content." });
    }

    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: "networkidle0",
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
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
