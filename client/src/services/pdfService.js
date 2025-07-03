// services/pdfService.js
import axios from "axios";
export const exportReviewAsPDF = async (htmlContent) => {
    const response = await axios.post(
        "http://localhost:5000/api/pdf/export", // Replace with your backend host
        { html: htmlContent },
        { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "devgpt-review.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
