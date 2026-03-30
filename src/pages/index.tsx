import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "../utils/trpc";
import { useState } from "react";

import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";

const referralSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.string(),
  patientPhone: z.string().min(10),
  patientEmail: z.string().email().optional(),
  lawFirm: z.string().min(1),
  attorneyName: z.string().min(1),
  attorneyEmail: z.string().email(),
  attorneyPhone: z.string().min(10),
  complaint: z.string().max(500),
  clinicLocation: z.enum([
    "Anaheim",
    "Culver City",
    "Downey",
    "El Monte",
    "Long Beach",
    "Los Angeles"
  ]),
  appointmentType: z.enum(["In-Person", "Telemedicine"]),
});

type ReferralForm = z.infer<typeof referralSchema>;

export default function ReferralPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const mutation = trpc.referral.submitReferral.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err) => setServerError(err.message),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReferralForm>({
    resolver: zodResolver(referralSchema),
  });

  const onSubmit = (data: ReferralForm) => {
    setServerError("");
    mutation.mutate(data);
  };

  if (submitted)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white shadow-xl rounded-xl p-10 text-center max-w-md">
          <h2 className="text-2xl font-semibold text-green-600 mb-3">
            Referral Submitted
          </h2>
          <p className="text-gray-600">
            Our team will contact you within 24 hours.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Patient Referral Form
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

          {/* Patient Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <UserIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400"/>
              <input
                {...register("firstName")}
                placeholder="First Name"
                className="border rounded-lg pl-10 p-2 w-full focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="relative">
              <UserIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400"/>
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className="border rounded-lg pl-10 p-2 w-full focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {/* DOB */}
          <div className="relative">
            <CalendarIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400"/>
            <input
              {...register("dob")}
              type="date"
              className="border rounded-lg pl-10 p-2 w-full focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <PhoneIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400"/>
            <input
              {...register("patientPhone")}
              placeholder="Patient Phone"
              className="border rounded-lg pl-10 p-2 w-full focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400"/>
            <input
              {...register("patientEmail")}
              placeholder="Patient Email (optional)"
              className="border rounded-lg pl-10 p-2 w-full focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Law Firm */}
          <div className="relative">
            <BuildingOfficeIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400"/>
            <input
              {...register("lawFirm")}
              placeholder="Law Firm"
              className="border rounded-lg pl-10 p-2 w-full focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Attorney Name */}
          <div className="relative">
            <UserIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400"/>
            <input
              {...register("attorneyName")}
              placeholder="Attorney / Case Manager Name"
              className="border rounded-lg pl-10 p-2 w-full focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Attorney Email */}
          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400"/>
            <input
              {...register("attorneyEmail")}
              placeholder="Attorney Email"
              className="border rounded-lg pl-10 p-2 w-full focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Attorney Phone */}
          <div className="relative">
            <PhoneIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400"/>
            <input
              {...register("attorneyPhone")}
              placeholder="Attorney Phone"
              className="border rounded-lg pl-10 p-2 w-full focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Complaint */}
          <div className="relative">
            <ChatBubbleLeftRightIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400"/>
            <textarea
              {...register("complaint")}
              placeholder="Primary Complaint"
              maxLength={500}
              className="border rounded-lg pl-10 p-2 w-full focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Location */}
          <div className="relative">
            <MapPinIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400"/>
            <select
              {...register("clinicLocation")}
              className="border rounded-lg pl-10 p-2 w-full focus:ring focus:ring-blue-200"
            >
              {["Anaheim","Culver City","Downey","El Monte","Long Beach","Los Angeles"].map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Appointment Type */}
          <div className="flex gap-6">
            {["In-Person", "Telemedicine"].map(type => (
              <label key={type} className="flex items-center gap-2">
                <input type="radio" value={type} {...register("appointmentType")} />
                {type}
              </label>
            ))}
          </div>

          {/* Errors */}
          {serverError && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {serverError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg font-semibold"
          >
            {mutation.isPending ? "Submitting..." : "Submit Referral"}
          </button>

        </form>
      </div>
    </div>
  );
}