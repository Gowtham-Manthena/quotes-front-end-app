import React, { useContext } from 'react';
import AppRoutes from './AppRoutes';
import { MgProvider } from './components/MgContext';
import { useHttpService } from './services/useAxiosCustomHook';

const App: React.FC<{}> = () =>
{
	// const { loading } = useContext<any>(MgProvider);

	const { loading } = useHttpService();
	
	return (
		<React.Fragment>
			{ loading ?
				"loading"
				:
				<AppRoutes />
			}
		</React.Fragment>
	);
}

export default App;
