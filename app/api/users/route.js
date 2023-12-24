export async function GET(req, res, next) {
    let users = [
        {
        id:1,
        name:"anil",
        email:"anil@gmail.com"
        },
        {
        id:2,
        name:"gupta",
        email:"gupta@gmail.com"
        }
    ];
    let data = JSON.stringify(users);
    return new Response(data, { status: 200 });
}