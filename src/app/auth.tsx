import { useSession } from "@clerk/expo";
import { AuthView } from "@clerk/expo/native";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthScreen() {
  const router = useRouter();
  const { session } = useSession();

  useEffect(() => {
    if (session?.status === "active") {
      router.replace("/");
    }
  }, [router, session?.status]);

  return <AuthView isDismissible={false} />;
}
