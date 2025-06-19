
import '@mantine/core/styles.css';
import MainCalander from "./components/MainCalander";
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';


function App() {
  return (
   <MantineProvider>
    <ModalsProvider>
      <MainCalander />
      </ModalsProvider>
   </MantineProvider>
  );
}

export default App;
