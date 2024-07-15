import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function Home() {
  const cart  = [{
    id : 1,
    title : "Mens Black SHoes",
    price : 1200
    
  },{
    id : 2,
    title : "Womens red dress",
    price : 3000
    
  },{
    id : 3,
    title : "Mens Watches",
    price : 5000
    
  }]
  const handleChapa = async () => {
    const referenceNumber = uuidv4();
    const header = {
        headers: { 
            "Content-Type": "application/json"
         },     
    };
    
    const body = {
       amount: cart.reduce((total, item) => total + item.price, 0), //Amount should be integer
       currency: "ETB",
       email: "test@gmail.com",
       first_name: "Eyuel",
       last_name: "Haile",
       phone_number: "0917000000", //the phone number must not include +251
       tx_ref: referenceNumber,
       callback_url: "http://localhost:3000/success",
       return_url: "http://localhost:3000/varifyChapa?tnx_ref="+referenceNumber,
       customization: {
        title: "Item Payment",
        description: "Paying for item in the cart"
       }
    }
    let response = await axios.post(`http://localhost:3000/api/chapa`, body, header);
    //console.log(response.data.data.checkout_url);
    window.location.href = response.data.data.checkout_url;
 }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Checkout Page </h3>
            {cart.map((item) =>  (
              <div className={styles.title} style={{justifyContent:"space-between"}}>
                <span style={{float:"left"}}>{item.title}</span>
                <span style={{float:"right"}}>{item.price} ETB</span>
              </div>
            ))}
            <div className={styles.title} style={{justifyContent:"space-between"}}>
                <span style={{float:"left"}}>Total</span>
                <span style={{float:"right"}}>{cart.reduce((total, item) => total + item.price, 0)} ETB</span>
            </div>
            <button
              type="button"
              className={styles.btn}
              onClick={handleChapa}
            >
              Pay with 
              <img
                  src="/images/chapa.svg"
                  alt="chapa image"
                  style={{
                    width: "100px",
                    paddingLeft: "15px",
                    paddingTop: "5px"
                  }}
                />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}