select * from cities;
select * from dates;
select * from measurements;


SELECT d.date,c.cityname,me.median_co,me.median_no2,me.median_o3,me.median_pm25,me.median_so2,me.median_pm10
FROM measurements AS me
JOIN dates AS d
on d.dateid=me.dateid
join cities AS c
on me.citiyid=c.citiyid;