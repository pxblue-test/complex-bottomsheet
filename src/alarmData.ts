const NOW = Date.now();
const TYPES = ['alarm', 'settings', 'session'];
const LOCATIONS = ['Dos Valley Field', 'Jameson Field', 'Parker Field West', 'Parker Field East', 'North Park Garden'];
const DEVICES = ['MX Power Pro', 'PXL DG1', 'Pentair Aurora'];
const DETAILS = ['Over Voltage Fault', 'Over Current Fault', 'Under Voltage Fault', 'Under Current Fault'];

type alarmDataObject = {
    date: number,
    type: string,
    active: boolean,
    location: string,
    device: string,
    details: string
}

export function formatDate(timestamp: number) {
    let date = new Date(timestamp);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

function getRandomData() : alarmDataObject{
    const type = TYPES[Math.floor(Math.random()*TYPES.length)];
    switch(type){
        case 'alarm':
            return {
                date: Math.round(NOW - Math.random() * 1000000000),
                type: type,
                active: Math.random() < .3,
                location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
                device: DEVICES[Math.floor(Math.random() * DEVICES.length)],
                details: DETAILS[Math.floor(Math.random() * DETAILS.length)]
            }
        case 'settings':
            return {
                date: Math.round(NOW - Math.random() * 1000000000),
                type: type,
                active: false,
                location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
                device: DEVICES[Math.floor(Math.random() * DEVICES.length)],
                details: 'Settings changed'
            }
        case 'session':
            return {
                date: Math.round(NOW - Math.random() * 1000000000),
                type: type,
                active: false,
                location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
                device: DEVICES[Math.floor(Math.random() * DEVICES.length)],
                details: 'Run Session'
            }
    }
}

function getAlarmList(count: number) : Array<alarmDataObject>{
    let data = [];
    for (let i = 0; i < count; i++) {
        data.push(getRandomData());
    }
    return data;
}

export default getAlarmList;