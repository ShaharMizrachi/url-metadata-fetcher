
import { render, screen, fireEvent } from '@testing-library/react';
import UrlForm from '../components/UrlForm';


test('calls onSubmit with 3 valid URLs', () => {
    const mockOnSubmit = jest.fn();
    render(<UrlForm onSubmit={mockOnSubmit} />);

    // Find the input fields
    const inputs = screen.getAllByRole('textbox');

    // Fill in the input fields with 3 URLs
    fireEvent.change(inputs[0], { target: { value: 'https://www.example.com' } });
    fireEvent.change(inputs[1], { target: { value: 'https://www.test.com' } });
    fireEvent.change(inputs[2], { target: { value: 'https://www.ynet.co.il/home/0,7340,L-8,00.html' } });

    // Find and click the submit button
    const submitButton = screen.getByRole('button', { name: /fetch metadata/i });
    fireEvent.click(submitButton);

    // Ensure that onSubmit was called with the correct array of URLs
    expect(mockOnSubmit).toHaveBeenCalledWith([
        'https://www.example.com',
        'https://www.test.com',
        'https://www.ynet.co.il/home/0,7340,L-8,00.html'
    ]);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
});
