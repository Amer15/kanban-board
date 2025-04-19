import { LogInIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "../../api-services/auth-services";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { useUserStore } from "../../store/user-store";

// Zod schema
const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "password must be at least 8 characters")
    .max(14, "password must not exceed 14 characters"),
});

type FormData = z.infer<typeof formSchema>;

const LoginForm = ({
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (data: FormData) => {
    try {
      setLoading(true);
      const authData = await login(data);
      if (authData) {
        reset();
        const setUser = useUserStore.getState().setUser;
        const updateTokens = useUserStore.getState().updateTokens;
        setUser(authData.user);
        updateTokens({
          access_token: authData.access_token,
          refresh_token: authData.refresh_token,
        });
        navigate("/");
        setLoading(false);
      }
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
      <h2 className="text-xl font-medium font-poppins mb-4">Welcome Back 👋</h2>
      <form className="my-2 flex-col" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-4">
          <input
            {...register("email")}
            type="email"
            placeholder="enter email"
            className="w-full p-2 border border-gray-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            {...register("password")}
            type="password"
            placeholder="enter password"
            className="w-full p-2 border border-gray-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          className="bg-slate-900 text-slate-100 px-5 py-2 rounded-full text-base flex justify-center items-center gap-2 hover:bg-slate-800 transition-colors duration-200 justify-self-stretch min-h-10"
          disabled={loading}
        >
          {!loading && <LogInIcon size={15} />}
          {loading ? <BeatLoader size={8} color="#ffffff" /> : "login"}
        </button>
      </form>
      <div className="flex justify-center items-center gap-1 mt-4">
        <p className="font-poppins text-sm">Don't have an account?</p>
        <button
          className="font-poppins text-sm underline font-medium hover:no-underline"
          onClick={() => tabChangeHandler("register")}
        >
          register
        </button>
      </div>
    </>
  );
};

export default LoginForm;
