/**
* @param { import(".").NS } ns
**/
export async function main(ns) {
    const servers = await ns.scan('home');
    servers.forEach(target => {
        ns.tprint("Working on " + target);
        ns.brutessh(target);
        ns.ftpcrack(target);
        ns.relaysmtp(target);

        if (ns.getServerNumPortsRequired(target) < 0) {
            ns.nuke(target);
        }

        if (ns.hasRootAccess(target)) {
            await ns.scp("hack.js", "home", target);
            ns.killall();
            ns.connect(target);
            ns.run("hack.js");
            ns.connect('home');
        }
    });
}
