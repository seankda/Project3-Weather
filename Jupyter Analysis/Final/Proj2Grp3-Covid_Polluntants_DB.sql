CREATE TABLE "dates" (
  "dateid" SERIAL PRIMARY KEY,
  "date" date
);

CREATE TABLE "cities" (
  "cityid" SERIAL PRIMARY KEY,
  "cityname" varchar
);

CREATE TABLE "countries" (
  "countryid" SERIAL PRIMARY KEY,
  "countryabvr" varchar
);

CREATE TABLE "measurements" (
  "dateid" int,
  "cityid" int,
  "countryid" int,
  "pm25" int,
  "pm10" int,
  "o3" int,
  "no2" int,
  "so2" int,
  "co" int
);

ALTER TABLE "measurements" ADD FOREIGN KEY ("cityid") REFERENCES "cities" ("cityid");

ALTER TABLE "measurements" ADD FOREIGN KEY ("dateid") REFERENCES "dates" ("dateid");

ALTER TABLE "measurements" ADD FOREIGN KEY ("countryid") REFERENCES "countries" ("countryid");
