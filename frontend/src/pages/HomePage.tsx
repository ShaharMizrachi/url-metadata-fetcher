
import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import MetadataDisplay from '../components/MetadataDisplay';
import { fetchMetadata } from '../services/api';

interface Metadata {
    title: string;
    description: string;
    image: string;
}

const HomePage: React.FC = () => {
    const [metadata, setMetadata] = useState<Metadata[]>([]);

    const handleFetchMetadata = async (urls: string[]) => {
        const result = await fetchMetadata(urls);
        setMetadata(result);
    };

    return (
        <div>
            <h1>URL Metadata Fetcher</h1>
            <UrlForm onSubmit={handleFetchMetadata} />
            <MetadataDisplay metadata={metadata} />
        </div>
    );
};

export default HomePage;
