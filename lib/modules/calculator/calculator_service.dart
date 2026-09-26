class CalculatorService {
  //==============
  //============== Atributos
  //==============

  /// Service instance
  static final CalculatorService _instance = CalculatorService._internal();

  //==============
  //============== Constructores
  //==============

  /// Main constructor
  CalculatorService._internal();

  //==============
  //============== Metodos
  //==============

  /// Calculate the rations associated with the data
  ///
  /// [amount] as the amount of grams consumed
  /// [carbsPer100] as the amount of carbohydrates per 100 grams.
  /// Same for [fatsPer100], [proteinsPer100]. [calculateFats] calculates
  /// whether carbohydrates and proteins should be taken into account.
  ///
  /// Returns the calculated rations or null if an error occurred
  double? calculateServings(
    double amount,
    bool calculateFats, {
    double? carbsPer100,
    double? fatsPer100,
    double? proteinsPer100,
  }) {
    try {
      // Make previous validations
      if (carbsPer100 == null) throw Exception("carbsPer100 is null");
      if (calculateFats == true && (fatsPer100 == null || proteinsPer100 == null)) {
        throw Exception("fatsPer100 or proteinsPer100 is null");
      }

      late double servings;

      if (calculateFats == true) {
        servings = double.parse(
          ((((amount / 100) * carbsPer100) / 10) +
                  (((amount / 100) * (fatsPer100! + proteinsPer100!)) / 150))
              .toStringAsFixed(2),
        );
      } else {
        servings = double.parse(((amount / 100) * carbsPer100 / 10).toStringAsFixed(2));
      }

      return servings;
    } catch (_) {
      return null;
    }
  }

  //==============
  //============== Getters
  //==============

  /// Unique instance
  static CalculatorService get instance => _instance;
}
