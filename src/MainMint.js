import { useState } from 'react';
import {ethers, BigNumber} from 'ethers';
import { Box,  Flex, Button, Text } from '@chakra-ui/react';
import HanyaNFT from './HanyaNFT.json';

const HanyaNFTAddress = "0x397286E7edb51C16887c298B9fe6531F4bF53abe";

const MainMint = ({ accounts, setAccounts }) => {
    const[mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                HanyaNFTAddress,
                HanyaNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.000 * mintAmount).toString()),
                });
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    return (
        <Flex justify='center' align='center' height="70vh" paddingBottom='150px' >
            <Box width='1000px'>
                <div>
                    <Text fontSize="48px" textShadow="0 5px #00000">
                        Hanya
                    </Text>
                    <Text 
                        fontSize="30px" 
                        fontFamily="inherit" 
                        textShadow="0 2px 2px #00000">
                        This is my learning journey.
                    </Text>
                </div>

                {isConnected ? (
                    <div>
                        <div>
                            <Text
                                readyOnly 
                                fontFamily="inherit" 
                                // width="85px" 
                                // height="40px" 
                                textAlign="center" 
                                // paddingLeft="19px" 
                                // marginTop="10px" 
                                fontSize="30px" 
                                type="number">
                                
                                {mintAmount}

                            </Text> 
                        </div>
                            <Button 
                                backgroundColor="#0E0D0B"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="inherit"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                fontSize="20px" 
                                onClick={handleMint}>
                                Mint Now
                            </Button>
                    </div>
                ) : (
                    <Text 
                        marginTop="50px"
                        fontSize="30px"
                        fontFamily="inherit"
                        textShadow="0 3px #000000"
                        color='inherit'>
                        You must be connected to Mint.
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default MainMint;

