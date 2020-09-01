
    DROP TABLE IF EXISTs location;

CREATE TABLE location (
    search_query VARCHAR(255),
    formatted_query VARCHAR(255),
    latitude VARCHAR(255),
    longitude VARCHAR(255)
);

INSERT INTO location VALUES ('amman','quran1','21','66');
INSERT INTO location VALUES ('cyprus','quran2','21','66');
INSERT INTO location VALUES ('italy','quran3','21','66');
INSERT INTO location VALUES ('seattle','quran4','21','66');

 
 