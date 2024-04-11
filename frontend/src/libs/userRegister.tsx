export default async function userRegister(username: string, tel: string, userEmail: string, userPassword: string) {

    console.log(process.env.BACKEND_URL)
    const response = await fetch(process.env.BACKEND_URL + '/api/v1/auth/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: username,
            tel: tel,
            email: userEmail,
            password: userPassword,
            role: "user"
        })
    })
    if (!response.ok) {
        throw new Error("Failed to register")
    }

    return await response.json()
}