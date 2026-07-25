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
  const senderEmail = process.env.SENDER_EMAIL || "seo@visualab.uk";
  const apiKey = process.env.RESEND_API_KEY || "";
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `VisuaLab Leads <${senderEmail}>`,
        to: adminEmail,
        subject: subject,
        html: htmlContent,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[RESEND ERROR]", errorData);
    } else {
      console.log(`[RESEND SUCCESS] Sent notification email to: ${adminEmail}`);
    }
  } catch (err) {
    console.error("[RESEND FETCH EXCEPTION]", err);
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Ensure the src/data directory exists
    if (!fs.existsSync(dbDirectory)) {
      fs.mkdirSync(dbDirectory, { recursive: true });
    }

    // Read existing database leads
    let leads = [];
    if (fs.existsSync(dbPath)) {
      try {
        const fileContent = fs.readFileSync(dbPath, "utf8");
        leads = JSON.parse(fileContent);
      } catch (e) {
        console.error("Failed to parse existing leads file, resetting DB", e);
      }
    }

    // Create a new lead record
    const newLead = {
      id: Math.random().toString(36).substring(2, 9),
      submittedAt: new Date().toISOString(),
      ...body
    };

    leads.push(newLead);

    // Write back to the leads database
    fs.writeFileSync(dbPath, JSON.stringify(leads, null, 2), "utf8");

    // Forward lead notification email to admin owner
    await sendNotificationEmail(newLead);

    return NextResponse.json({ 
      success: true, 
      message: "Lead stored and notification sent",
      leadId: newLead.id 
    });

  } catch (error) {
    console.error("Lead submission API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
