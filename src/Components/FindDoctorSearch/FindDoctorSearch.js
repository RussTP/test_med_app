import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist',
    'Gynecologist/obstetrician',
    'General Physician',
    'Dermatologist',
    'Ear-nose-throat (ent) Specialist',
    'Homeopath',
    'Ayurveda',
];

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities] = useState(initSpeciality); // No need to modify specialities dynamically here.
    const navigate = useNavigate();

    // Handle selection of a specialty from the dropdown or search
    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/instant-consultation?speciality=${speciality}`);
        window.location.reload();
    };

    // Handle the search icon click
    const handleSearchClick = () => {
        if (searchDoctor.trim()) {
            navigate(`/instant-consultation?speciality=${searchDoctor}`);
            window.location.reload();
        } else {
            alert('Please enter or select a specialty to search.');
        }
    };

    return (
        <div className="finddoctor">
            <center>
                <h1>Find a doctor and Consult instantly</h1>
                <div>
                    <i style={{ color: '#000000', fontSize: '20rem' }} className="fa fa-user-md"></i>
                </div>
                <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="doctor-search-box" style={{ position: 'relative', width: '300px' }}>
                        <input
                            type="text"
                            className="search-doctor-input-box"
                            placeholder="Search doctors, clinics, hospitals, etc."
                            onFocus={() => setDoctorResultHidden(false)}
                            onBlur={() => setDoctorResultHidden(true)}
                            value={searchDoctor}
                            onChange={(e) => setSearchDoctor(e.target.value)}
                        />
                        {/* Clickable search icon */}
                        <div className="findiconimg" onClick={handleSearchClick}>
                            <img
                                className="findIcon"
                                src={`${process.env.PUBLIC_URL}/images/search.svg`}
                                alt="Search"
                                style={{ cursor: 'pointer'}}
                            />
                        </div>

                        {/* Dropdown for search results */}
                        <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                            {specialities
                                .filter((speciality) =>
                                    speciality.toLowerCase().includes(searchDoctor.toLowerCase())
                                )
                                .map((speciality) => (
                                    <div
                                        className="search-doctor-result-item"
                                        key={speciality}
                                        onMouseDown={() => handleDoctorSelect(speciality)}
                                    >
                                        <span>
                                            <img
                                                src={`${process.env.PUBLIC_URL}/images/search.svg`}
                                                alt=""
                                                style={{ height: '10px', width: '10px', marginRight: '5px' }}
                                            />
                                        </span>
                                        <span>{speciality}</span>
                                        <span style={{ marginLeft: '10px', color: '#999' }}>SPECIALITY</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default FindDoctorSearch;
