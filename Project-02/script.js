// ── Tagged Template: sanitize HTML injection
function safe(strings, ...values){
    let result = strings[0];
    values.forEach((value, i)=>{
        const escaped = String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

        result += escaped + strings[i + 1];
    });
    return result;
}

// ── Tagged Template: currency formatter
function currency (strings, ...values){
    let result = strings[0];
    values.forEach((value, i)=>{
        const formatted = (typeof value === 'number')? `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`: (value ?? '');
        result += formatted + strings[i + 1];
    });
    return result;
}

// ── Tagged Template: invoice row builder
function row(strings, ...values) {
    let result = strings[0];
    values.forEach((value, i) => {
        result += (value ?? '') + strings[i + 1];
    });
    return `<tr>${result}</tr>`;
}
/*function row(strings, ...values){
    let result = `<tr><td>${strings.reduce((o, s, i) => o + (values[i - 1] ?? '') + s)}</td></tr>`;
    return result;
}*/

const items =[ { desc: 'UI/UX Design', qty: 1, rate: 45000 }, { desc: 'Frontend Dev', qty: 3, rate: 18000 } ];

function renderItems(){
    document.querySelector('#items-container').innerHTML = items.map((item, i)=>{
        return `<div class="item-row">
            <div>
                <label>Description: </label>
                <input value="${item.desc}" oninput="items[${i}].desc=this.value" >
            </div>
            <div>
                <label>Qty:</label>
                <input type="number" value="${item.qty}" oninput="items[${i}].qty = +this.value" min="1">
            </div>
            <div>
                <label>Rate (₹):</label>
                <input type="number" value="${item.rate}" oninput="items[${i}].rate = +this.value">
            </div>
            <div>
                <label>&nbsp;</label>
                <button class="btn btn-sm" onclick="removeItem(${i})">✕</button>
            </div>
        </div>`
    }).join('');
}

/* Creating new items on clicking "+ Add items" */
function addItems(){
    items.push({ desc: '', qty: '1', rate: '0'});
    renderItems();
}
/* Removing of items on clicking cross(X) button */
function removeItem(i){
    items.splice(i, 1);
    renderItems();
}

/* Generating Invoice */
function generateInvoice(){

    const get = (id) => {
        return document.getElementById(id).value;
    };
    const subtotal = items.reduce((a, b)=>{
        return a + b.qty * b.rate
    }, 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;
    const tableRows = items.map((b)=>{
            return `<tr>
                        <td>${safe`${b.desc}`}</td>
                        <td style="font-family:'DM Mono',monospace;text-align:center">${b.qty}</td>
                        <td style="font-family:'DM Mono',monospace;text-align:right">${currency`${b.rate}`}</td>
                        <td style="font-family:'DM Mono',monospace;text-align:right">${currency`${b.qty * b.rate}`}</td>
                    </tr>`
    }).join('');

    document.querySelector('#preview').style.display = 'block';
    document.querySelector('#preview').innerHTML = `
        <div class="inv-header">
            <div>
                <div class="inv-title">INVOICE</div>
                <div style="font-size:.85rem;color:var(--muted);margin-top:.3rem">${safe`${get('from-name')}`}</div>
                <div style="font-size:.8rem;color:var(--muted)">${safe`${get('from-email')}`}</div>
            </div>
            <div class="inv-meta">
                <div><strong>${safe`${get('inv-num')}`}</strong></div>
                <div>${safe`${get('inv-date')}`}</div>
                <div>${safe`${get('due-date')}`}</div>
            </div>
        </div>
        <div class="inv-parties">
            <div>
                <div class="party-tag">Bill From:</div>
                <div class="party-name">${safe`${get('from-name')}`}</div>
                <div class="party-email">${safe`${get('from-email')}`}</div>
            </div>
            <div>
                <div class="party-tag">Bill to:</div>
                <div class="party-name">${safe`${get('to-name')}`}</div>
                <div class="party-email">${safe`${get('to-email')}`}</div>
            </div>
        </div>
        <table class="inv-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th style="text-align: center">Qty</th>
                    <th style="text-align:right">Rate</th>
                    <th style="text-align:right">Amount</th>
                </tr>
            </thead>
            <tbody>${tableRows}</tbody>
        </table>
        <div class="inv-total">
            <div class="inv-total-line">
                <span>subtotal</span>
                <span>${currency`${subtotal}`}</span>
            </div>
            <div class="inv-total-line">
                <span>GST (18%)</span>
                <span>${currency`${tax}`}</span>
            </div>
            <div class="inv-grand">
                <span>Total Due</span>
                <span>${currency`${total}`}</span>
            </div>
        </div>
        <div class="inv-footer">Thank you for your business. Payment due within 30 days. · ${safe`${get('from-email')}`}</div>
    `;
    document.getElementById('preview').scrollIntoView({ behavior: 'smooth', block: 'start' });

}

//init
const today = new Date().toISOString().split('T')[0];
const due = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
document.querySelector('#inv-date').value = today;
document.querySelector('#due-date').value = due;
renderItems();