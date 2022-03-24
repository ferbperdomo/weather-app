# CloudyNight

Here you are allowed to travel around the world asking for the weather of your desired city.
Additionally, you will have the forecast for three days in a row.
You will have access to each city specific details.


Designed by Cristian Perdomo and Miguel Ortega

# Api
The api chose to develop the current app was [Openweathermap](https://openweathermap.org/current)
For next steps, we will include further information and different maps.

## Endpoint table

| HTTP Method 	| URI path      	| Description                                    	| Protected 	|
|-------------	|---------------	|------------------------------------------------	|---------	|
| GET         	| `/`             	| Index page          	| |
| POST         	| `/sign-up` 	| Register users 	| |
| POST         	| `/login` 	| Log in	| |
| GET         	| `/myplaces` 	| Places added to favourites 	| X |
| GET         	| `/eachplace/{{cityName}}` 	| Each place with further information 	| X |

