import { Button } from "@/components/ui/button";
import { get } from "@github/webauthn-json";
import { useNavigate } from "react-router-dom";

const Mfa = () => {
    const navigate = useNavigate();

    async function mfaLogin() {
        const createOptionsResponse = await fetch("http://localhost:5001/api/passkeys/mfa/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ start: true, finish: false, credential: null }),
        });

        const { loginOptions } = await createOptionsResponse.json();

        // Open "register passkey" dialog
        const options = await get(
            loginOptions as any,
        );

        const response = await fetch("http://localhost:5001/api/passkeys/mfa/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ start: false, finish: true, options }),
        });

        if (response.ok) {
            console.log("user logged in with mfa passkey")
            navigate("/dashboard")
            return;
        }
    }

    return <div className="p-4">
        <Button onClick={mfaLogin}>Login with MFA</Button>
    </div>;
};

export default Mfa;

