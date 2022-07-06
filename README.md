# MU PROJECT

# Parquick

## Table of Contents
1. [Overview](#Overview)
1. [Product Spec](#Product-Spec)
1. [Wireframes](#Wireframes)
1. [Schema](#Schema)

## Overview
### Description
Parquick is a platform for drivers to find a parking lot, and for parking lot owners to find clients, basically an AirBnB for parking.

### App Evaluation
- **Category:** Rentals
- **Mobile:** This app would be primarily developed for web but would have a responsive design so drivers won't have to open a laptop nor download any app
- **Story:** Let people put their personal garages up for rent, and allows drivers to find parking close to the places they want.
- **Market:** Any car driver and people with enough free space in their garages/houses/lands
- **Habit:** The platform could be used everyday by workers having to move from their homes to their offices or just the weekends by people doing trips to a different city, and owners wouldn't use it so often as they have to register a parking lot just once
- **Scope:** First we would start allowing owners to upload the data of their parking lots and showing them which ones are reserved or available; also drivers would be able to look for parking close to an ubication and then reserve it for one day. Then we can make the searching and filtering more specific taking price and other characteristics in account, enable a chat between a Driver and an Owner after a confirmed rent, and improve the dashboard for the owner. Later we can allow drivers to rent more than one parking and gift one or more to other users and let owners share a percentage of earnings from one space with other owners.

## Product Spec
### 1. User Stories (Required and Optional)

**Required Must-have Stories**
* User (Owner/Driver) registers and logs in
* Driver sets payment method
* Driver searches which parkings are close to them
* Driver searches which parkings are close to a given ubication other than the Driver's own location
* Driver sees price and additional information about a certain parking
* Driver rents a specific parking for one day
* Owner sets bank account to receive earnings
* Owner uploads a new parking and add info as price per day, shade and size
* Owner sees which of their parking are in use or available
* Owner sees a basic dashboard of month earnings

**Optional Nice-to-have Stories**

* Owner chats with Driver after a confirmed rent
* Driver One gifts a rented parking to Driver Two
* Driver One splits the bill of a rent with Drivers Two to N
* Owner One gives a percentage of the earnings from parking lot One to Owner Two
* Owner sees a complete dashboard and filters their parkings by date, area, and other characteristics


### 2. Screen Archetypes

* Login
* Register - User signs up as Driver or Owner (Mutually exclusive for now)
    * Sets payment information
* Main Screen
   * Driver - Displays the nearest parkings (Also option to search for certain location, rent one and see the current rented)
   * Owner - Displays the list of owned parkings (with the option to add more)
* Add parking (Owner)
   * Upload pictures, and add location, quantity of lots, price per day, shade and size.
* Parking Screen (Driver)
   * Shows parking information and give the option to rent it
* Rented Screen (Driver)
    * Show basic info of the parking rented, how much time is left and the option to extend time
* Dashboard (Owner)
    * Display monthly earnings

### 3. Navigation

**Tab Navigation** (Tab to Screen)

- If logged
* Main
* Rented (Driver)
* Add Parking (Owner)
* Dashboard (Owner)
* Log out

- If not logged
* Login
* Register

Optional:
* to be determined

**Flow Navigation** (Screen to Screen)
* REGISTER (succesful) => LOGIN
* LOGIN (failed) => REGISTER, if account doesn't exists
* LOGIN (succesful) => MAIN
* [Owner] _ MAIN (click on 'add parking') => ADD PARKING.
* [Owner] _ ADD PARKING (confirmation or canceling)=> MAIN
* [Driver] _ MAIN (click on 'parking') => PARKING
* [Driver] _ PARKING (click on 'rent') => RENTED
* [Driver] _ PARKING (click on 'cancel') => MAIN
* [Driver] _ RENTED (click on 'extend time') => RENTED (Updates itself)


## Wireframes

![](https://github.com/MetaU-JAEB/MU-Project/blob/main/wireframe.png)

Link for in-progress wireframe

https://excalidraw.com/#json=9z0ObreU6UxS0AEEsZSeQ,w2BZcTYdSXFVeHsQlqjc3A




## Schema
### Models


#### Driver

   | Property       | Type     | Description |
   | -------------  | -------- | ------------|
   | ownerId        | String   | unique id for the owner (default field) |
   | firstName      | String   | first name |
   | lastName       | String   | last name |
   | email          | String   | email|
   | phone          | String   | phone number|
   | address        | String   | Street, city and ZIP code |
   | cardNumber     | String   | Credit card number |
   | cardExp        | String   | Credit card expiration date |
   | cardCCV        | String   | Credit card CCV number |
   | carHeightFts   | Number   | height of their car, in feets |
   | carLengthFts   | Number   | length of their car,  in feets |
   | carWidthFts    | Number   | width of their car, in feets |
   | password       | String   | account password |
   | createdAt      | DateTime | date when Driver is created (default field) |
   | updatedAt      | DateTime | date when Driver is last updated (default field) |

#### Owner

   | Property       | Type     | Description |
   | -------------  | -------- | ------------|
   | driverId       | String   | unique id for the owner (default field) |
   | firstName      | String   | first name |
   | lastName       | String   | last name |
   | email          | String   | email|
   | phone          | String   | phone number|
   | address        | String   | Street, city and ZIP code |
   | routingNumber  | String   | Bank routing number |
   | accountNumber  | String   | Bank account number |
   | password       | String   | account password |
   | createdAt      | DateTime | date when Owner is created (default field) |
   | updatedAt      | DateTime | date when Owner is last updated (default field) |


#### Parking

   | Property       | Type     | Description |
   | -------------  | -------- | ------------|
   | parkingId      | String   | unique id for the parking (default field) |
   | owner          | String   | Owner id |
   | image          | String   | URL of the parking image |
   | lat            | String   | latitude coordinates of location|
   | long           | String   | longitud coordinates of location|
   | address        | String   | Street, city and ZIP code |
   | price          | Number   | Price per day |
   | isUnderShade   | Number   | Indicates if the parking is under shade |
   | isInside       | Number   | Indicates if the parking is inside a building |
   | heightFts      | Number   | height of every lot, in feets |
   | lengthFts      | Number   | length of every lot,  in feets |
   | widthFts       | Number   | width of every lot, in feets |
   | lotsCount      | Number   | The maximum ammount of lots the parking has |
   | lotsAvailable  | Number   | How many lots are still available |
   | isWorking      | Number   | Indicates if the parking is working or under maintainment |
   | createdAt      | DateTime | date when parking is created (default field) |
   | updatedAt      | DateTime | date when parking is last updated (default field) |


#### Rent

   | Property       | Type     | Description |
   | -------------  | -------- | ------------|
   | rentId         | String   | unique id for the rent (default field) |
   | parking        | String   | parking id |
   | driver         | String   | driver id |
   | startsAt       | DateTime | date when parking starts being rented by a driver|
   | endsAt         | DateTime | date when parking stops being rented by a driver|
   | createdAt      | DateTime | date when parking is created (default field) |
   | updatedAt      | DateTime | date when parking is last updated (default field) |

#### Future
    In a further step we can have an exclusive model for Car, CreditCard, BankAccount to let have more than one per user

### Networking
#### List of network requests by screen
   - LOGIN Screen
      - (Read/GET) Get account info
   - REGISTER Screen
      - (Create/POST) Create a new Owner
      - (Create/POST) Create a new Driver
   - MAIN Screen [Owner]
      - (Read/GET) Get Owner's Parkings
      - (Delete) Delete existing parking
      - (Update/PUT) Update avalability of a parking
   - ADD PARKING Screen [Owner]
      - (Create/POST) Create a new Parking related to an Owner
   - DASHBOARD Screen [Owner]
      - (Read/GET) Get the info about monthly earnings
   - MAIN Screen [Driver]
      - (Read/GET) Get Parkings close to a given location
   - PARKING Screen [Driver]
      - (Create/POST) Create a new Rent related to a Driver and a Parking
   - RENTED Screen [Driver]
      - (Update/PUT) Extend the time that the parking is being rented
   - Logout - Navbar
      - (Update/PUT) logout


#### [OPTIONAL:] Existing API Endpoints
##### Google Maps
- Base URL - [http://www.google.com/](http://www.google.com/)

   HTTP Verb | Endpoint | Description
   ----------|----------|------------
    `GET`    | /endpoint | description
