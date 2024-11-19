import { useState } from 'react';

function ContactUs({
    linkedinLink = 'https://www.linkedin.com/in/atharva-mane/',
    githubLink = "https://github.com/atharva026"
}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, subject, message } = formData;

        // Construct mailto link
        const mailtoLink = `mailto:atharvam99@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`)}`;

        // Opening the user's email client with the mailto link
        window.location.href = mailtoLink;
    };

    return (
        <div className="md:mt-4 lg:mt-14 grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white dark:bg-gray-800 shadow-lg md:rounded-3xl lg:rounded-lg text-[#333] dark:text-gray-100 font-[sans-serif]">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Let's Talk</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                    Have a big idea or brand to develop and need help? Then reach out, we'd love to hear about your project and provide help.
                </p>
                <div className="mt-12">
                    <h2 className="text-lg font-extrabold text-gray-800 dark:text-gray-200">Email</h2>
                    <ul className="mt-3">
                        <li className="flex items-center">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-gray-200 dark:bg-gray-700">
                                <i className="fa-regular fa-envelope text-gray-600 dark:text-gray-300"></i>
                            </div>
                            <a
                                href="mailto:atharvam99@gmail.com"
                                className="text-blue-600 dark:text-blue-400 text-sm ml-3"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <small className="block">Mail</small>
                                <strong className="font-mono">atharvam99@gmail.com</strong>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="mt-12">
                    <h2 className="text-lg font-extrabold text-gray-800 dark:text-gray-200">Socials</h2>
                    <ul className="flex mt-3 space-x-4">
                        <li className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-gray-200 dark:bg-gray-700 group hover:bg-blue-600 dark:hover:bg-blue-600">
                            <a href={linkedinLink} target='_blank' rel="noopener noreferrer">
                                <i className="fa-brands fa-linkedin-in text-blue-600 dark:text-blue-400 group-hover:text-white"></i>
                            </a>
                        </li>
                        <li className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-gray-200 dark:bg-gray-700 group hover:bg-gray-900 dark:hover:bg-white">
                            <a href={githubLink} target='_blank' rel="noopener noreferrer">
                                <i className="fa-brands fa-github text-gray-900 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full rounded-md py-2.5 px-4 border border-gray-300 dark:border-gray-600 text-sm outline-none focus:outline-[#007bff] dark:focus:outline-blue-400 focus:border-[#007bff] dark:focus:border-blue-400"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full rounded-md py-2.5 px-4 border border-gray-300 dark:border-gray-600 text-sm outline-none focus:outline-[#007bff] dark:focus:outline-blue-400 focus:border-[#007bff] dark:focus:border-blue-400"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="w-full rounded-md py-2.5 px-4 border border-gray-300 dark:border-gray-600 text-sm outline-none focus:outline-[#007bff] dark:focus:outline-blue-400 focus:border-[#007bff] dark:focus:border-blue-400"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    rows="6"
                    className="w-full rounded-md px-4 border border-gray-300 dark:border-gray-600 text-sm pt-2.5 outline-none focus:outline-[#007bff] dark:focus:outline-blue-400 focus:border-[#007bff] dark:focus:border-blue-400"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="text-white bg-blue-800 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 font-semibold rounded-md text-sm px-4 py-2.5 w-full transition duration-300"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ContactUs;