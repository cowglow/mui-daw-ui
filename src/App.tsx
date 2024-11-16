import {Box, Button, IconButton, Menu, MenuItem, Paper, styled} from "@mui/material";
import SideDrawer from "./SideDrawer.tsx";
import {useState} from "react";
import {Add, Remove} from "@mui/icons-material";

const Root = styled(Paper)`
    display: flex;
    flex-direction: column;
    height: 100svh;
`

function createStemKey() {
    return Math.random().toString(36).toUpperCase().substring(2, 9)
}

function createStemSegments() {
    return Array.from({length: 8}, () => Math.random() >= 0.5)
}

const stemColors = ["#FC8DCA", "#C37EDB", "#B7A6F6", "#88A3E2", "#AAECFC"]

export default function App() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [count, setCount] = useState(0);
    const [stems, setStems] = useState<Record<string, { color: string, segments: boolean[] }>>({})

    const reset = () => {
        setCount(0)
        setStems({})
    }
    const addStem = () => {
        setCount(prevState => ++prevState)
        setStems(prevState => ({
            ...prevState,
            [createStemKey()]: {
                color: stemColors[count % stemColors.length],
                segments: createStemSegments()
            }
        }))
    }

    const removeStem = () => {
        setCount(prevState => --prevState)
        setStems(prevState => {
            const newState = {...prevState};
            const keyToRemove = Object.keys(newState).pop();
            if (keyToRemove) {
                delete newState[keyToRemove];
            }
            return newState;
        });
    }

    return (
        <Root>
            <Box component="header">
                <h1>MUI DAW UI</h1>
            </Box>
            <Box component="main" flex={1}>
                <SideDrawer>
                    <SideDrawer.Header>
                        <p>"Count: {count}"</p>
                        <Button variant="contained" onClick={() => reset()}>RESET</Button>
                    </SideDrawer.Header>
                    <SideDrawer.Content>
                        <Box display="flex" flexDirection="column" width="100%" gap={1}>
                            {Object.keys(stems).map((stemKey, index) => {
                                return (
                                    <Box key={stemKey} display="flex" flex={1} alignItems="center"
                                         bgcolor={stemColors[index % stemColors.length]} maxHeight={50}>
                                        <Box flex={1}>Track:<br/>{stemKey}</Box>
                                        <Menu {...{anchorEl, open}} onClose={(event: MouseEvent) => {
                                            event.preventDefault()
                                            setAnchorEl(null)
                                        }}>
                                            <MenuItem>CTA Link A</MenuItem>
                                            <MenuItem>CTA Link B</MenuItem>
                                            <MenuItem>CTA Link C</MenuItem>
                                        </Menu>
                                        {stems[stemKey].segments.map((clip, clipIndex) => {
                                            return (
                                                <Box key={`${stemKey}-segment-${clipIndex}`} flex={1} margin={1}>
                                                    {clip && (
                                                        <Button
                                                            variant="contained"
                                                            fullWidth
                                                            onClick={(event) => clip && setAnchorEl(event.currentTarget)}>
                                                            {`${clipIndex + 1}-${stemKey}`}
                                                        </Button>
                                                    )}
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                )
                            })}
                        </Box>
                    </SideDrawer.Content>
                    <SideDrawer.SideMenu>
                        <IconButton
                            type="button" sx={{width: 48, height: 48}}
                            onClick={() => removeStem()}>
                            <Remove/>
                        </IconButton>
                        <IconButton
                            type="button" sx={{width: 48, height: 48}}
                            onClick={() => addStem()}>
                            <Add/>
                        </IconButton>
                    </SideDrawer.SideMenu>
                </SideDrawer>
            </Box>
            <Box component="footer">
                <h1>Footer</h1>
            </Box>
        </Root>
    );
}
