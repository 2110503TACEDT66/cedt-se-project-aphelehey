export default async function userLogin(userEmail: string, userPassword: string) {

    console.log(process.env.BACKEND_URL)
    const response = await fetch(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        })
    })
    if (!response.ok) {
        throw new Error("Failed to log-in")
    }

    return await response.json()
}