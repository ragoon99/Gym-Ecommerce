/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';

import { Container } from '@mui/material';

import './Unit.css';

function LandUnitConverter() {
    const [ropani, setRopani] = useState('');
    const [aana, setAana] = useState('');
    const [paisa, setPaisa] = useState('');
    const [bigaha, setBigaha] = useState('');
    const [kattha, setKattha] = useState('');
    const [dhur, setDhur] = useState('');

    const convertBigahaToRopaniAanaPaisa = useCallback(() => {
        const totalBigaha = parseFloat(bigaha) || 0;

        const totalRopani = totalBigaha * 13.31;
        const totalAana = totalBigaha * 20;
        const totalPaisa = totalAana * 64;

        setRopani(totalRopani.toFixed(2));
        setAana(totalAana.toFixed(2));
        setPaisa(totalPaisa.toFixed(2));
    }, [bigaha]);

    const convertKatthaDhurToRopaniAanaPaisa = useCallback(() => {
        const totalKattha = parseFloat(kattha) || 0;
        const totalDhur = parseFloat(dhur) || 0;

        const totalRopani = totalKattha * 0.6655 + totalDhur * 0.0416;
        const totalAana = totalKattha * 20 + totalDhur * 1.25;
        const totalPaisa = totalAana * 64;

        setRopani(totalRopani.toFixed(2));
        setAana(totalAana.toFixed(2));
        setPaisa(totalPaisa.toFixed(2));
    }, [dhur, kattha]);

    const convertRopaniAanaPaisaToBigaha = () => {
        const totalRopani = parseFloat(ropani) || 0;
        const totalAana = parseFloat(aana) || 0;
        const totalPaisa = parseFloat(paisa) || 0;

        const totalBigaha = totalRopani / 13.31;
        setBigaha(totalBigaha.toFixed(2));
    };

    const convertRopaniAanaPaisaToKatthaDhur = () => {
        const totalRopani = parseFloat(ropani) || 0;
        const totalAana = parseFloat(aana) || 0;
        const totalPaisa = parseFloat(paisa) || 0;

        const totalKattha = totalRopani / 0.6655;
        const totalDhur = (totalAana - totalKattha * 20) / 1.25;

        setKattha(totalKattha.toFixed(2));
        setDhur(totalDhur.toFixed(2));
    };

    const convertAanaPaisaToBigaha = () => {
        const totalAana = parseFloat(aana) || 0;
        const totalPaisa = parseFloat(paisa) || 0;

        const totalBigaha = totalAana / 20 + totalPaisa / 64;
        setBigaha(totalBigaha.toFixed(2));

        // Reset Kattha and Dhur
        setKattha('');
        setDhur('');
    };

    const convertAanaPaisaToKatthaDhur = () => {
        const totalAana = parseFloat(aana) || 0;
        const totalPaisa = parseFloat(paisa) || 0;

        const totalKattha = totalAana / 20 + (totalPaisa / 64) * 1.25;
        const totalDhur = (totalPaisa % 64) / 4;

        setKattha(totalKattha.toFixed(2));
        setDhur(totalDhur.toFixed(2));

        // Reset Bigaha
        setBigaha('');
    };

    useEffect(() => {
        if (bigaha !== '') convertBigahaToRopaniAanaPaisa();
        if (kattha !== '' || dhur !== '') convertKatthaDhurToRopaniAanaPaisa();
    }, [kattha, dhur, convertKatthaDhurToRopaniAanaPaisa, bigaha, convertBigahaToRopaniAanaPaisa]);

    return (
        <Container>
            <div className="top p-10 bg-slate-700 text-white">
                <h2 className="font-semibold text-2xl text-center mb-4">Land Unit Converter</h2>

                <form action="#">
                    <div className="group">
                        <div className="title">Ropani</div>
                        <input
                            value={ropani}
                            type="number"
                            onChange={(e) => setRopani(e.target.value)}
                            onBlur={convertRopaniAanaPaisaToBigaha}
                            className="text-black p-2 w-full rounded-lg"
                        />
                    </div>

                    <div className="group">
                        <div className="title">Aana</div>
                        <input
                            value={aana}
                            onChange={(e) => setAana(e.target.value)}
                            onBlur={convertAanaPaisaToBigaha}
                            type="number"
                            className="text-black p-2 w-full rounded-lg"
                        />
                    </div>

                    <div className="group">
                        <div className="title">Paisa</div>
                        <input
                            value={paisa}
                            onChange={(e) => setPaisa(e.target.value)}
                            onBlur={convertAanaPaisaToKatthaDhur}
                            type="number"
                            className="text-black p-2 w-full rounded-lg"
                        />
                    </div>
                </form>
            </div>

            <div className="result">
                <div className="left">
                    <div className="loan-emi">
                        <h3>Bigaha</h3>
                        <div className="value">
                            <input
                                type="text"
                                value={bigaha}
                                onChange={(e) => setBigaha(e.target.value)}
                                onBlur={convertBigahaToRopaniAanaPaisa}
                            />
                        </div>
                    </div>

                    <div className="total-interest mt-2">
                        <h3>Kattha</h3>
                        <div className="value">
                            <input
                                value={kattha}
                                onChange={(e) => setKattha(e.target.value)}
                                onBlur={convertKatthaDhurToRopaniAanaPaisa}
                                type="text"
                                className="text-black p-2 w-full rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="total-amount mt-2">
                        <h3>Dhur</h3>
                        <div className="value">
                            <input
                                value={dhur}
                                onChange={(e) => setDhur(e.target.value)}
                                onBlur={convertKatthaDhurToRopaniAanaPaisa}
                                type="text"
                                className="text-black p-2 w-full rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default LandUnitConverter;
