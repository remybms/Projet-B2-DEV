export async function GET() {
    var res
    res = await fetch('https://v1.formula-1.api-sports.io/rankings/drivers?season=2024', {
        headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': 'aa98d1e548908eef28c552c773b74b65',
            'x-rapidapi-host': 'v1.formula-1.api-sports.io'
        },
    })

    const teams = await res.json()

    return Response.json({ teams })
}