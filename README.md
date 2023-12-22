# FloorPlanPal

https://floorplanpal.varunbalani.com  
This project enables users to visualize the direction of the sun at different times of the day on a floorplan. By leveraging geographical location and time, the application calculates and displays the sun's position relative to the floorplan, allowing users to understand how sunlight interacts with their space throughout the day, and make adjustments to their floorplan accordingly.

## Future Additions

-   [ ] GPT Vision integration to give Floorplan feedback
-   [ ] Allow intermittent minute-wise values in the time slider
-   [ ] Show sunrise/sunset times based on country selected
-   [ ] Allow saving/searching floorplans and organizing by tags etc

## Installation

-   Clone the repo using `git clone https://github.com/varun-balani/FloorPlanPal.git`
-   On Supabase get your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` and add to your `.env` file.
-   Run `npm run dev`

## Tech Stack

-   Next.js with App Router
-   TailwindCSS
-   Supabase for auth
