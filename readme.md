==========USER STORIES===========
"As a makeup-lover, I want to be able to find cheaper alternatives to my favourite products so I can SAVE MONEY while still looking good"

=========FUNCTIONALITIES=========
- sign up/log in/log out
- searching for a product's dupe by shade name (WHERE dupe is strictly-defined as the more affordable product, i.e. searching for a $10 product will not display a product that costs $100, despite the products being similar to one another. but it will work the other way around) (SHOW DUPE IF SAVINGS >= $0)
- rating dupe's accuracy (if logged in)
- *writing* (if logged in) a review / viewing reviews
- *allow image upload within review*
- submitting a dupe (if logged in)

========PSEUDOCODE========
for SEARCHING FOR A PRODUCT'S DUPE by SHADE NAME:

1. enter shade name into search bar

2. (a) if searched-for pdt exists in database, then check for whether or not it has a dupe.
2. (b) if searched-for pdt does not exist in database, allow user to submit (create) pdt if logged in.

3. (a)(i) if PRODUCT has DUPE, display comparison between the two.
3. (a)(ii) if PRODUCT has no DUPE, allow user to submit one if logged in.