import { motion } from 'motion/react';


import Back from '../Components/Back'

const Info = () => {
    return (
        <motion.div id="info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .5 }}
        >
            <Back />
            <header>
                <h1>Countries Explorer</h1>
                <p>Countries Explorer is a lightweight <a href="react.dev" target='_blank'>React.js</a> web application that fetches data from the <a href="https://restcountries.com/" target='_blank'>REST Countries API</a> to display comprehensive information about countries around the world.<br />In addition to browsing country data, it offers fun interactive games that help users test their knowledge of world geography.</p>
            </header>
            <section id='features'>
                <h2>Features:</h2>
                <ul>
                    <li>Search and filter countries by name, region or area</li>
                    <li>View both independent and dependent countries</li>
                    <li>Name All Countries and Flag Guesser games</li>
                    <li>Responsive design for mobile and desktop</li>
                </ul>
            </section>
            <section id='builtWith'>
                <h2>Built with:</h2>
                <ul>
                    <li><a href="https://react.dev" target="_blank">React.js</a></li>
                    <li><a href="https://reactrouter.com/" target="_blank">React Router</a></li>
                    <li><a href="https://sass-lang.com/" target="_blank">Sass</a></li>
                    <li><a href="https://axios-http.com/" target="_blank">Axios for Fetching</a></li>
                    <li><a href="https://motion.dev/" target="_blank">Framer Motion</a></li>
                    <li><a href="https://restcountries.com/" target="_blank">REST Countries API</a></li>
                    <li><a href="https://fontawesome.com/v4/icons/" target="_blank">Font Awesome 4</a></li>
                    <li><a href="https://fonts.google.com/" target="_blank">Google Fonts</a></li>

                </ul>
            </section>
            <section id='socials'>
                <h2>Check my socials</h2>
                <ul>
                    <li><a href="https://www.linkedin.com/in/umberto-scirgalea-8533b633b/" target='_blank'><i className='fa fa-linkedin'></i></a></li>
                    <li><a href="https://github.com/Umby-Scirgalea" target="_blank"><i className='fa fa-github'></i></a></li>

                </ul>

            </section>

        </motion.div>
    )
}

export default Info;