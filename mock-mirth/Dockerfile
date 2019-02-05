FROM java:8

ENV MIRTH_CONNECT_VERSION=3.6.0.b2287
ARG MDIR=/opt/mirth-connect

# Download & Unpack Mirth
WORKDIR $MDIR/tmp
RUN \ 
wget http://downloads.mirthcorp.com/connect/$MIRTH_CONNECT_VERSION/mirthconnect-$MIRTH_CONNECT_VERSION-unix.tar.gz && \ 
tar xvzf mirthconnect-$MIRTH_CONNECT_VERSION-unix.tar.gz && \ 
mv Mirth\ Connect/* ${MDIR}/

# Clean up
WORKDIR $MDIR
RUN rm -R tmp/

# Persistent dabatase store on host
VOLUME $MDIR/appdata


# Mirth Config
COPY conf/mirth.properties ./conf/mirth.properties

# defined in mirth.properties
EXPOSE 8080 8443

CMD ["java", "-jar", "mirth-server-launcher.jar"]