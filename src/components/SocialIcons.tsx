import { FaGoogle, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const SocialIcons = () => {
  const icons: any = [
    { Icon: FaGoogle, label: "Google" },
    { Icon: FaFacebookF, label: "Facebook" },
    { Icon: FaLinkedinIn, label: "LinkedIn" },
    { Icon: FaTwitter, label: "Twitter" },
    { Icon: FaGoogle, label: "Google" },
    { Icon: FaFacebookF, label: "Facebook" },
    { Icon: FaLinkedinIn, label: "LinkedIn" },
    { Icon: FaTwitter, label: "Twitter" },
  ];

  return (
    <div className="flex justify-center gap-6 mt-4">
      {icons?.map((item: any, index: any) => (
        <button
          key={index}
          aria-label={item.label}
          className="w-12 h-12 border-2 border-gray-700 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
        >
          <item.Icon className="text-xl" />
        </button>
      ))}
    </div>
  );
};

export default SocialIcons;
