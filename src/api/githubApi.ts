import axios from "axios";

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        // Autorization: 'Bearer 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'
    },
});