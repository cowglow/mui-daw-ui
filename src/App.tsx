import {Box, Button, IconButton, Menu, MenuItem, MenuProps, Paper, styled} from "@mui/material";
import SideDrawer from "./SideDrawer.tsx";
import {useState} from "react";
import {Redo, Undo} from "@mui/icons-material";

const Root = styled(Paper)`
    display: flex;
    flex-direction: column;
    height: 100svh;
`

const numberOfStems = Math.floor(Math.random() * 3) + 6
const stems = Array.from({length: numberOfStems}, () => {
    const numberOfClip = 8
    return Array.from({length: numberOfClip}, () => Math.random() >= 0.5)
})
const stemKeys = Array.from({length: numberOfStems}, () => Math.random().toString(36).substring(2, 9))

export default function App() {
    const [count, setCount] = useState(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const menuOptions: MenuProps = {
        anchorEl,
        open,
        onClose: (event: MouseEvent) => {
            event.preventDefault()
            setAnchorEl(null)
        }
    }

    return (
        <Root>
            <Box component="header">
                <h1>Header</h1>
            </Box>
            <Box component="main" sx={{flex: 1}}>
                <SideDrawer>
                    <SideDrawer.Header>
                        <Button onClick={() => alert("foobar")}>Foo</Button>
                    </SideDrawer.Header>
                    <SideDrawer.Content>
                        <Box display="flex" flexDirection="column" width="100%">
                            <p>"Count: {count}"</p>
                            <Menu {...menuOptions}>
                                <MenuItem>CTA Link A</MenuItem>
                                <MenuItem>CTA Link B</MenuItem>
                                <MenuItem>CTA Link C</MenuItem>
                            </Menu>
                            {stems.map((stem, index) => {
                                const randomKey = stemKeys[index]
                                return (
                                    <Box key={randomKey} display="flex" flex={1}
                                         sx={{border: `solid thin ${stem ? "red" : "blue"}`}}>
                                        <Box sx={{width: 100}}>
                                            {randomKey}
                                        </Box>
                                        {stem.map((clip, clipIndex) => {
                                            return (
                                                <Box key={`${randomKey}-segment-${clipIndex}`}
                                                     flex={1}
                                                >
                                                    <Button sx={{border: "thin solid black", width: "100%"}}
                                                            onClick={(event) => clip && setAnchorEl(event.currentTarget)}
                                                    >
                                                        {`${clipIndex}-${randomKey}`}
                                                    </Button>
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
                            onClick={() => setCount(prevState => --prevState)}>
                            <Undo/>
                        </IconButton>
                        <IconButton
                            type="button" sx={{width: 48, height: 48}}
                            onClick={() => setCount(prevState => ++prevState)}>
                            <Redo/>
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
