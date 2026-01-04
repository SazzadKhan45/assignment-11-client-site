import { useForm } from "react-hook-form";
import { useState } from "react";
import Lottie from "lottie-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import contactAnimation from "../../assets/ConnectUs.json";

const ContactUs = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axiosSecure.post("/send-message", data);
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" py-14 px-4">
      <title>Contact Us</title>
      <div className="mx-auto max-w-6xl rounded-2xl bg-primary p-8 shadow-lg">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* LEFT LOTTIE */}
          <div className="hidden md:block">
            <Lottie animationData={contactAnimation} loop className="h-96" />
          </div>

          {/* RIGHT FORM */}
          <div>
            {isSubmitSuccessful ? (
              <div className="text-center">
                <Lottie loop={false} className="" />
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
                  ✓
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-gray-800">
                  Message Sent!
                </h3>
                <p className="mt-2 text-gray-600">
                  Thank you for contacting us. We will reply soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>

                {/* Name */}
                <label className="">Your Name</label>
                <input
                  type="text"
                  {...register("userName", { required: "Name is required" })}
                  placeholder="Your Name"
                  className="w-full rounded-lg border px-4 py-2 mt-2"
                />
                {errors.userName && (
                  <p className="text-sm text-red-500">
                    {errors.userName.message}
                  </p>
                )}

                {/* Email */}
                <label className="">Your Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email Address"
                  className="w-full rounded-lg border px-4 py-2 mt-2"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}

                {/* Subject*/}
                <label className="">Subject</label>
                <input
                  type="text"
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                  placeholder="Enter Subject"
                  className="w-full rounded-lg border px-4 py-2 mt-2"
                />
                {errors.subject && (
                  <p className="text-sm text-red-500">
                    {errors.subject.message}
                  </p>
                )}

                {/* Message */}
                <label className="">Your Message</label>
                <textarea
                  rows="4"
                  {...register("message", { required: "Message is required" })}
                  placeholder="Your Message"
                  className="w-full rounded-lg border px-4 py-2 mt-2"
                />
                {errors.message && (
                  <p className="text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-secondary py-3 font-semibold text-white hover:bg-blue-700"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
