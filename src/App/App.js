import 'react-native-gesture-handler';
import StackNavigator from "../Navigation/StackNavigation.js";
import { registerRootComponent } from 'expo';
import { UserContext } from "../Context/UserContext.js";

export default function App() {

	return (
		<UserContext>
			<StackNavigator />
		</UserContext>
	)
}

registerRootComponent(App);