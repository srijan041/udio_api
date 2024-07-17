import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver'
import path from 'path'
import axios from 'axios';
import chrome from 'selenium-webdriver/chrome.js';

const automateUpload = async () => {
    // let driver = await new Builder().forBrowser('chrome').build()
    // const userProfile = path.resolve(process.env.HOME, '.config', 'google-chrome');

    try {
        const options = new chrome.Options();
        options.addArguments(`user-data-dir=/home/kono/.config/google-chrome/Default`);
        // options.addArguments('--profile-directory=Default');
        const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()

        let current_user = {}
        await driver.manage().window().maximize();
        await driver.get('https://www.udio.com/');

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        while (!current_user) {
            const response = await axios.get('https://www.udio.com/api/users/current')
            console.log(response.user);
            if (response.user) {
                current_user = response.user
            }
            sleep(5000).then(() => {
                console.log('waiting for user to log in');
            })

        }

        console.log(current_user);
    } catch (error) {
        console.log(error);
    }
}

export default automateUpload