import axios from "axios"

type postMessage = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

type processedPostMessage = {
    postId: number
    id: number
    name: string
    email: string
    body: string
    userName: string
}

type postHistory = processedPostMessage[];

async function getPostHistory() {
    const getUserNameRegex = new RegExp(/(.+)?@.*/);
    const requestedURL = process.env.CONTENT_URL || '';
    
    if (!requestedURL) {
        throw new Error('URL to be requested not defined');
    }
    const response = await axios.get(requestedURL);

    let postHistory: postHistory = [];
    if (response && response.status === 200) {
        for (let i = 0; i < response.data.length; i++) {
            const content: postMessage = response.data[i];
            postHistory[i] = {
                ...content,
                userName: content.email.replace(getUserNameRegex, '$1')
            }
        }
    }

    return postHistory;
} 

export {
    postMessage, postHistory, processedPostMessage, getPostHistory
}