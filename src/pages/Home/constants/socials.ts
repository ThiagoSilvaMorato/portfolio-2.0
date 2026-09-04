import SiGithub from "@icons-pack/react-simple-icons/icons/SiGithub";
import { Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/icons/linkedin";

export const socials = [
  { href: "mailto:thiagosmorato@gmail.com", label: "E-mail", Icon: Mail },
  {
    href: "https://github.com/ThiagoSilvaMorato",
    label: "GitHub",
    Icon: SiGithub,
  },
  {
    href: "https://www.linkedin.com/in/thiago-silva-morato/",
    label: "LinkedIn",
    Icon: LinkedinIcon,
  },
] as const;
