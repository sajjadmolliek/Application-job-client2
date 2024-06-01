Live Link : https://scholarshipapplicationform.surge.sh


# For client site steps to run on local pc :
1. clone the client site
2. give command : npm i
3. add .env.local file on root.
4. .env.local file content :
          # Image Hosting API KEY
            VITE_IMAGE_KEY=e317cfd7d35deee69f3da919a31304e4
            YOUR_RECAPTCHA_SITE_KEY=6LdsuO0pAAAAAMe4emJX_NkwSYXrRa1P8RFjCUyM
5. add/replace the local host domain on server site in index.js folder in app.use:
        
        app.use(
                cors({
                    origin:["http://localhost:5173","https://scholarshipapplicationform.surge.sh"],
                    credentials: true,
                })
                );
                
6. give comand npm run dev.


# For Server site steps to run on local pc :

1. clone the client site
2. give command : npm i
3. add .env file on root.
4. .env file content :
        userNameBistro=jobtask
        userPassBistro=g5WbJX9X2WSuoH23
        EMAIL_USER=jannatulaxajanifa586@gmail.com
        EMAIL_PASS=wers tuag gfmy xqly

5. replace the local host baseURL on client site in src>Hooks>useAxiosPublic file with your server local host domain:

        const axiosPublic = axios.create({
        baseURL: "https://server-job-chi.vercel.app",
        withCredentials: true,
        });
6. now give command : npm run dev 


