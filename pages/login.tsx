import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react";

interface LoginState {
   providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

export default function Login({ providers }: LoginState) {
   return (
      <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
         <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="spotify icon"/>

         {Object.values(providers).map((provider) => (
            <div key={provider.name}>
               <button 
               className="bg-[#18D860] text-white p-5 rounded-full" 
               onClick={() => signIn(provider.id, { callbackUrl: "/" })}
               >
                  Login with {provider.name}
               </button>
            </div>
         ))}
      </div>
   )
}

export async function getServerSideProps() {
   const providers = await getProviders();

   return{
      props: {
         providers,
      },
   };
}