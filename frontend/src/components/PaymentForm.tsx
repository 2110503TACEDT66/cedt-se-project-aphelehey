"use client";
import { stat } from "fs";
import { useState } from "react";
import { PaymentItem } from "interfaces";

export default function PaymentForm() {
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNum, setCardNum] = useState("");

  const [cardNumWarning, setCardNumWarning] = useState(false);
  const [cvvWarning, setCvvWarning] = useState(false);
  const [zipCodeWarning, setZipCodeWarning] = useState(false);
  const [expireDateWarning, setExpireDateWarning] = useState(false);

  const handleCardNumBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length < 19) {
      setCardNumWarning(true);
    } else {
      setCardNumWarning(false);
    }
  };

  const handleCvvBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3) {
      setCvvWarning(true);
    } else {
      setCvvWarning(false);
    }
  };

  const handleZipCodeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length < 5) {
      setZipCodeWarning(true);
    } else {
      setZipCodeWarning(false);
    }
  };
  const handleExpireDateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length < 5) {
      setExpireDateWarning(true);
    } else {
      setExpireDateWarning(false);
    }
  };

  const handleExpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedExpDate = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (formattedExpDate.length >= 2) {
      formattedExpDate =
        formattedExpDate.substring(0, 2) + "/" + formattedExpDate.substring(2);
    }
    setExpDate(formattedExpDate);
  };
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedExpDate = e.target.value.replace(/\D/g, "").substring(0, 3);

    setCvv(formattedExpDate);
  };
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedExpDate = e.target.value.replace(/\D/g, "").substring(0, 5);

    setZipCode(formattedExpDate);
  };

  const handleCardNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedCardNum = e.target.value.replace(/\D/g, "").substring(0, 16); // Remove non-digit characters and limit to 16 characters
    if (formattedCardNum.length > 0) {
      const groups = formattedCardNum.match(/.{1,4}/g);
      if (groups) {
        formattedCardNum = groups.join("-");
      }
    }
    setCardNum(formattedCardNum);
  };

  const makePayment = (e:React.FormEvent<HTMLFormElement>) => {
    
    if (
      name &&
      email &&
      address &&
      city &&
      zipCode &&
      cardName &&
      cardNum &&
      expDate &&
      cvv &&
      !cardNumWarning &&
      !zipCodeWarning &&
      !cvvWarning &&
      !expireDateWarning
    ) {
        //alert("submit passed")
     // console.log("work in if");
      const item: PaymentItem = {
        name: name,
        email: email,
        address: address,
        city: city,
        zipCode: zipCode,
        cardName: cardName,
        cardNum: cardNum,
        expDate: expDate,
        cvv: cvv,
      };
      console.log(item);
    } else {
        e.preventDefault();
      alert("pls correct form");
      
    }
  };
  return (
    <div className="container mx-auto mt-10 px-4">
      <form onSubmit={makePayment}>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              Billing Address
            </h3>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2">
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                required
              />
             
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="address" className="block mb-2">
                Address:
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="city" className="block mb-2">
                City:
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                required
              />
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2">
                <label htmlFor="zip" className="block mb-2">
                  Zip Code:
                </label>
                <input
                  type="text"
                  id="zip"
                  placeholder="XXXXX"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                  maxLength={5}
                  value={zipCode}
                  onBlur={handleZipCodeBlur}
                  onChange={handleZipCodeChange}
                  required
                />
                {
                    zipCodeWarning? <p className="text-red-600 text-sm">Please enter a valid zipcode.</p>:""
                }
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <h3 className="text-lg font-semibold text-red-600 mb-4">Payment</h3>
            <div className="mb-6">
              <label htmlFor="cardName" className="block mb-2">
                Name On Card:
              </label>
              <input
                type="text"
                id="cardName"
                placeholder="Enter card name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="cardNum" className="block mb-2">
                Credit Card Number:
              </label>
              <input
                type="text"
                id="cardNum"
                placeholder="1111-2222-3333-4444"
                value={cardNum}
                onChange={handleCardNumChange}
                onBlur={handleCardNumBlur}
                // maxLength={19}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                required
              />
              {
                    cardNumWarning? <p className="text-red-600 text-sm">Please enter a valid credit card number.</p>:""
                }
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                <label htmlFor="expDate" className="block mb-2">
                  Expiration :
                </label>
                <input
                  type="text"
                  id="expDate"
                  placeholder="MM/YY"
                  value={expDate}
                  maxLength={5}
                  onChange={handleExpDateChange}
                  onBlur={handleExpireDateBlur}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                 
                  required
                />
                 {
                    expireDateWarning? <p className="text-red-600 text-sm">Please enter an valid expire date.</p>:""
                }
                
              </div>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                <label htmlFor="cvv" className="block mb-2">
                  CVV:
                </label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="XXX"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                  maxLength={3}
                  value={cvv}
                  onBlur={handleCvvBlur}
                  onChange={handleCvvChange}
                  required
                />
                 {
                    cvvWarning? <p className="text-red-600 text-sm">Please enter a valid cvv number.</p>:""
                }
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Proceed to Checkout"
        
          className="w-full mt-6 bg-green-500 text-white py-3 rounded hover:bg-purple-700 cursor-pointer"
        />
      </form>
    </div>
  );
}
