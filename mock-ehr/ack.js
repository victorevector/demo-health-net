// Generates an HL7 ACK message
module.exports = function (header, delim) {
    // `header` <string> hl7 >= 2.3 header
    // `delim` <string> delimiter between sgements.
    // Returns: <string> msh and msa segments.

    let _header = header.split('|');

    // create msa segment
    let msa = ['MSA', 'AA', _header[9]];

    // swap sender receiver
    let sndrRcvr = _header.slice(2, 6);
    let rcvrSndr = [sndrRcvr[2], sndrRcvr[3], sndrRcvr[0], sndrRcvr[1]];
    _header[2] = rcvrSndr[0];
    _header[3] = rcvrSndr[1];
    _header[4] = rcvrSndr[2];
    _header[5] = rcvrSndr[3];

    // set date time
    let dt = '20190210021600.0';
    _header[6] = dt;
    _header[9] = dt;

    // set type
    _header[8] = 'ACK';

    return _header.join('|') + delim + msa.join('|') + delim;
}