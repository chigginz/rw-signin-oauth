# Using rimraf

Npm sometimes makes excessively deep "node_modules" directory that cannot be deleted in windows.  

To delete these directories:

- **npm install -g rimraf**  - to install rimraf globally

- **rimraf node_modules** - to delete the node_modules directory

# Running NavigatorUserSignin - Development
This project can either be run in development using '**npm start**', or deployed into Nginx to simulate the deployment approach used in Sandbox / Production.
If That will run the development server on port 3000, but it will not be deployed in the same manner as that done on sandbox nor production.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



## Served on NPM
Use the command line **npm start**

### Configuration
#### NavigatorUserSignin
To run in this manner in development, the "**.env.development**" environment file will be used.  The root URL of the application is localhost on port 3000.  The API gateway is served on Port 9000 and integration-api-gateway (Auth server) is on port 8550. 

Configure that environment file with:

REACT_APP_DEPLOYMENT_HOST=http://localhost:3000
GATEWAY_HOST_URL=http://localhost:9000
OAUTH_SERVER_URL=http://localhost:8550

#### API-Gateway
Here we are doing direct calls to the **api-gateway**, and all of the contexts (such as graphql and images) is on that server.  
The application-dev.properties file needs to have the caching.apigateway.url property changed to the full URL of the api-gateway

**caching.apigateway.url=http://localhost:9000/signin**


## Served on Nginx
To deploy NavigatorUserSignin in the same manner as what is done on Sandbox / Production, Nginx should be used instead.
Assuming Nginx is run on port 80, we need to make a few local configuration changes as well as a few configuration changes on the api-gateway microservice.

### Configuration

#### NavigatorUserSignin Configuration
To run in this manner in development, the "**.env.development**" environment file will be used.
The root URL of the application is localhost on port 80, or **http://localhost**.  While the API gateway is served on at http://localhost:9000 and integration-api-gateway (Auth server) is at http://localhost:8550, the calls must go through Nginx.

Configure that environment file with:

REACT_APP_DEPLOYMENT_HOST=http://localhost
GATEWAY_HOST_URL=${REACT_APP_DEPLOYMENT_HOST}
OAUTH_SERVER_URL=${REACT_APP_DEPLOYMENT_HOST}


#### Nginx Configuration
We want to map a few of contexts within Nginx
- NavigatorUserSignin
- Images on NavigatorUserSignin

        location /signin {
            root   D:\\development\\cambian\\navigator\\build;
            index  index.html;
        }

        location /signin/navimages/ {
            proxy_pass http://localhost:9000/navimages/;
            ## proxy_redirect off;

            #IE specific tweak for fonts not to be ignored:
            proxy_hide_header Cache-Control;
            proxy_hide_header Pragma;
            #END IE specific tweak for fonts not to be ignored
        }		



#### API-Gateway

Since we want to avoid mixed context errors as well as CORS issues, we want to go through the Nginx host and have all of the contexts mapped there.
In this case we only need a relative URL to point to the mapping in Nginx

**caching.apigateway.url=navigator**





# Deploy in Sandbox / Production
To deploy NavigatorUserSignin in the same manner as what is done on Sandbox / Production, Nginx should be used instead.
Assuming Nginx is run on port 80, we need to make a few local configuration changes as well as a few configuration changes on the api-gateway microservice.

### Building NavigatorUserSignin
Running the command line '**npm run build**' will build the application and will put the minified output in the /build subdirectory of the NavigatorUserSignin project.
When that build is run it will using the '**.env.production**' environment file

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
### Configuration

#### NavigatorUserSignin Configuration
To run in this manner in development, the "**.env.production**" environment file will be used.
The root URL of the application is localhost on port 80, or **http://localhost**.  While the API gateway is served on at http://localhost:9000 and integration-api-gateway (Auth server) is at http://localhost:8550, the calls must go through Nginx.

For Sandbox, configure that environment file with:

REACT_APP_DEPLOYMENT_HOST=https://sandbox.specialistservices.ca
GATEWAY_HOST_URL=${REACT_APP_DEPLOYMENT_HOST}
OAUTH_SERVER_URL=${REACT_APP_DEPLOYMENT_HOST}


#### Nginx Configuration
We want to map a number of contexts within Nginx
- NavigatorUserSignin
- Images on NavigatorUserSignin
- graphql
- fhir
- consent
- public

        location /graphql {
            proxy_pass http://localhost:9000/graphql;
            ## proxy_redirect off;

            #IE specific tweak for fonts not to be ignored:
            proxy_hide_header Cache-Control;
            proxy_hide_header Pragma;
            #END IE specific tweak for fonts not to be ignored
        }		
        
        location /consent/ {
            proxy_pass http://localhost:9000/consent/;
            ## proxy_redirect off;

            #IE specific tweak for fonts not to be ignored:
            proxy_hide_header Cache-Control;
            proxy_hide_header Pragma;
            #END IE specific tweak for fonts not to be ignored
        }		
        
        location /fhir/ {
            proxy_pass http://localhost:9000/fhir/;
            ## proxy_redirect off;

            #IE specific tweak for fonts not to be ignored:
            proxy_hide_header Cache-Control;
            proxy_hide_header Pragma;
            #END IE specific tweak for fonts not to be ignored
        }		
            
        location /public/ {
            proxy_pass http://localhost:9000/public/;
            ## proxy_redirect off;

            #IE specific tweak for fonts not to be ignored:
            proxy_hide_header Cache-Control;
            proxy_hide_header Pragma;
            #END IE specific tweak for fonts not to be ignored
        }		

        # navigator: works with routing app with the context of /signin
        #          React build is put into /var/www/html/signin
        #          "homepage": "https://sandbox.specialistservices.ca/signin",
        #  NOTE: The NavigatorUserSignin build files must be put in a subdirectory of the root
        #        directory and should be called 'signin'
        #
        location /signin {
            root   /var/www/html;
            index  index.html;
        }
        
        location /signin/navimages/ {
            proxy_pass http://localhost:9000/images/;
            ## proxy_redirect off;

            #IE specific tweak for fonts not to be ignored:
            proxy_hide_header Cache-Control;
            proxy_hide_header Pragma;
            #END IE specific tweak for fonts not to be ignored
        }		



# CAT Questionnaires
Detail on CAT Questionnaire:
http://build.fhir.org/ig/HL7/sdc/adaptive.html

##