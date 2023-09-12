FROM node
WORKDIR /app
RUN git clone https://omit.mv:Rafae46c15@gitlab.com/omit.mv/react-front.git
WORKDIR /app/react-front
RUN npm install
EXPOSE 3000
CMD npm start
#Command for creation of the docker image
#sudo docker build -t image-http .
#Command for creation of the container
#sudo docker run --name http -p 3000:3000 -d image-http
