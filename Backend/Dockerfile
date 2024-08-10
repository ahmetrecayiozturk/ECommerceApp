FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]



# Node.js tabanlı bir imajdan başlıyoruz
##FROM node:16

# Çalışma dizinini belirliyoruz
##WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalıyoruz
##COPY package*.json ./

# Bağımlılıkları yüklüyoruz
##RUN npm install

# Uygulama kodlarını kopyalıyoruz
##COPY . .

# Uygulamayı başlatıyoruz
##CMD ["node", "index.js"]

# Uygulamanın çalışacağı portu belirliyoruz (örneğin 3000)
##EXPOSE 3000


#
#FROM node:16

#WORKDIR /app

#COPY package*.json ./

#RUN npm install

#COPY . .

#CMD ["node", "index.js"]
#