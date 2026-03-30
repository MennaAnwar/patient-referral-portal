import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "../utils/trpc";
import { useState } from "react";

const referralSchema = z.object({
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
});

type ReferralForm = z.infer<typeof referralSchema>;

export default function ReferralPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const mutation = trpc.referral.submitReferral.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err) => setServerError(err.message),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ReferralForm>({
    resolver: zodResolver(referralSchema),
  });

  const onSubmit = (data: ReferralForm) => {
    setServerError('');
    mutation.mutate(data);
  };

  if (submitted) return <div className="p-10 text-center">Referral submitted successfully! Our team will contact you within 24 hours.</div>;

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-2xl mb-4 font-bold">Patient Referral Form</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <div className="flex-1">
            <input {...register("firstName")} placeholder="First Name" className="border p-2 w-full" />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
          </div>
          <div className="flex-1">
            <input {...register("lastName")} placeholder="Last Name" className="border p-2 w-full" />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <input {...register("dob")} type="date" placeholder="Date of Birth" className="border p-2 w-full" />
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
        </div>
        <input {...register("patientPhone")} placeholder="Phone" className="border p-2 w-full" />
        <input {...register("patientEmail")} type="email" placeholder="Email (optional)" className="border p-2 w-full" />
        <input {...register("lawFirm")} placeholder="Law Firm" className="border p-2 w-full" />
        <input {...register("attorneyName")} placeholder="Attorney / Case Manager Name" className="border p-2 w-full" />
        <input {...register("attorneyEmail")} type="email" placeholder="Attorney Email" className="border p-2 w-full" />
        <input {...register("attorneyPhone")} placeholder="Attorney Phone" className="border p-2 w-full" />
        <textarea {...register("complaint")} placeholder="Primary Complaint / Reason (max 500 chars)" className="border p-2 w-full" maxLength={500} />
        <select {...register("clinicLocation")} className="border p-2 w-full">
          {["Anaheim","Culver City","Downey","El Monte","Long Beach","Los Angeles"].map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
        <div className="flex gap-4">
          {["In-Person", "Telemedicine"].map(type => (
            <label key={type} className="flex items-center gap-2">
              <input type="radio" value={type} {...register("appointmentType")} />
              {type}
            </label>
          ))}
        </div>
        {serverError && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
            {serverError}
          </div>
        )}
        {Object.keys(errors).length > 0 && (
          <div className="p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded mb-4">
            Please fix the errors below.
          </div>
        )}
        <button 
          type="submit" 
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed w-full" 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Submitting...' : 'Submit Referral'}
        </button>
      </form>
    </div>
  );
}