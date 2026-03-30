// src/db/schema.ts
import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const referrals = pgTable('referrals', {
  id: serial('id').primaryKey(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  dob: timestamp('dob').defaultNow(),
  patient_phone: text('patient_phone').notNull(),
  patient_email: text('patient_email').notNull(),
  law_firm: text('law_firm').notNull(),
  attorney_name: text('attorney_name').notNull(),
  attorney_email: text('attorney_email').notNull(),
  attorney_phone: text('attorney_phone').notNull(),
  complaint: text('complaint').notNull(),
  clinic_location: text('clinic_location').notNull(),
  appointment_type: text('appointment_type').notNull(),
  status: text('status').default('pending'),
  created_at: timestamp('created_at').defaultNow(),
});