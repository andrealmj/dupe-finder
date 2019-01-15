CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    brand TEXT,
    shade_name TEXT,
    type TEXT,
    price INTEGER,
    review_link TEXT,
    product_image_link TEXT,
    product_swatch_link TEXT
);

CREATE TABLE IF NOT EXISTS dupes (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    dupe_id INTEGER,
    similarity INTEGER
);