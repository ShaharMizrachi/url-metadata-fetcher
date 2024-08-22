import React from 'react';

interface Metadata {
    title: string;
    description: string;
    image: string;
}

interface MetadataDisplayProps {
    metadata: (Metadata | null)[];
}

const MetadataDisplay: React.FC<MetadataDisplayProps> = ({ metadata }) => {
    return (
        <div>
            {metadata.map((data, index) => (
                <div key={index} style={{ border: '1px solid #ccc', padding: '16px', margin: '16px 0' }}>
                    {data ? (
                        <>
                            <h3>{data.title}</h3>
                            <p>{data.description}</p>
                            {data.image && <img src={data.image} alt="Preview" style={{ maxWidth: '100%' }} />}
                        </>
                    ) : (
                        <p>No metadata was found for this address.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MetadataDisplay;
