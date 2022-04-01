let bf = document.getElementById("bal-bf").value.trim();
let qty_pur = document.getElementById("qtyPur").value.trim();
let prod_dim = document.getElementById("proDim").value.trim();
(prod_dim ==="") ? prod_dim= "n/a": document.getElementById("proDim").value;
let qty_pro = document.getElementById("qtyPro").value.trim();
let cf = document.getElementById("bal-cf").value.trim();


function evaluateMaterialBalanceBF(){
    // These are the tests
    const twoValues = /^\d+\s*([a-zA-z]+)\s*([a-zA-z]+)\s*\d+\s*([a-zA-z]+)$/;
    const oneValue = /^\d+\s*[a-zA-Z]+$/;
    const noUnit = /^[1-9]+\d*$/;
    const zero = /^0$/;

    let error_message = "";
    let output;
    // Checking if BF is 0
    if(zero.test(bf)){
        // Checking if both BF and QtyPurchased are both zero
        if(zero.test(qty_pur)){
            error_message += "You cannot have 0 BF and 0 Quantity to be purchased\n";
        }
        // If they are both not zero
        else{// Checking what pattern qty purchased matches
            // If it matches the 2 values pattern
            if(twoValues.test(qty_pur)){

                // Getting the values and words
                let qtyPurValues = qty_pur.match(/\d+/g);
                let qtyPurWords = qty_pur.match(/[a-z]+/ig);
                // Checking if product dimension is n/a
                if(prod_dim === "n/a"){
                    error_message += "Product dimension cannot be empty";
                }else{

                    if(twoValues.test(prod_dim)){

                        // Getting the values and words
                        let proDimValues = prod_dim.match(/\d+/g);
                        let proDimWords = prod_dim.match(/[a-z]+/ig);
                        if(qtyPurValues[0] === proDimValues[0]){
                            // Checking if their words are equal
                            if(arraysEqual(qtyPurWords, proDimWords)){
                                if(noUnit.test(qty_pro)){

                                    let qtyProValues = qty_pro.match(/\d+/g);
                                    let calc = (parseInt(qtyPurValues[1])) - (parseInt(proDimValues[1]) * parseInt(qtyProValues[0]));
                                    if(calc < 0){
                                        error_message += "Negative Output Detected";
                                    }else if (calc === 0){
                                        output = `0`;
                                    }

                                    else{
                                        output = `${qtyPurValues[0]} ${qtyPurWords[0]} ${qtyPurWords[1]} ${calc} ${qtyPurWords[2]}`;
                                    }

                                }else{
                                    error_message += "Unit Mismatch\n";
                                }
                            }else{
                                error_message += "Unit Mismatch\n";
                            }
                        }else{
                            error_message +="Invalid";
                        }

                    }

                }


            }
            // If it matches the 1 values pattern
            else if(oneValue.test(qty_pur)){
                let qtyPurValues = qty_pur.match(/\d+/g);
                let qtyPurWords = qty_pur.match(/[a-z]+/ig);
                if(prod_dim === "n/a"){
                    // n/a = 1
                    if(noUnit.test(qty_pro)){
                        let qtyProValues = qty_pro.match(/\d+/g);
                        let calc = (parseInt(qtyPurValues[0])) - ((1) * parseInt(qtyProValues[0]));
                        if(calc <= 0){
                            error_message += "Negative Output";
                        }else{
                            output = `${calc} ${qtyPurWords[0]}`;
                        }

                    }else if(oneValue.test(qty_pro)){
                        let qtyProValues = qty_pro.match(/\d+/g);
                        let qtyProWords = qty_pro.match(/[a-z]+/ig);
                        if(arraysEqual(qtyPurWords, qtyProWords)){
                            let calc = (parseInt(qtyPurValues[0])) - ((1) * parseInt(qtyProValues[0]));
                            if(calc <= 0){
                                error_message += "Invalid";
                            }else{
                                output = `${calc} ${qtyPurWords[0]}`;
                            }

                        }else{
                            error_message += "Unit Mismatch\n";
                        }
                    }
                    else{
                        error_message += "Invalid Quantity to be Produced\n";
                    }


                }else{
                    error_message += "Invalid Product Dimension";
                }
            }
            // If it matches the No units pattern
            else if(noUnit.test(qty_pur)){
                let qtyPurValues = qty_pur.match(/\d+/g);
                if(prod_dim === "n/a"){
                    // n/a = 1
                    if(noUnit.test(qty_pro)){
                        let qtyProValues = qty_pro.match(/\d+/g);
                        let calc = (parseInt(qtyPurValues[0])) - ((1) * parseInt(qtyProValues[0]));
                        if(calc <= 0){
                            error_message += "Negative Output";
                        }else{
                            output = `${calc}`;
                        }

                    }
                    else{
                        error_message += "Invalid Quantity to be Produced\n";
                    }


                }else{
                    error_message += "Invalid Product Dimension";
                }
            }
        }

    }

    // Checking if BF contains 2 values
    else if(twoValues.test(bf)){
        let BFValues = bf.match(/\d+/g);
        let BFWords = bf.match(/[a-z]+/ig);
        if(zero.test(qty_pur)){
            if(twoValues.test(prod_dim)){
                if(prod_dim === "n/a"){
                    error_message += "Product dimension cannot be empty";
                }else{

                    if(twoValues.test(prod_dim)){
                        // Getting the values and words
                        let proDimValues = prod_dim.match(/\d+/g);
                        let proDimWords = prod_dim.match(/[a-z]+/ig);
                        if(BFValues[0] === proDimValues[0]){
                            // Checking if their words are equal
                            if(arraysEqual(BFWords, proDimWords)){
                                if(noUnit.test(qty_pro)){
                                    let qtyProValues = qty_pro.match(/\d+/g);
                                    let calc = (parseInt(BFValues[1])) - (parseInt(proDimValues[1]) * parseInt(qtyProValues[0]));
                                    if(calc <= 0){
                                        error_message += "Invalid";
                                    }else{
                                        output = `${BFValues[0]} ${BFWords[0]} ${BFWords[1]} ${calc} ${BFWords[2]}`;
                                    }

                                }else{
                                    error_message += "Unit Mismatch\n";
                                }
                            }else{
                                error_message += "Unit Mismatch\n";
                            }
                        }else{
                            error_message +="Invalid";
                        }

                    }

                }
            }
        }

        else if(twoValues.test(qty_pur)){
            if(twoValues.test(qty_pur)){

                // Getting the values and words
                let qtyPurValues = qty_pur.match(/\d+/g);
                let qtyPurWords = qty_pur.match(/[a-z]+/ig);

                if (arraysEqual(BFWords, qtyPurWords)){
                    // Checking if product dimension is n/a
                    if(BFValues[0] === qtyPurValues[0]){
                        if(prod_dim === "n/a"){
                            error_message += "Product dimension cannot be empty";
                        }else{

                            if(twoValues.test(prod_dim)){
                                // Getting the values and words
                                let proDimValues = prod_dim.match(/\d+/g);
                                let proDimWords = prod_dim.match(/[a-z]+/ig);
                                if(qtyPurValues[0] === proDimValues[0]){
                                    // Checking if their words are equal
                                    if(arraysEqual(qtyPurWords, proDimWords)){
                                        if(noUnit.test(qty_pro)){
                                            let qtyProValues = qty_pro.match(/\d+/g);
                                            let calc = (parseInt(BFValues[1]) +parseInt(qtyPurValues[1])) - (parseInt(proDimValues[1]) * parseInt(qtyProValues[0]));
                                            if(calc < 0){
                                                error_message += "Negative Output Detected";
                                            }else if (calc === 0){
                                                output = `0`;
                                            }else{
                                                output = `${qtyPurValues[0]} ${qtyPurWords[0]} ${qtyPurWords[1]} ${calc} ${qtyPurWords[2]}`;
                                            }

                                        }else{
                                            error_message += "Unit Mismatch\n";
                                        }
                                    }else{
                                        error_message += "Unit Mismatch\n";
                                    }
                                }else{
                                    error_message +="Invalid";
                                }

                            }

                        }
                    }

                }else{
                    error_message += "Units Mismatch\n";
                }




            }
        }

    }

    // Checking if BF contains one value
    else if(oneValue.test(bf)){
        let BFValues = bf.match(/\d+/g);
        let BFWords = bf.match(/[a-z]+/ig);
        if(zero.test(qty_pur)){
            if(prod_dim === "n/a"){
                if(oneValue.test(qty_pro)){
                    let qtyProValues = qty_pro.match(/\d+/g);
                    let qtyProWords = qty_pro.match(/[a-z]+/ig);
                    if (arraysEqual(BFWords, qtyProWords)){
                        let calc = (parseInt(BFValues[0])) - (parseInt(qtyProValues[0]));
                        if(calc < 0){
                            error_message += "Negative Output Detected";
                        }else if (calc === 0){
                            output = `0`;
                        }else{
                            output = `${calc} ${BFWords}`;
                        }
                    }
                }else if(noUnit.test(qty_pro)){
                    let qtyProValues = qty_pro.match(/\d+/g);
                    let calc = (parseInt(BFValues[0])) - (parseInt(qtyProValues[0]));
                    if(calc <= 0){
                        error_message += "Negative Output Detected";
                    }else{
                        output = `${calc} ${BFWords}`;
                    }

                }else{
                    error_message += "Invalid\n";
                }
            }else{
                error_message += "Invalid Product Dimension\n";
            }


        }else{
            error_message += "Invalid\n";
        }

    }

    // Checking if BF has no units
    else if(noUnit.test(bf)){
        if(noUnit.test(bf)){
            let BFValues = bf.match(/\d+/g);
            if(zero.test(qty_pur)){
                if(prod_dim === "n/a"){
                    if(noUnit.test(qty_pro)){
                        let qtyProValues = qty_pro.match(/\d+/g);
                        let calc = (parseInt(BFValues[0])) - (qtyProValues[0]);
                        if(calc < 0){
                            error_message += "Negative Output Detected";
                        }else if (calc === 0){
                            output = `0`;
                        }else{
                            output = `${calc}`;
                        }
                    }
                }
            }
        }

    }

    if(error_message === ""){
        document.getElementById("bal-cf").value = output;
    }else{
        console.log(error_message);
        document.getElementById("bal-cf").value = error_message;
    }


}
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
evaluateMaterialBalanceBF();
