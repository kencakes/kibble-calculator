import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {Field} from "./src/components/Button";
import {useState} from "react";

// Metalbool gewicht = lichaamsgewicht0.75

// Energiebehoefte =
// 1-2 = 550 kJ ME/kg0.75
// 3-7 = 460 kJ ME/kg0.75
// > 7 = 398 kJ ME/kg0.75

// E (kJ/100g) = (14.65 x EW) + (35.56 x Vet) + (14.65 x KH)
// KH = 100 - EW - Vet - RC - RA - Vocht
// Vocht =
// Droogvoer = 10%
// Natvoer = 75%

// Regel van 3

export default function App() {
    const onPressCalculate = () => {
        // Berekend metabool gewicht
        setMetaboolgewicht(Math.pow(lichaamsgewicht, 0.75));

        // Berekend energiebehoefte / dag
        if (leeftijd <= 2) {
            setEnergie(metaboolgewicht * 550);
        } else if (leeftijd >= 3 || leeftijd >= 7) {
            setEnergie(metaboolgewicht * 460);
        } else if (leeftijd >= 9){
            setEnergie(metaboolgewicht * 398);
        }

        // Berekend koolhydraten
        // TODO: Currently set to droogvoer
        setKoolhydraten(100 - eiwit - vet - rc - ra - 10);

        // Berekend kJ / 100g
        setEnergiedichtheid((14.65 * eiwit) + (35.56 * vet) + (14.65 * koolhydraten));

        // Regel van 3
        setCalculatie(100 / energieDichtheid * energie);
    }

   const [lichaamsgewicht, setLichaamsgewicht] = useState(0);
   const [metaboolgewicht, setMetaboolgewicht] = useState(0);
   const [leeftijd, setLeeftijd] = useState(0);
   const [energie, setEnergie] = useState(0);
   const [energieDichtheid, setEnergiedichtheid] = useState(0);
   const [koolhydraten, setKoolhydraten] = useState(0);
   const [eiwit, setEiwit] = useState(0);
   const [vet, setVet] = useState(0);
   const [rc, setRc] = useState(0);
   const [ra, setRa] = useState(0);
   const [calculatie, setCalculatie] = useState(0);

  return (
    <View style={styles.container}>
      <Field placeholder="Lichaamsgewicht" value={lichaamsgewicht} onChangeText={setLichaamsgewicht}/>
      <Field placeholder="leeftijd" value={leeftijd} onChangeText={setLeeftijd}/>
      <Field placeholder="Eiwit" value={eiwit} onChangeText={setEiwit}/>
      <Field placeholder="Vet" value={vet} onChangeText={setVet}/>
      <Field placeholder="Ruwe celstof" value={rc} onChangeText={setRc}/>
      <Field placeholder="Ruwe as" value={ra} onChangeText={setRa}/>
      <StatusBar style="auto"/>

        <Button onPress={onPressCalculate} title="Calculate" color="#841584"/>
        <Text>MB: {metaboolgewicht}</Text>
        <Text>Energiebehoefte: {energie}</Text>
        <Text>KH: {koolhydraten}</Text>
        <Text>Energiedichtheid: {energieDichtheid}</Text>
        <Text>Calculatie: {calculatie}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
