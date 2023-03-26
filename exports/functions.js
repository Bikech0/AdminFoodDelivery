function change_cmd(cmds){
    const all_cmds = [];
    for (let i=0; i<cmds.length; i++){
        const new_cmds = [];
        const cmd = cmds[i];
        const phone_number = cmd._id;
        const commands = cmd.commands;
        for (let j=0; j<commands.length; j++){
            const command = commands[j];
            const desc = update_json(command, ["prod", "ingredient", "sauces", "salades", "Frites", "Size", "Pate", "price", "quantity", "delivery"]);
            new_cmds.push(desc);
        }
        const new_command = {"phone_number": phone_number, "commands": new_cmds, "total_sum": get_total(commands)};
        all_cmds.push(new_command);
    }
    return all_cmds;
}

function update_json(json, includes){
    const new_json = {};
    for (let i=0; i<includes.length; i++){
        const prop = includes[i];
        new_json[prop] = json[prop];
    }
    return new_json;
}

function get_total(cmd){
    total = 0;

    for (let i=0; i<cmd.length; i++){
        const command = cmd[i];
        total += (parseInt(command.price) * parseInt(command.quantity));
    }
    return total;
}


module.exports = {
    change_cmd,
    update_json,
    get_total
}