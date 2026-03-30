import { t } from "../trpc";
import { z } from "zod";
import { referrals } from './../../db/schema';
import { db } from './../../db/client';

export const referralRouter = t.router({
  submitReferral: t.procedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        dob: z.string(),
        patientPhone: z.string().min(10),
        patientEmail: z.string().email().optional(),
        lawFirm: z.string().min(1),
        attorneyName: z.string().min(1),
        attorneyEmail: z.string().email(),
        attorneyPhone: z.string().min(10),
        complaint: z.string().max(500),
        clinicLocation: z.enum(["Anaheim", "Culver City", "Downey", "El Monte", "Long Beach", "Los Angeles"]),
        appointmentType: z.enum(["In-Person", "Telemedicine"]),
      })
    )
    .mutation(async ({ input }) => {
      const mappedData = {
        first_name: input.firstName,
        last_name: input.lastName,
        dob: new Date(input.dob),
        patient_phone: input.patientPhone,
        patient_email: input.patientEmail || '',
        law_firm: input.lawFirm,
        attorney_name: input.attorneyName,
        attorney_email: input.attorneyEmail,
        attorney_phone: input.attorneyPhone,
        complaint: input.complaint,
        clinic_location: input.clinicLocation,
        appointment_type: input.appointmentType,
      };

      console.log("Submitting referral:", mappedData); // <-- check values

      try {
        const result = await db.insert(referrals).values(mappedData).returning();
        return {
          referralId: result[0].id,
          message: "Referral submitted successfully!",
          followUp: "Our team will contact the patient within 24 hours",
        };
      } catch (err) {
        console.error("DB Insert Error:", err);
        throw new Error("Failed to submit referral. Please check all fields.");
      }
    }),
});