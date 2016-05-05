// Copyright 2015 Peter W Moresi

import error from './ERROR';
import {ISBLANK} from './ISBLANK';
import {ISERROR} from './ISERROR';


// VLOOKUP find a needle in a table searching vertically.
export function VLOOKUP(needle, table=[], index=1, exactmatch=false) {

    if ( ISERROR(needle) || ISBLANK(needle) ) {
        return needle;
    }

    for (var i = 0; i < table.length; i++){
        var row = table[i];

        if (index > row.length){
          return error.ref
        }

        if ((exactmatch && row[0]===needle) ||
            ((row[0] == needle) ||
             (typeof row[0] === "string" && row[0].toLowerCase().indexOf(needle.toLowerCase()) != -1) )) {
            return (index < (row.length+1) ? row[index-1] : row[0]);
        }
    }

    return error.na;

}
