"use client";

import { useEffect } from "react";

import toast from "react-hot-toast";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import { z } from "zod";

import api from "@/lib/api";

import { MemberSchema } from "@/validations/member";

type MemberForm = z.infer<
  typeof MemberSchema
>;

interface Props {
  open: boolean;

  onClose: () => void;

  member?: any;

  reload: () => void;
}

export default function MemberModal({
  open,
  onClose,
  member,
  reload,
}: Props) {
  const {
    register,

    handleSubmit,

    reset,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<MemberForm>({
    resolver: zodResolver(
      MemberSchema
    ),
  });

  useEffect(() => {
    if (member) {
      reset({
        full_name:
          member.full_name,

        gender:
          member.gender,

        student_number:
          member.student_number,

        email:
          member.email,

        phone:
          member.phone,
      });
    } else {
      reset({
        full_name: "",

        gender: "",

        student_number:
          "",

        email: "",

        phone: "",
      });
    }
  }, [member, reset]);

  async function onSubmit(
    data: MemberForm
  ) {
    try {
      if (member) {
        await api.put(
          `/participant/member/${member.member_id}`,
          data
        );

        toast.success(
          "Member updated."
        );
      } else {
        await api.post(
          "/participant/member",
          data
        );

        toast.success(
          "Member added."
        );
      }

      reload();

      onClose();

    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ??
          "Failed."
      );
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">

      <div className="w-full max-w-xl rounded-3xl border border-cyan-500/20 bg-slate-900 p-8">

        <h2 className="mb-8 text-2xl font-bold text-white">
          {member
            ? "Edit Member"
            : "Add Member"}
        </h2>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Full Name
            </label>

            <input
              {...register(
                "full_name"
              )}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white"
            />

            <p className="mt-1 text-sm text-red-400">
              {
                errors.full_name
                  ?.message
              }
            </p>

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Gender
            </label>

            <select
              {...register(
                "gender"
              )}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white"
            >
              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Student Number
            </label>

            <input
              {...register(
                "student_number"
              )}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              {...register(
                "email"
              )}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white"
            />

            <p className="mt-1 text-sm text-red-400">
              {
                errors.email
                  ?.message
              }
            </p>

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Phone
            </label>

            <input
              {...register(
                "phone"
              )}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white"
            />

          </div>

          <div className="flex justify-end gap-3 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-6 py-3 text-white"
            >
              Cancel
            </button>

            <button
              disabled={
                isSubmitting
              }
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white"
            >
              {isSubmitting
                ? "Saving..."
                : member
                ? "Update"
                : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}