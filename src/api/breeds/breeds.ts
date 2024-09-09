import axios from 'axios';
import { MODEL_BASE } from './consts';
import { Breed } from './types';

const breedsList = async () => await axios.get<Breed[]>(`${MODEL_BASE}`);

const breeds = {
    batch: {
        get: breedsList,
    },
};

export default breeds;
