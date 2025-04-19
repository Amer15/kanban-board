import { zodResolver } from "@hookform/resolvers/zod";
import { LogInIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUser } from "../../api-services/auth-services";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

// Zod schema
const formSchema = z
  .object({
    email: z.string().email(),
    full_name: z
      .string()
      .min(6, "full name must be at least 6 characters")
      .max(24, "full name must not exceed 24 characters"),
    password: z
      .string()
      .min(8, "password must be at least 8 characters")
      .max(14, "password must not exceed 14 characters"),
    conform_password: z
      .string()
      .min(8, "password must be at least 8 characters")
      .max(14, "password must not exceed 14 characters"),
  })
  .refine((data) => data.password === data.conform_password, {
    message: "Passwords do not match",
    path: ["conform_password"],
  });

type FormData = z.infer<typeof formSchema>;

const RegisterForm = ({
  tabChangeHandler,
}: {
  tabChangeHandler: (tab: "login" | "register") => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (data: FormData) => {
    try {
      setLoading(true);
      await registerUser(data);
      setLoading(false);
      reset();
      tabChangeHandler("login");
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <>
      <h2 className="text-xl font-medium font-poppins mb-4">Join Kanban</h2>
      <form className="my-2 flex-col" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="enter fullname"
            {...register("full_name")}
            className="w-full p-2 border border-gray-500"
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.full_name.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="enter email"
            {...register("email")}
            className="w-full p-2 border border-gray-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="enter password"
            {...register("password")}
            className="w-full p-2 border border-gray-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="confirm password"
            {...register("conform_password")}
            className="w-full p-2 border border-gray-500"
          />
          {errors.conform_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.conform_password.message}
            </p>
          )}
        </div>
        <button className="bg-slate-900 text-slate-100 px-5 py-2 rounded-full text-base flex justify-center items-center gap-2 hover:bg-slate-800 transition-colors duration-200 justify-self-stretch min-h-10" disabled={loading}>
          {!loading && <LogInIcon size={15} />}
          {loading ? <BeatLoader size={8} color="#ffffff" /> : "register"}
        </button>
      </form>
      <div className="flex justify-center items-center gap-1 mt-4">
        <p className="font-poppins text-sm">Already have an account?</p>
        <button
          className="font-poppins text-sm underline font-medium hover:no-underline"
          onClick={() => tabChangeHandler("login")}
        >
          login
        </button>
      </div>
    </>
  );
};

export default RegisterForm;
