import axios from "axios";

export const exportReviewAsPDF = async (htmlContent) => {
    const token = localStorage.getItem("devgpt-token");
    const response = await axios.post(
        "http://localhost:5000/api/pdf/export", // ✅ Update to your production URL if needed
        { html: htmlContent },
        {
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "devgpt-review.pdf");
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};
