"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { authContext } from "@/contexts/auth-context";
import { logout } from "@/utils/log-out";
import { createClient } from "@/utils/supabase/browser-client";
import { User as UserSupabase } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrickWall,
  ChevronDown,
  Cuboid,
  LayoutDashboard,
  Menu,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function Navbar({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSupabase | null>(null);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        router.replace("/login");
      }

      authContext.setState({
        user: { ...data.user! },
      });
      setUser({ ...data.user! });
    }

    getUser();
  }, []);

  return (
    <>
      <div className="xl:hidden">
        <NavbarMobile user={user} />
      </div>
      <div className="hidden xl:block">
        <NavbarDesktop user={user} />
      </div>
      <div className="bg-slate-800 min-h-screen">
        <main className="primaryContainer text-white">{children}</main>
      </div>
    </>
  );
}

function NavbarLinks() {
  return (
    <>
      <NavbarItem
        icon={<LayoutDashboard size={14} />}
        title="Painel"
        link="/dashboard"
      />
      <NavbarItem
        icon={<Cuboid size={14} />}
        title="Habilidades"
        link="/skills"
      />
      <NavbarItem
        icon={<BrickWall size={14} />}
        title="Experiências"
        link="/experiences"
      />
      {/* <NavbarDropdownItem
        icon={<HeartPulse size={14} />}
        title="Testando"
        subItems={[
          {
            title: "Teste",
            link: "/teste",
          },
        ]}
      /> */}
    </>
  );
}

function ProfileButton({ user }: { user: UserSupabase | null }) {
  return (
    <DropdownMenu>
      {user && (
        <DropdownMenuTrigger>
          <NavbarItem icon={<User size={14} />} title={user.email!} />
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent
        side="right"
        className="p-2 bg-slate-200 rounded-t-none text-black hidden md:block"
      >
        <Link href="/profile">
          <DropdownMenuItem>Perfil</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavbarDesktop({ user }: { user: UserSupabase | null }) {
  return (
    <nav className="fixed z-50 flex h-screen w-56 flex-col justify-between bg-slate-200 py-5 border-r">
      <div>
        <div className="leading-none text-center mb-4">
          <p className="text-xl">BreedResume</p>
        </div>
        <NavbarLinks />
      </div>
      <ProfileButton user={user} />
    </nav>
  );
}

export function NavbarMobile({ user }: { user: UserSupabase | null }) {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <header className="bg-slate-200 fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 z-50 border-b shrink-0">
      <div className="flex flex-row items-center">
        <div className="leading-none">
          <p className="text-xl font-semibold">BR</p>
        </div>
      </div>
      {opened ? (
        <X onClick={() => setOpened(false)} className="stroke-black" />
      ) : (
        <Menu onClick={() => setOpened(true)} className="stroke-black" />
      )}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`bg-slate-200 fixed py-4 px-6 flex flex-col items-start gap-4 left-0 top-14 rounded-b-lg z-50 w-full ${
              opened ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <NavbarLinks />
            <Separator />
            <NavbarItem title="Sair" onClick={logout} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface NavbarItemProps {
  icon?: ReactNode;
  title: string;
  link?: string;
  onClick?: () => void;
}

function NavbarItem(props: NavbarItemProps) {
  const [actualPage, setActualPage] = useState<string>("");

  useEffect(() => {
    let origin = window.location.pathname.split("/");
    setActualPage(`/${origin[1]}${origin[2] ? `/${origin[2]}` : ""}`);
  }, []);

  return (
    <>
      {props.link && (
        <Link
          href={props.link}
          className={`flex w-full items-center px-3 py-2 text-black duration-300 hover:bg-mainBlue/30 ${
            actualPage === props.link || actualPage === props.link
              ? "bg-mainBlue/30 hover:bg-mainBlue/30"
              : ""
          }`}
        >
          {props.icon}
          <p className={`text-sm text-black ${props.icon ? "ml-2" : ""}`}>
            {props.title}
          </p>
        </Link>
      )}
      {!props.link && (
        <div
          className="flex w-full cursor-pointer items-center px-3 py-2 text-black duration-300 hover:bg-mainBlue/30"
          onClick={props.onClick}
        >
          {props.icon}
          <p className={`text-sm text-black ${props.icon ? "ml-2" : ""}`}>
            {props.title}
          </p>
        </div>
      )}
    </>
  );
}

interface NavbarDropdownItemProps {
  icon: ReactNode;
  title: string;
  subItems: {
    title: string;
    link?: string;
    onClick?: () => void;
  }[];
}

function NavbarDropdownItem(props: NavbarDropdownItemProps) {
  const [opened, setOpened] = useState<boolean>(false);
  const [actualPage, setActualPage] = useState<string>("");

  useEffect(() => {
    let origin = window.location.pathname.split("/");
    setActualPage(`/${origin[1]}${origin[2] ? `/${origin[2]}` : ""}`);
  }, []);

  useEffect(() => {
    let origin = window.location.pathname.split("/");

    let formattedPath = `/${origin[1]}/${origin[2]}`;

    function hasFormattedPath(subItem: {
      title: string;
      link?: string;
      icon?: ReactNode;
      onClick?: () => void;
    }) {
      if (subItem.link) {
        let splittedLink = subItem.link?.split("/");
        const formattedLink = `/${splittedLink![1]}/${splittedLink![2]}`;
        return formattedLink === formattedPath;
      }
    }

    if (props.subItems.find(hasFormattedPath)) {
      setOpened(true);
    }
  }, [props.subItems]);

  const menuAnimation = {
    hidden: {
      opacity: 0,
      height: 0,
      padding: 0,
      transition: { duration: 0.3, when: "afterChildren" },
    },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
      },
    },
  };
  const menuItemAnimation = {
    hidden: (i: number) => ({
      padding: 0,
      x: "-1000%",
      transition: {
        duration: (i + 1) * 0.1,
      },
    }),
    show: (i: number) => ({
      x: 0,
      transition: {
        duration: (i + 1) * 0.1,
      },
    }),
  };

  return (
    <>
      <button
        onClick={() => setOpened(!opened)}
        className="flex w-full flex-row items-center justify-between gap-2 px-3 py-2 text-black duration-300 hover:bg-mainBlue/30"
      >
        <div className="flex items-center gap-2">
          {props.icon}
          <p className="text-sm">{props.title}</p>
        </div>
        <motion.div
          animate={{
            rotate: opened ? 0 : -90,
          }}
          initial={{
            rotate: -90,
          }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {opened && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex w-full flex-col"
          >
            {props.subItems.map((subItem, i) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i}>
                {subItem.link && (
                  <Link
                    href={subItem.link}
                    className={`flex w-full items-center px-8 py-2 text-black duration-300 hover:bg-mainBlue/30 ${
                      actualPage === subItem.link || actualPage === subItem.link
                        ? "bg-mainBlue/30 hover:bg-mainBlue/30"
                        : ""
                    }`}
                  >
                    <p className="text-sm text-black">{subItem.title}</p>
                  </Link>
                )}
                {!subItem.link && (
                  <div
                    className="flex w-full px-4 py-2 text-black duration-300 hover:bg-mainBlue/30"
                    onClick={subItem.onClick}
                  >
                    {subItem.title}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
