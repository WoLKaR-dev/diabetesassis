# Diabetesassis

Diabetesassis is an open-source project developed to help diabetics managing their glucose. Allows the user to calculate fast servings to eat, as well as build different servings menus.

> Note: Diabetesassis is no longer being regularly updated. Alternatively, you can use `Diazen`, the updated version of `Diabetesassis` with more features and capabilities.

## How diabetesassis works

Diabetesassis is organized in different folders, each with a specific feature.

- `core`: Main features, such as navigation and app theme.
- `modules`: Contains each of the secundary features.
- `main.dart`: App initialization file.

If we zoom into `modules` we will find these features:

- `calculator`: Contains the `calculator_service` which makes calculations and the calculator page.
- `data`: Contains main app data as well as its page.
- `home`: This is simply the homepage.
- `item`: Represents each one of the items in a menu. Contains basic classes.
- `menu`: Main menu designing page and styles.

### Alerts

⚠️ `diabetesassis` is no longer being mantained with the same frequency. In order to get regulary updates, you can install for free [Diazen for Android](https://play.google.com/store/apps/details?id=com.wolkardev.diabetesassis&pli=1), a new app with much more features, such as `records`, persistence, `ingredients` and much more.
