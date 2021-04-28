import PropTypes from 'prop-types';

import orderStyle from './order.module.css';

const OrderDetails = ({data}) => {
    const {orderNumber, title, status, details} = data;

    return (
        <div className={orderStyle.wrapper}>
            <p className={`text text_type_digits-large mb-4 ${orderStyle.number}`}>{orderNumber}</p>
            <p className={`text text_type_main-medium ${orderStyle.title}`}>{title}</p>
            <div className={orderStyle.image}>
                <div className={orderStyle.vektorSecond}>
                    <svg width="107" height="100" viewBox="0 0 107 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M103.944 38.453C108.019 45.5983 108.019 54.4017 103.944 61.547L88.5996 88.453C84.5247 95.5983 76.994 100 68.8442 100H38.1558C30.006 100 22.4753 95.5983 18.4004 88.453L3.05617 61.547C-1.01872 54.4017 -1.01872 45.5983 3.05617 38.453L18.4004 11.547C22.4753 4.40169 30.006 0 38.1558 0L68.8442 0C76.994 0 84.5247 4.40169 88.5996 11.547L103.944 38.453Z" fill="url(#paint0_radial)" fillOpacity="0.25"/>
                        <defs>
                            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(53.5 50) rotate(-43.0632) scale(73.2274 55.0025)">
                                <stop stopColor="#801AB3" stopOpacity="0"/>
                                <stop offset="1" stopColor="#4C4CFF"/>
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
                <div className={orderStyle.vektorThird}>
                    <svg width="98" height="102" viewBox="0 0 98 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.36637 37.3873C-1.45546 45.5044 -1.45545 56.4957 4.36637 64.6127L24.3336 92.4518C30.1554 100.569 40.4748 103.965 49.8947 100.865L82.2023 90.2313C91.6223 87.1309 98 78.2387 98 68.2055V33.7945C98 23.7612 91.6222 14.8691 82.2023 11.7687L49.8947 1.13508C40.4748 -1.96536 30.1554 1.43114 24.3336 9.54819L4.36637 37.3873Z" fill="url(#paint0_radial)" fillOpacity="0.25"/>
                        <defs>
                            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(49 51) rotate(-46.1458) scale(70.7248 53.2019)">
                                <stop stopColor="#801AB3" stopOpacity="0"/>
                                <stop offset="1" stopColor="#4C4CFF"/>
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
                <div className={orderStyle.vektorFirst}>
                    <svg width="68" height="66" viewBox="0 0 68 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24.9249 2.91091C30.3362 -0.970307 37.6638 -0.970302 43.0751 2.91092L61.6345 16.2224C67.0459 20.1036 69.3102 26.9832 67.2433 33.2632L60.1542 54.8016C58.0873 61.0815 52.1592 65.3333 45.4703 65.3333H22.5296C15.8408 65.3333 9.91274 61.0815 7.84578 54.8016L0.756717 33.2632C-1.31024 26.9832 0.954096 20.1036 6.36546 16.2224L24.9249 2.91091Z" fill="url(#paint0_radial)" fillOpacity="0.25"/>
                        <defs>
                            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(34 32.6667) rotate(136.146) scale(47.1499 35.4679)">
                                <stop stopColor="#801AB3" stopOpacity="0"/>
                                <stop offset="1" stopColor="#4C4CFF" stopOpacity="0.5"/>
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
                <div className={orderStyle.done}>
                    <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M39.3122 0.595853C40.1999 1.4172 40.2327 2.78057 39.3852 3.64103L16.0519 27.3333C15.6272 27.7646 15.0371 28.0059 14.422 27.9999C13.8069 27.9939 13.222 27.741 12.8063 27.3016L0.584115 14.3785C-0.245201 13.5016 -0.184084 12.1392 0.720625 11.3354C1.62533 10.5316 3.03104 10.5908 3.86035 11.4677L14.4773 22.6934L36.1703 0.666671C37.0177 -0.193786 38.4244 -0.225493 39.3122 0.595853Z" fill="#F2F2F3"/>
                    </svg>
                </div>
            </div>
            <p className="text text_type_main-default mb-1">{status}</p>
            <p className={`text text_type_main-default ${orderStyle.details}`}>{details}</p>
        </div>
    );
}

OrderDetails.propTypes = {
    data: PropTypes.object.isRequired
};

export default OrderDetails;
