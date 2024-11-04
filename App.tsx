import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, ScrollView, Keyboard } from "react-native";
import { Input } from "./src/components/Input";
import { Button } from "./src/components/Button";
import COLORS from "./src/styles/Colors";
import { useState } from "react";
import CalculationModal from "./src/components/CalculationModal";

export default function App() {
  const [inputs, setInputs] = useState({
    weight: 0,
    age: 0,
    protein: 0,
    fat: 0,
    crudeFiber: 0,
    crudeAsh: 0,
  });

  const [errors, setErrors] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [calculation, setCalculation] = useState(0);

  const validate = () => {
    // Hides keyboard
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.weight) {
      handleError("Weight can't be empty", "weight");
      valid = false;
    } else if (isNaN(inputs.weight)) {
      handleError("Can only contain numbers", "weight");
      valid = false;
    }

    if (!inputs.age) {
      handleError("Age can't be empty", "age");
      valid = false;
    } else if (isNaN(inputs.age)) {
      handleError("Can only contain numbers", "age");
      valid = false;
    }

    if (!inputs.protein) {
      handleError("Protein can't be empty", "protein");
      valid = false;
    } else if (isNaN(inputs.protein)) {
      handleError("Can only contain numbers", "protein");
      valid = false;
    }

    if (!inputs.fat) {
      handleError("Fat can't be empty", "fat");
      valid = false;
    } else if (isNaN(inputs.fat)) {
      handleError("Can only contain numbers", "fat");
      valid = false;
    }

    if (!inputs.crudeFiber) {
      handleError("Crude fiber can't be empty", "crudeFiber");
      valid = false;
    } else if (isNaN(inputs.crudeFiber)) {
      handleError("Can only contain numbers", "crudeFiber");
      valid = false;
    }

    if (!inputs.crudeAsh) {
      handleError("Crude ash can't be empty", "crudeAsh");
      valid = false;
    } else if (isNaN(inputs.crudeAsh)) {
      handleError("Can only contain numbers", "crudeAsh");
      valid = false;
    }

    if (valid) {
      handleCalculation();
      setIsModalVisible(true);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleClose = () => setIsModalVisible(false);

  const handleCalculation = () => {
    const metabolicWeight = Math.pow(inputs.weight, 0.75);

    // Calculates energy / day
    let energyValue;
    if (inputs.age <= 2) {
      energyValue = metabolicWeight * 550;
    } else if (inputs.age >= 3 && inputs.age < 7) {
      energyValue = metabolicWeight * 460;
    } else {
      energyValue = metabolicWeight * 398; // Correcting the last else if condition
    }

    // Calculates carbohydrates
    const carbohydratesValue =
      100 -
      inputs.protein -
      inputs.fat -
      inputs.crudeFiber -
      inputs.crudeAsh -
      10;

    // Calculates kJ / 100g
    const energyDensityValue =
      14.65 * inputs.protein + 35.56 * inputs.fat + 14.65 * carbohydratesValue;

    // Rule of 3
    const calculationValue = Math.ceil(
      (100 / energyDensityValue) * energyValue,
    );

    setCalculation(calculationValue);

    // Logging values for debugging
    console.log("Metabolic Weight:", metabolicWeight);
    console.log("Energy Value:", energyValue);
    console.log("Carbohydrates Value:", carbohydratesValue);
    console.log("Energy Density Value:", energyDensityValue);
    console.log("Final Calculation:", calculationValue);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <CalculationModal
        visible={isModalVisible}
        number={calculation}
        onClose={handleClose}
      />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Kibble calculator
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter your details to calculate
        </Text>
        <Input
          error={errors.weight}
          onChangeText={(text) => handleOnchange(text, "weight")}
          onFocus={() => handleError(null, "weight")}
          label="Weight"
          keyboardType="numeric"
        />
        <Input
          error={errors.age}
          onChangeText={(text) => handleOnchange(text, "age")}
          label="Age"
          onFocus={() => handleError(null, "age")}
          keyboardType="numeric"
        />
        <Input
          error={errors.protein}
          onChangeText={(text) => handleOnchange(text, "protein")}
          onFocus={() => handleError(null, "protein")}
          label="Protein"
          keyboardType="numeric"
        />
        <Input
          error={errors.fat}
          onChangeText={(text) => handleOnchange(text, "fat")}
          onFocus={() => handleError(null, "fat")}
          label="Fat"
          keyboardType="numeric"
        />
        <Input
          error={errors.crudeFiber}
          onChangeText={(text) => handleOnchange(text, "crudeFiber")}
          onFocus={() => handleError(null, "crudeFiber")}
          label="Crude fiber"
          keyboardType="numeric"
        />
        <Input
          error={errors.crudeAsh}
          onChangeText={(text) => handleOnchange(text, "crudeAsh")}
          onFocus={() => handleError(null, "crudeAsh")}
          label="Crude ash"
          keyboardType="numeric"
        />
        <StatusBar style="auto" />
        <Button onPress={validate} title="Calculate" />
      </ScrollView>
    </SafeAreaView>
  );
}
