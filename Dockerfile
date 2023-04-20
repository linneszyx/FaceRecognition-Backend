
FROM node:19.9.0
WORKDIR /usr/src/facerecognition
COPY ./ ./
RUN npm install
CMD ["/bin/bash"]