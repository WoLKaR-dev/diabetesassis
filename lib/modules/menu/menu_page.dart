import 'package:diabetesassis/core/theme.dart';
import 'package:diabetesassis/modules/calculator/calculator_service.dart';
import 'package:diabetesassis/modules/item/item_class.dart';
import 'package:diabetesassis/modules/menu/menu_styles.dart';
import 'package:flutter/material.dart';
import 'package:wolkarutils/wolkarutils.dart';

class MenuPage extends StatefulWidget {
  const MenuPage({super.key});
  @override
  State<MenuPage> createState() => _MenuPageState();
}

class _MenuPageState extends State<MenuPage> {
  //STATE Menu
  /// Menu items
  List<Item> menu = [];

  //STATE Fats value
  /// Defines if fats & proteins should be calculated
  bool calculateFatsAndProteins = false;

  //FORM Main controllers
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _amountController = TextEditingController();
  final TextEditingController _carbsController = TextEditingController();
  final TextEditingController _fatsController = TextEditingController();
  final TextEditingController _proteinsController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    //ATOMS Header section
    /// Main menu maker header
    final header = [
      Text("Menú").h1(),
      Text(
        "Añade los ingredientes que vas a consumir para calcular el total de raciones del menú.",
      ).p(),
      Divider().percentage(50),
    ];

    //ATOMS Name section
    /// Defines the module of each item
    final nameModule = [
      Text("Nombre del ingrediente").p(),
      Input(controller: _nameController, centered: true, dialog: true),
    ];

    //ATOMS Carbs switch
    /// Defines whether carb calculation is active or not
    final fatsSwitch = [
      Text("Calcular grasas y proteínas").p(),
      Switch(
        value: calculateFatsAndProteins,
        onChanged: (newValue) {
          setState(() {
            calculateFatsAndProteins = newValue;
          });
        },
      ),
    ];

    //ATOMS Base Module
    /// Basic menu module
    final baseModule = [
      Text("Cantidad del ingrediente en gramos").p(),
      Input(controller: _amountController, centered: true, dialog: true),
      Text(
        "Introduce la cantidad de carbohidratos por cada 100 gramos de alimento (en gramos): ",
      ).p(),
      Input(controller: _carbsController, centered: true, dialog: true),
    ];

    //ATOMS Fats Module
    /// Extra fats module
    final fatsModule = [
      Text("Introduce la cantidad de grasas por cada 100 gramos de alimento (en gramos): ").p(),
      Input(controller: _fatsController, centered: true, dialog: true),
      Text("Introduce la cantidad de proteínas por cada 100 gramos de alimento (en gramos): ").p(),
      Input(controller: _proteinsController, centered: true, dialog: true),
    ];

    //ATOMS Add Ingredient Button
    /// Adds a new ingredient when pressed
    final addIngredientButton = [
      ElevatedButton.icon(
        style: ElevatedButton.styleFrom(
          backgroundColor: colorPallete.secondary,
          foregroundColor: colorPallete.onSecondary,
        ),
        onPressed: () {
          final double? servings = CalculatorService.instance.calculateServings(
            double.tryParse(_amountController.text) ?? 0.0,
            calculateFatsAndProteins,
            carbsPer100: double.tryParse(_carbsController.text),
            fatsPer100: double.tryParse(_fatsController.text),
            proteinsPer100: double.tryParse(_proteinsController.text),
          );

          if (servings == null) return;
          setState(() {
            menu.add(
              /// Define the new item
              Item(_nameController.text, servings, double.tryParse(_amountController.text) ?? 0.0),
            );
            _nameController.clear();
            _amountController.clear();
            _carbsController.clear();
            _fatsController.clear();
            _proteinsController.clear();
          });
        },
        label: Text("Add Ingredient"),
        icon: Icon(Icons.add),
      ),
      Divider().percentage(30),
    ];

    //ATOMS Menu list module
    /// Shows the user the temporary created menu
    final menuListModule = [
      Text("Tu Menú").h3(),
      Legible(
        child: Column(
          spacing: 10,
          children: [
            ...List.generate(menu.length, (index) {
              final item = menu[index];
              return ItemCard(
                item: item,
                onDelete: () {
                  setState(() {
                    menu.remove(item);
                  });
                },
                editable: true,
              );
            }),
          ],
        ),
      ),
      Text(
        "Suma total de raciones: ${menu.fold(0.0, (currentValue, item) => currentValue + item.servings)}",
      ).p(),
    ];

    //LAYOUT Main page layout
    /// Main page layout
    final page = Background(
      padding: EdgeInsets.all(15),
      child: Scroll(
        spacing: 15,
        children: [
          ...header,
          ...nameModule,
          ...fatsSwitch,
          ...baseModule,
          if (calculateFatsAndProteins) ...fatsModule,
          ...addIngredientButton,
          ...menuListModule,
        ],
      ),
    );

    //WRAPPER Main structure
    return Scaffold(body: page);
  }
}
