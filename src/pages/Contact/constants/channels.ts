import SiGithub from "@icons-pack/react-simple-icons/icons/SiGithub";
import { Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/icons/linkedin";

export const channels = [
  {
    Icon: Mail,
    label: "E-mail",
    value: "thiagosmorato@gmail.com",
    href: "mailto:thiagosmorato@gmail.com",
    external: false,
  },
  {
    Icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/thiago-silva-morato",
    href: "https://www.linkedin.com/in/thiago-silva-morato/",
    external: true,
  },
  {
    Icon: SiGithub,
    label: "GitHub",
    value: "github.com/ThiagoSilvaMorato",
    href: "https://github.com/ThiagoSilvaMorato",
    external: true,
  },
] as const;
