import 'package:diabetesassis/core/theme.dart';
import 'package:diabetesassis/modules/calculator/calculator_service.dart';
import 'package:flutter/material.dart';
import 'package:wolkarutils/wolkarutils.dart';

/// Main calculator page. Lets the user calculate its servings. 
class CalculatorPage extends StatefulWidget {
  const CalculatorPage({super.key});
  @override
  State<CalculatorPage> createState() => _CalculatorPageState();
}

class _CalculatorPageState extends State<CalculatorPage> {
  //STATE Fats & proteins switch
  /// Determines if the calculator should calculate fats and proteins too.
  bool calculateFatsAndProteins = false;

  //FORM Text inputs for calculator
  /// Controllers for the food inputs.
  final TextEditingController _amount = TextEditingController();
  final TextEditingController _carbs = TextEditingController();
  final TextEditingController _proteins = TextEditingController();
  final TextEditingController _fats = TextEditingController();

  @override
  Widget build(BuildContext context) {
    //ATOMS Calculator header
    /// Main header of the calculation, with base instructions.
    final header = [
      Text("Calculadora de raciones").h1(),
      Text(
        "Introduce los valores nutricionales del alimento para calcular las raciones correspondientes.",
      ).p(),
      Divider().percentage(50),
    ];

    //ATOMS Basic calculator
    /// Base part of the calculator, always required.
    final baseModule = [
      Text("Introduce la cantidad de alimento que vas a comer en gramos: ").p(),
      Input(controller: _amount, centered: true, dialog: true),
      Text(
        "Introduce la cantidad de carbohidratos por cada 100 gramos de alimento (en gramos): ",
      ).p(),
      Input(controller: _carbs, centered: true, dialog: true),
    ];

    //ATOMS Fats and proteins switch
    /// Switch that allow the user to change [calculateFatsAndProteins]
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

    //ATOMS Second, optinal calculator module
    /// Modular part of the calculator, required for proteins and fats.
    final fatsModule = [
      Text("Introduce la cantidad de grasas por cada 100 gramos de alimento (en gramos): ").p(),
      Input(controller: _fats, centered: true, dialog: true),
      Text("Introduce la cantidad de proteínas por cada 100 gramos de alimento (en gramos): ").p(),
      Input(controller: _proteins, centered: true, dialog: true),
    ];

    //ATOMS Calculation section
    /// Allows the user to press this button to calculate.
    final calculateButton = [
      ElevatedButton.icon(
        style: ElevatedButton.styleFrom(
          backgroundColor: colorPallete.secondary,
          foregroundColor: colorPallete.onSecondary,
        ),
        onPressed: () {
          final result = CalculatorService.instance.calculateServings(
            double.tryParse(_amount.text) ?? 0.0,calculateFatsAndProteins,
            carbsPer100: double.tryParse(_carbs.text) ,
            fatsPer100: double.tryParse(_fats.text) ,
            proteinsPer100: double.tryParse(_proteins.text) ,
            
          );

          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: Text("Raciones calculadas: $result"),
              content: Scroll(
                children: [
                  Text(
                    "Estos datos no reemplazan el consejo médico profesional. Usar con precaución. ",
                  ).p(),
                ],
              ),
              actions: [
                ElevatedButton.icon(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  label: Text("Cerrar"),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: colorPallete.secondary,
                    foregroundColor: colorPallete.onSecondary,
                  ),
                  icon: Icon(Icons.close),
                ),
              ],
            ).constrained(context),
          );
        },
        label: Text("Calcular"),
        icon: Icon(Icons.calculate_rounded),
      ),
    ];

    //LAYOUT Main page structure
    final page = Background(
      padding: EdgeInsets.all(15),
      child: Legible(
        child: Scroll(
          spacing: 15,
          children: [
            ...header,
            ...fatsSwitch,
            ...baseModule,
            if (calculateFatsAndProteins) ...fatsModule,
            ...calculateButton,
          ],
        ),
      ),
    );

    return Scaffold(body: page);
  }
}
