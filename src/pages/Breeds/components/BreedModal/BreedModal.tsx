import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../../components/Modal';
import Img from '../../../../components/Img';
import List from '../../../../components/List';
import api from '../../../../api';
import { routing } from '../../../../config/routing';
import { Breed } from '../../../../api/breeds/types';
import { Image } from '../../../../api/images/types';

type BreedModalProps = {
    breed: Breed;
    onClose: () => void;
};

const BreedModal = ({ breed, onClose }: BreedModalProps) => {
    const [breedCats, setBreedCats] = useState<Image[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCatsByBreed();
    }, [breed]);

    const fetchCatsByBreed = async () => {
        const { data } = await api.images.batch.get(breed.id);
        setBreedCats(data);
    };

    const openCatModal = (cat: Image) => {
        navigate(routing.cat(cat.id));
    };

    return (
        <Modal isOpen={!!breed} onClose={onClose}>
            <div className="p-8">
                <h3 className="text-center text-white">
                    Cats of Breed: {breed.name}
                </h3>
                <div className="text-center text-white p-4">
                    Breed Description: {breed.description}
                </div>
                <List>
                    {breedCats.map(cat => (
                        <Img
                            key={cat.id}
                            src={cat.url}
                            alt={cat.id}
                            onClick={() => openCatModal(cat)}
                            style={{
                                cursor: 'pointer',
                            }}
                        />
                    ))}
                </List>
            </div>
        </Modal>
    );
};

export default BreedModal;
