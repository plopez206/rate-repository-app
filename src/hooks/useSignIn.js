import { useMutation } from "@apollo/client";
import { SIGNIN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useNavigate } from "react-router-native";


const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(SIGNIN)
    let navigate = useNavigate();
  
    const signIn = async ({ username, password }) => {
        const {data} = await mutate({
            variables: {
                credentials: { username, password}
            }
        });
        if (data?.authenticate?.accessToken) {
            // Guardar el token en storage
            await authStorage.setAccessToken(data.authenticate.accessToken);
      
            // Navegar al home o a la ruta anterior
            navigate(-1);
          }

        return data;
    };
  
    return [signIn, result];
  };

export default useSignIn;
