export function ClipCopy(text) {
    const input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}

export async function isConnected() {
    let wallet = JSON.parse(localStorage.getItem('wallet')) || null;
    if (wallet == null || wallet.wallet == "") {
        console.log('no wallet')

        return {
            status: false,
            wallet,
        }
    } else {
        return {
            status: true,
            wallet
        }
    }
};