import { query } from "../../../lib/db";

// Read data
export async function GET(request) {
    const users = await query({
        query: "SELECT * FROM users",
        values: [],
    })

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}

// create
export async function POST(request){
    try{
        const {username, email, password_hash } = await request.json();
        const updateUsers = await query({
            query: "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
            values: [username, email, password_hash],
        });
        const result = updateUsers.affectedRows;
        let message = "";
        if(result) {
            message = "success";
        }else{
            message = "error";
        }
        const user = {
            username: username,
            email: email,
            password_hash: password_hash,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: user 
        }));
    }catch (error) {
        return new Resposnse(JSON.stringify({
            status:500,
            data: request 
        }));
    }
}

// udpate

export async function PUT(request) {

    try {
        const { user_id, email } = await request.json();
        const updateProducts = await query({
            query: "UPDATE users SET email = ? WHERE user_id = ?",
            values: [email, user_id],
        });
        const result = updateProducts.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const user = {
            user_id: user_id,
            email: email,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: user
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: res
        }));
    }

}


// // delete 
export async function DELETE(request) {

    try {
        const { user_id } = await request.json();
        const deleteUser = await query({
            query: "DELETE FROM users WHERE user_id = ?",
            values: [user_id],
        });
        const result = deleteUser.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const user = {
            user_id: user_id,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: user
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: res
        }));
    }

}