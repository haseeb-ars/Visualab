import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbDirectory = path.join(process.cwd(), "src/data");
const dbPath = path.join(dbDirectory, "leads.json");

// Simulated Transactional Mailer (e.g., Resend or SendGrid integration)
async function sendNotificationEmail(leadData: any) {
  const adminEmail = process.env.RECEIVER_EMAIL || "info@visualab.uk";
  const { type, answers, service } = leadData;
  const leadAnswers = answers || {};
  
  const clientName = leadAnswers.fullName || `${leadAnswers.firstName || ""} ${leadAnswers.lastName || ""}`.trim() || "Prospect";
  const company = leadAnswers.company || "Company";
  const serviceName = service || leadAnswers.serviceInterest || leadAnswers.service || "General Inquiry";
  
  const subject = `New VisuaLab Lead Inquiry [${serviceName}]: ${clientName} (${company})`;

  let htmlContent = "";
  if (type === "contact_form") {
    htmlContent = `
      <h2>New Contact Form Inquiry</h2>
      <p><strong>Name:</strong> ${leadAnswers.fullName}</p>
      <p><strong>Email:</strong> ${leadAnswers.email}</p>
      <p><strong>Phone:</strong> ${leadAnswers.phone || "Not provided"}</p>
      <p><strong>Company:</strong> ${leadAnswers.company}</p>
      <p><strong>Service Interest:</strong> ${leadAnswers.serviceInterest}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background:#f3f4f6; padding:15px; border-left:4px solid #0066ff;">
        ${leadAnswers.message}
      </blockquote>
    `;
  } else {
    htmlContent = `
      <h2>New Service Lead Funnel Submission</h2>
      <p><strong>Service Requested:</strong> ${serviceName}</p>
      <p><strong>Contact Name:</strong> ${leadAnswers.firstName || ""} ${leadAnswers.lastName || ""}</p>
      <p><strong>Email:</strong> ${leadAnswers.email}</p>
      <p><strong>Phone:</strong> ${leadAnswers.phone || "Not provided"}</p>
      <p><strong>Company:</strong> ${leadAnswers.company}</p>
      <p><strong>Notes:</strong> ${leadAnswers.notes || "None"}</p>
      <br/>
      <div style="background:#090924; color:#fff; padding:20px; border-radius:12px; border:1px solid #1a1a3e;">
        <h3 style="color:#0ea5e9; margin-top:0;">Questionnaire Responses:</h3>
        <p><strong>Project Type / Pain Point:</strong> ${leadAnswers.projectType || leadAnswers.painPoint || "N/A"}</p>
        <p><strong>Scale / Revenue / Team Size:</strong> ${leadAnswers.scaleOrRevenue || leadAnswers.teamSize || "N/A"}</p>
        <p><strong>Platform / Goal / Tools:</strong> ${leadAnswers.platformPreference || leadAnswers.primaryGoal || (leadAnswers.tools ? leadAnswers.tools.join(", ") : "N/A")}</p>
        <p><strong>Key Requirements:</strong> ${leadAnswers.techRequirements ? leadAnswers.techRequirements.join(", ") : "N/A"}</p>
        <p><strong>Timeline:</strong> ${leadAnswers.budgetTimeline || "N/A"}</p>
      </div>
    `;
  }

  // Console logging simulated Resend transaction
  console.log("==========================================================");
  console.log(`[SMTP/RESEND ALERT] Dispatching email to: ${adminEmail}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body outline: ${htmlContent.replace(/<[^>]*>/g, " ").substring(0, 250)}...`);
  console.log("==========================================================");

  // Dispatch email via Resend API
  const senderEmail = process.env.SENDER_EMAIL || "onboarding@resend.dev";
  const apiKey = process.env.RESEND_API_KEY || "";

  if (!apiKey) {
    console.warn("[RESEND WARNING] RESEND_API_KEY environment variable is not defined in process.env.");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderEmail.includes("<") ? senderEmail : `VisuaLab Leads <${senderEmail}>`,
        to: adminEmail,
        subject: subject,
        html: htmlContent,
      }),
    });
    
    const responseData = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("[RESEND ERROR Response]", responseData);
    } else {
      console.log(`[RESEND SUCCESS] Sent notification email to: ${adminEmail}`, responseData);
    }
  } catch (err) {
    console.error("[RESEND FETCH EXCEPTION]", err);
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create a new lead record
    const newLead = {
      id: Math.random().toString(36).substring(2, 9),
      submittedAt: new Date().toISOString(),
      ...body
    };

    // 1. Send notification email via Resend (Primary Action)
    const emailSent = await sendNotificationEmail(newLead);

    // 2. Safely attempt local disk storage (Works on Localhost; caught on Vercel read-only system)
    try {
      if (!fs.existsSync(dbDirectory)) {
        fs.mkdirSync(dbDirectory, { recursive: true });
      }

      let leads = [];
      if (fs.existsSync(dbPath)) {
        try {
          const fileContent = fs.readFileSync(dbPath, "utf8");
          leads = JSON.parse(fileContent);
        } catch (e) {
          console.error("Failed to parse existing leads file", e);
        }
      }
      leads.push(newLead);
      fs.writeFileSync(dbPath, JSON.stringify(leads, null, 2), "utf8");
    } catch (fsErr) {
      console.warn("[STORAGE WARNING] Serverless read-only filesystem, skipping local disk write:", fsErr);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Lead processed successfully",
      leadId: newLead.id,
      emailSent
    });

  } catch (error) {
    console.error("Lead submission API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
