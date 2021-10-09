import axios from "axios";

export default {
    handleUploadToS3: async (file, putUrl) => {
        try {
            const urlResponse = await axios.get(putUrl, {
                params: {
                    Key: file.name,
                    ContentType: file.type
                }
            })
            await axios.put(urlResponse.data.putUrl, file, { headers: { 'Content-Type': file.type } })
        } catch (err) {

        }

    }
}