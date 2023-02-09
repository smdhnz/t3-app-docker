import { TbHome } from "react-icons/tb";

import type { NavLinkType } from "./components/ui";

export const navLinks: NavLinkType[] = [
  { icon: <TbHome />, label: "Home", href: "/" },
  {
    icon: <TbHome />,
    label: "A",
    items: [
      { icon: <TbHome />, label: "AA", href: "/" },
      { icon: <TbHome />, label: "AB", href: "/" },
    ],
  },
  { icon: <TbHome />, label: "B", href: "/" },
  { icon: <TbHome />, label: "C", href: "/" },
];
