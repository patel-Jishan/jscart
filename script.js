let product = [
     { 
            img: "jeans.jpeg",
            name: "Jeans", 
            brand: "Being Human",
            price: "5999/-", 
            no : Math.round(Math.random() * 100),
        },
        { 
            img: "jacket.jpeg", 
            name: "Jacket", 
            brand: "Dolice & Gabbana",
            price: "9999/-", 
            no : Math.round(Math.random() * 100),
        },
        { 
            img: "shirt.jpeg", 
            name: "Floral Shirt", 
            brand: "Rare Rabbit",
            price: "4500/-", 
            no : Math.round(Math.random() * 100),
        },
        { 
            img: "watch.jpeg", 
            name: "Premium Watch", 
            brand: "Rolex",
            price: "25000/-", 
            no : Math.round(Math.random() * 100),
        },
        { 
            img: "tshirt.jpeg", 
            name: "T-Shirt", 
            brand: "lacoste",
            price: "15000/-", 
            no : Math.round(Math.random() * 100),
        },
        { 
            img: "shoes.jpeg", 
            name: "Shoes", 
            brand: "Skechers",
            price: "10500/-", 
            no : Math.round(Math.random() * 100),
        }
];
localStorage.setItem('product', JSON.stringify(product));

function addData() {

    if (product == null) {
        product = [];
    }

    let name = document.getElementById('name').value;
    let brand = document.getElementById('brand').value;
    let price = document.getElementById('price').value;
    
    let imgInput = document.getElementById('img');
    let imgname = imgInput.files.length > 0 ? imgInput.files[0].name : null;

    let editno = document.getElementById('editno').value;

    if (editno) {
        for (let i = 0; i < product.length; i++) {
            if (product[i]['no'] == editno) {
                product[i]['name'] = name;
                product[i]['brand'] = brand;
                product[i]['price'] = price;
                if (imgname) {
                    product[i]['img'] = imgname;
                }
                document.getElementById("submit").value = "Add Data";
                document.getElementById("editno").value = "";
            }
        }
    } else {
        let prod = {
            name: name,
            brand: brand,
            price: price,
            img: imgname,
            no: Math.round(Math.random() * 100),
        }
        product.push(prod);
    }

    document.getElementById('name').value = "";
    document.getElementById('brand').value = "";
    document.getElementById('price').value = "";
    document.getElementById('img').value = "";

    let aData = JSON.stringify(product);
    let add = localStorage.setItem('product', aData);
    viewData();
}

viewData();

function viewData() {
    let vdata = localStorage.getItem('product');
    let view = JSON.parse(vdata);

    let data = "<table border='1'><tr><th>Image</th><th>Name</th><th>Brand</th><th>Price</th></tr>";
    for (let i = 0; i < view.length; i++) {
        data += `<tr>`;
        data += `<td><img src='images/${view[i]['img']}' width='50'></td>`;
        data += `<td>${view[i]['name']}</td>`;
        data += `<td>${view[i]['brand']}</td>`;
        data += `<td>${view[i]['price']}</td>`;
        data += `<td><a href='javascript:DeData(${view[i]['no']})'>Delete</a></td>`;
        data += `<td><a href='javascript:UpData(${view[i]['no']})'>Update</a></td>`;
        data += `</tr>`;
    }
    data += "</table>";
    document.getElementById('res').innerHTML = data;
}

function DeData(no) {
    let dData = localStorage.getItem('product');
    let delet = JSON.parse(dData);

    for (let i = 0; i < delet.length; i++) {
        if (delet[i]['no'] == no) {
            delet.splice(i, 1);
        }
    }
    localStorage.setItem('product', JSON.stringify(delet));
    viewData();
}

function UpData(no) {
    let uData = localStorage.getItem('product');
    let update = JSON.parse(uData);

    for (let i = 0; i < update.length; i++) {
        if (update[i]['no'] == no) {
            document.getElementById('name').value = update[i]['name'];
            document.getElementById('brand').value = update[i]['brand'];
            document.getElementById('price').value = update[i]['price'];

            document.getElementById('submit').value = "Update Data";
            document.getElementById('editno').value = no;
        }
    }
}

function searchproduct(){
    let proname = document.getElementById('search').value;
    let ser = localStorage.getItem('product');
    let record = JSON.parse(ser);



    let data = "<table border='1'><tr><th>Image</th><th>Name</th><th>Brand</th><th>Price</th></tr>";
    record.forEach((sp , i )=> {
        if(sp.name.match(proname)){
            data += `<tr>
         <td><img src='images/${record[i]['img']}' width='50'></td>
         <td>${record[i]['name']}</td>
         <td>${record[i]['brand']}</td>
         <td>${record[i]['price']}</td>
         <td><a href='javascript:DeData(${record[i]['no']})'>Delete</a></td>
         <td><a href='javascript:UpData(${record[i]['no']})'>Update</a></td>
         </tr>`;
        }
    });   
    
    data += "</table>";
    document.getElementById('res').innerHTML = data;
}
