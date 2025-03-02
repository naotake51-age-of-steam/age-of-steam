import { User } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FC, createContext, useEffect, useState } from "react";
import { auth } from "@/app/lib/firebase";

type AuthContextProps = {
  currentUser: User | null | undefined;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();

  const router = useRouter();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user === null) {
        router.push("/sign-in");
      }

      setCurrentUser(user);
    });
  }, [router]);

  // TODO:: JavaScriptから読めるのでセキュリティ的に強くないが、Auth.jsと連携するのは大変なので一旦見送り。
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (user) {
        Cookies.set("token", await user.getIdToken(), {
          secure: true,
          sameSite: "strict",
          expires: 1,
        });
      } else {
        Cookies.remove("token");
      }
    });
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
