/**********************************************
 * Formata o CNPJ ou CPF com pontos e traços
 * @param  {String} value Valor a ser formatado
 * @return {String}      CNPJ ou CPF formatado
 ***********************************************/
function formatCnpjCpf(value) {
    const cnpjCpf = value.replace(/\D/g, '');

    if (cnpjCpf.length === 11) { //Se tiver 11 é um CPF
        return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
    }

    return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
}
export { formatCnpjCpf }