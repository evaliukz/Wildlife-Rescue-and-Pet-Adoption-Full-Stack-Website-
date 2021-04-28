var config = require("./db-config.js");
var mysql = require("mysql");

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/*
  Query 1: getOrganizationContact
  Display 10 organizations in 1 state with valid e-mail address. Below example for NY
    select distinct org.name, ani.email
    from organization_schema.orgs_data org
    join pets.animalData ani
    on org.id = ani.organization_id
    where ani.state1 = "NY" AND ani.email like '%@%'
    limit 10
*/

function getOrgContacts(req, res) {
  var state = req.params.state;

  var query = `
  select distinct org.name, ani.email
  from organization_schema.orgs_data org
  join pets.animalData ani
  on org.id = ani.organization_id
  where ani.state1 = '${state}' AND ani.email like '%@%'
  limit 10
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* Query 2: */
function getFunfact2(req, res) {
  var state = req.params.state;

  var query = `
  WITH CAT AS 
(SELECT ani.color AS color, Count(*) AS count_cat
FROM pets.animalData AS ani
WHERE color <> "none" AND ani.animal_type = "Cat"
GROUP BY ani.color
ORDER BY ani.animal_type, count_cat desc
),

DOG AS(
SELECT ani.color AS color, Count(*) AS count_dog
FROM pets.animalData AS ani
WHERE color <> "none" AND ani.animal_type = "Dog"
GROUP BY ani.color
ORDER BY ani.animal_type, count_dog desc

),

HORSE AS (
SELECT ani.color AS color, Count(*) AS count_horse
FROM pets.animalData AS ani
WHERE color <> "none" AND ani.animal_type = "Horse"
GROUP BY ani.color
ORDER BY ani.animal_type, count_horse desc

),

RABBIT AS (
SELECT ani.color AS color, Count(*) AS count_rabbit
FROM pets.animalData AS ani
WHERE color <> "none" AND ani.animal_type = "Rabbit"
GROUP BY ani.color
ORDER BY ani.animal_type, count_rabbit desc
),

ALLCOLOR AS (
SELECT ani.color AS color, Count(*) AS count_all
FROM pets.animalData AS ani
WHERE color <> "none"
GROUP BY ani.color
ORDER BY count_all DESC
LIMIT 15
)

SELECT ALLCOLOR.color, IFNULL(CAT.count_cat,0) AS cat, IFNULL(DOG.count_dog,0) AS dog, IFNULL(RABBIT.count_rabbit,0) AS rabbit, IFNULL(HORSE.count_horse,0) AS horse
FROM ALLCOLOR
LEFT OUTER JOIN CAT ON CAT.color = ALLCOLOR.color
LEFT OUTER JOIN HORSE ON HORSE.color = ALLCOLOR.color
LEFT OUTER JOIN DOG ON DOG.color = ALLCOLOR.color
LEFT OUTER JOIN RABBIT ON RABBIT.color = ALLCOLOR.color
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/*
  Query 3: getStatesWithFamiliesLoveLargeDogs
  Family ratio: Based on IRS's number of family returns over total number of returns
  Size Matrix: Calculate average pet size score where small = 1, medium = 2, large = 3 and x-large = 4
  Multiply family ratio and size matrix and sort in a descending order
  States that are displayed on the list are the state that have most families that love large dogs

select inc.state, inc.familyWeight as Family_Weight, score.score as Size_Score,
inc.familyWeight * score.score as indexScore
from
	(select inc.statee as state, sum(inc.n_joint_returns) / sum(inc.n_total_returns) as familyWeight
	from pets.incomeData inc
	group by inc.statee) inc
join 
	(select small.state1 as state, 
		(small.small / (small.small + med.med + large.large + xlarge.xlarge) * 1 + 
		med.med / (small.small + med.med + large.large + xlarge.xlarge) * 2 + 
		large.large / (small.small + med.med + large.large + xlarge.xlarge) * 3 + 
		xlarge.xlarge / (small.small + med.med + large.large + xlarge.xlarge) * 4) as score
	from
		(select ani.state1, count(PetSize) as small
		from pets.animalData ani
		where petsize = 'small'
		group by ani.state1) small
	join
		(select ani.state1, count(PetSize) as med
		from pets.animalData ani
		where petsize = 'medium'
		group by ani.state1) med
	join
		(select ani.state1, count(PetSize) as large
		from pets.animalData ani
		where petsize = 'large'
		group by ani.state1) large
	join
		(select ani.state1, count(PetSize) as xlarge
		from pets.animalData ani
		where petsize = 'extra large'
		group by ani.state1) xlarge
	on small.state1 = med.state1 
	AND small.state1 = large.state1 
	AND small.state1 = xlarge.state1) score
where inc.state = score.state
order by indexScore desc

*/

function getFunfact3(req, res) {
  var query = `
  select inc.state, inc.familyWeight as Family_Weight, score.score as Size_Score,
  inc.familyWeight * score.score as indexScore
  from
    (select inc.statee as state, sum(inc.n_joint_returns) / sum(inc.n_total_returns) as familyWeight
    from pets.incomeData inc
    group by inc.statee) inc
  join 
    (select small.state1 as state, 
      (small.small / (small.small + med.med + large.large + xlarge.xlarge) * 1 + 
      med.med / (small.small + med.med + large.large + xlarge.xlarge) * 2 + 
      large.large / (small.small + med.med + large.large + xlarge.xlarge) * 3 + 
      xlarge.xlarge / (small.small + med.med + large.large + xlarge.xlarge) * 4) as score
    from
      (select ani.state1, count(PetSize) as small
      from pets.animalData ani
      where petsize = 'small'
      group by ani.state1) small
    join
      (select ani.state1, count(PetSize) as med
      from pets.animalData ani
      where petsize = 'medium'
      group by ani.state1) med
    join
      (select ani.state1, count(PetSize) as large
      from pets.animalData ani
      where petsize = 'large'
      group by ani.state1) large
    join
      (select ani.state1, count(PetSize) as xlarge
      from pets.animalData ani
      where petsize = 'extra large'
      group by ani.state1) xlarge
    on small.state1 = med.state1 
    AND small.state1 = large.state1 
    AND small.state1 = xlarge.state1) score
  where inc.state = score.state
  order by inc.state
  `;
  connection.query(query, function (err, rows, fieldds) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/*
  Query 4: getAnimalNames
  Simply return top 10 names of each pet by state and city

  Step 1: Choose a type from dog, cat and rabbit and a state from 50 states
  Step 2: Send the selection to the database and return top 10 cities
  Step 3: Choose a city from the 10 cities list
  Step 4: Return top 10 names given the input
*/

function getFunfact4(req, res) {
  var query = `
  WITH dognames AS(
    SELECT ani.petname AS name1, ani.animal_type, count(*) AS count
    FROM pets.animalData ani
    WHERE ani.animal_type = "Dog"
    GROUP BY name1
    ORDER BY count DESC
    LIMIT 60
    ),
    catnames AS 
    (SELECT ani.petname AS name2, ani.animal_type, count(*) AS count2
    FROM pets.animalData ani
    WHERE ani.animal_type = "Cat"
    GROUP BY name2
    ORDER BY count2 DESC
    LIMIT 60
    )
    
    SELECT dognames.name1,dognames.count AS count_dog,catnames.count2 AS count_cat
FROM dognames
INNER JOIN catnames ON dognames.name1 = catnames.name2
ORDER BY dognames.name1
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/*
  Query 5: getAnimalsByState
  Return number of pets available in each state.
  This query can be broken down to 3 queries.
*/

function getFunfact5(req, res) {
  var type = req.params.type;

  var query = `
  select state1, animal_type, count(*) as count
  from pets.animalData ani
  Group by ani.state1, ani.animal_type
  order by animal_type, count desc
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/*
  Query 6: Income / Zip / Animal
  We can compute the number of animals over population to get number of adpotions required per 100,000, etc.
  This query is designed to have no variable for testing purposes. Will add variables to make it dynamic.
*/

function getFunfact6(req, res) {
  var query = `
    select ani.state1, SUM(inc.income)/1000 as income, SUM(inc.population)/1000 as population, count(*) as animal
    from pets.animalData ani
    join (select zip, inc.AGI as income, inc.n_individual as population
      from pets.incomeData inc
      join pets.zipcodeMapping zip
      on inc.zipcode = zip.zip) inc 
    on inc.zip = ani.zipcode
    group by ani.state1
    order by ani.state1
    `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

module.exports = {
  getOrgContacts: getOrgContacts,
  getFunfact2: getFunfact2,
  getFunfact3: getFunfact3,
  getFunfact4: getFunfact4,
  getFunfact5: getFunfact5,
  getFunfact6: getFunfact6,
};
