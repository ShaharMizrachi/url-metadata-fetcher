
import React, { useState } from 'react';

interface UrlFormProps {
    onSubmit: (urls: string[]) => void;
}

const UrlForm: React.FC<UrlFormProps> = ({ onSubmit }) => {
    const [urls, setUrls] = useState<string[]>(['', '', '']);

    const handleChange = (index: number, value: string) => {
        const newUrls = [...urls];
        newUrls[index] = value;
        setUrls(newUrls);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const filteredUrls = urls.filter(url => url.trim() !== '');
        if (filteredUrls.length === 3) {
            onSubmit(filteredUrls);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {urls.map((url, index) => (
                <input
                    key={index}
                    type="text"
                    value={url}
                    onChange={(e) => handleChange(index, e.target.value)}
                    placeholder={`URL ${index + 1}`}
                    style={{ marginBottom: '8px', marginRight: '2px' }}
                />
            ))}
            <button type="submit">Fetch Metadata</button>
        </form>
    );
};

export default UrlForm;
