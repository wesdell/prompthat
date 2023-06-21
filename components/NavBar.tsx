'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { signIn, signOut, getProviders } from 'next-auth/react';

export function NavBar () {
  const [providers, setProviders] = useState<any>({});
  const [toggleMenu, setToggleMenu] = useState(false);
  const user = true;
  
  useEffect(() => {
    getProviders()
      .then((prov) => {
        setProviders(prov);
      });
  }, []);
  

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/images/logo.svg"
          alt="Prompthat logo"
          width={35}
          height={35}
          className="object-contain"
        />
        <p className="logo_text"> Prompthat</p>
      </Link>
      <div className="sm:flex hidden">
        {
          user
            ? (
              <div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt" className="black_btn">
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="outline_btn"
                >
                  Sign Out
                </button>
                <Link href="/profile">
                  <Image
                    src="/images/logo.svg"
                    alt="Profile"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                </Link>
              </div>
            )
            : (
              <>
                {
                  providers && Object.values(providers).map((prov: any) => (
                    <button
                      key={prov.name}
                      type="button"
                      onClick={() => signIn(prov.id)}
                      className="black_btn"
                    >
                      Sign In
                    </button>
                  ))
                }
              </>
            )
        }
      </div>
      <div className="sm:hidden flex relative">
        {
          user
            ? (
              <div className="flex">
                <Image
                  src="/images/logo.svg"
                  alt="Profile"
                  width={35}
                  height={35}
                  className="rounded-full"
                  onClick={() => setToggleMenu((prevMenu) => !prevMenu)}
                />
                {
                  toggleMenu && (
                    <div className="dropdown">
                      <Link
                        href="/profile"
                        className="dropdown_link"
                        onClick={() => setToggleMenu(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/create-prompt"
                        className="dropdown_link"
                        onClick={() => setToggleMenu(false)}
                      >
                        Create Prompt
                      </Link>
                      <button
                        type="button"
                        className="mt-5 w-full black_btn"
                        onClick={() => {
                          setToggleMenu(false);
                          signOut();
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  )
                }
              </div>
            )
            : (
              <>
                {
                  providers && Object.values(providers).map((prov: any) => (
                    <button
                      key={prov.name}
                      type="button"
                      onClick={() => signIn(prov.id)}
                      className="black_btn"
                    >
                      Sign In
                    </button>
                  ))
                }
              </>
            )
        }
      </div>
    </nav>
  );
}
