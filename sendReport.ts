import nodemailer from "nodemailer";

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "playwrightreportkeka@gmail.com", // Your email
        pass: "Keka@123", // Your email password (App password recommended)
    },
});

// Email options
const mailOptions = {
    from: "playwrightreportkeka@gmail.com",
    to: ["santhi.b@keka.com", "aarthi.m@keka.com"], // Multiple recipients
    subject: "Playwright Test Report",
    text: "Attached is the Playwright test execution report.",
    attachments: [
        {
            filename: "index.html",
            path: "./playwright-report/index.html", // Attach Playwright report
        },
    ],
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("❌ Error sending email:", error.message);
    } else {
        console.log("✅ Email sent successfully!");
        console.log("Message ID:", info.messageId);
        console.log("Accepted Recipients:", info.accepted);
        console.log("Rejected Recipients:", info.rejected.length ? info.rejected : "None");
    }
});
