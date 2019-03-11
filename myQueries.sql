--to show dupe and its details based on search by product shade name
SELECT a.*,
products.brand AS dupe_brand,
products.shade_name AS dupe_shade_name,
products.type AS dupe_type,
products.price AS dupe_price
FROM
    (SELECT
    products.product_id AS product_id,
    products.brand AS product_brand,
    products.shade_name AS product_shade_name,
    products.type AS product_type,
    products.price AS product_price,
    dupes.dupe_id
    FROM dupes FULL OUTER JOIN products
    ON products.product_id = dupes.product_id
    WHERE products.shade_name LIKE '%Ruby%') a
    INNER JOIN products
ON products.product_id = a.dupe_id;






--try to insert multi-line values into a table in just 1 line:
INSERT INTO products (brand, shade_name, type, price)
VALUES (a, b, c, 4),
       (d, e, f, 40);





--check if submitted values are preexisting in db: if yes, delete submitted data [[TO CHECK FOR DUPLICATES - but then i realised i don't have to actually]]
SELECT product_id, shade_name FROM products WHERE LOWER
    ( (shade_name LIKE $1 AND brand LIKE $2) AND
    (shade_name LIKE $3 AND brand LIKE $4) )
    OR (shade_name LIKE $5 AND brand LIKE $6)
    OR (shade_name LIKE $7 AND brand LIKE $8)

let values = ['%' + request.body.submittedDupeShadeName.toLowerCase() + '%',
              '%' + request.body.submittedDupeBrand.toLowerCase() + '%',
              '%' + request.body.submittedPdtShadeName.toLowerCase() + '%',
              '%' + request.body.submittedPdtBrand.toLowerCase() + '%',
              '%' + request.body.submittedPdtShadeName.toLowerCase() + '%',
              '%' + request.body.submittedPdtBrand.toLowerCase() + '%',
              '%' + request.body.submittedDupeShadeName.toLowerCase() + '%',
              '%' + request.body.submittedDupeBrand.toLowerCase() + '%'
];


SELECT product_id, shade_name FROM products WHERE
    ( (shade_name LIKE '%Ruby%' AND brand LIKE '%Anastasia%') AND
    (shade_name LIKE '%Season 10%' AND brand LIKE '%Colourpop%') )
    OR (shade_name LIKE '%Ruby%' AND brand LIKE '%Anastasia%')
    OR (shade_name LIKE '%Season 10%' AND brand LIKE '%Colourpop%');



--inserting the pdt/dupe rs into the dupes table
INSERT INTO dupes (product_id, dupe_id)
SELECT product_id, product_id
FROM products
WHERE (product_id=58, product_id=57);
--condition must be of type BOOLEAN, not RECORD






--to show all pdt/dupe relationships and their details
SELECT a.*,
products.brand AS dupe_brand,
products.shade_name AS dupe_shade_name,
products.type AS dupe_type,
products.price AS dupe_price
FROM
    (SELECT
    products.product_id AS product_id,
    products.brand AS product_brand,
    products.shade_name AS product_shade_name,
    products.type AS product_type,
    products.price AS product_price,
    dupes.dupe_id,
    dupes.rs_id
    FROM dupes FULL OUTER JOIN products
    ON products.product_id = dupes.product_id) a
    INNER JOIN products
ON products.product_id = a.dupe_id;


--inserting links into products (UPDATING)
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;


UPDATE products
SET product_swatch_link = 'https://www.temptalia.com/wp-content/uploads/2017/03/tom-ford-beauty_terra_007_swatch-500x500.jpg'
WHERE product_id = 19;