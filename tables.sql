CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    password TEXT
);

CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    brand TEXT,
    shade_name TEXT,
    type TEXT,
    price INTEGER,
    review_link TEXT,
    product_image_link TEXT,
    product_swatch_link TEXT
);

CREATE TABLE IF NOT EXISTS dupes (
    product_id INTEGER,
    dupe_id INTEGER,
    similarity INTEGER,
    PRIMARY KEY (product_id, dupe_id)
);