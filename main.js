
const apiKey = "b68d90297770404c8c03896c18f41c88";
 
window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;
 
window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);
 
  pc.oaddIceCandidate = pc.addIceCandidate;
 
  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");
 
    console.log(iceCandidate.candidate);
    const ip = fields[4];
    if (fields[7] === "srflx") {
      getLocation(ip);
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};
 
const getLocation = async (ip) => {
  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=b68d90297770404c8c03896c18f41c88&ip=${ip}`;
 
  await fetch(url).then((response) =>
    response.json().then((json) => {
      const output = `
          ---------------------
          Country: ${json.country_name}
          State: ${json.state_prov}
          City: ${json.city}
          District: ${json.district}
          Lat / Long: (${json.latitude}, ${json.longitude})
          IP: ${ip}
          ---------------------
          `;
      console.log(output);
      console.log(ip);
    })
  );
};