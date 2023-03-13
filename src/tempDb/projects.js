const projectsx = [
    { id:1, 
      name: 'Apo Legislative Quarters Reconstruction', 
      tag: 'construction', 
      client: 'Ministry of Housing', 
      statusx: 'completed', 
      payment_balance: 20000, 
      wallet_amount: 300000, 
      progress: '90%', 
      expense:[
        {id:1, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:2, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"}
      ]  
    },
    { 
      id:2, 
      name: 'aaApo Legislative Quarters Reconstruction', 
      tag: 'construction', 
      client: 'Ministry of Housing', 
      statusx: 'active', 
      payment_balance: 20000, 
      wallet_amount: 300000, 
      progress: '40%', 
      expense:[
        {id:1, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:2, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:3, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:4, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
      ]  
    },
    { 
      id:3, 
      name: 'aaApo Legislative Quarters Reconstruction', 
      tag: 'construction', client: 'Ministry of Education', 
      statusx: 'not started', 
      payment_balance: 20000, 
      wallet_amount: 300000, 
      progress: '45%', 
      expense:[
        {id:1, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:2, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:3, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:4, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
      ]  
    },
    { 
      id:4, 
      name: 'aaaaaApo Legislative Quarters Reconstruction', 
      tag: 'construction', 
      client: 'Ministry of Housing', 
      statusx: 'completed', 
      payment_balance: 20000, 
      wallet_amount: 300000, 
      progress: '68%', 
      expense:[
        {id:1, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:2, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:3, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:4, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
      ]  
    },
    { 
      id:5, 
      name: 'aaApo Legislative Quarters Reconstruction', 
      tag: 'construction', 
      client: 'Ministry of Housing', 
      statusx: 'completed', 
      payment_balance: 20000, 
      wallet_amount: 300000, 
      progress: '50%', 
      expense:[
        {id:1, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:2, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:3, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:4, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
      ]  
    },
    { 
      id:6, 
      name: 'aApo Legislative Quarters Reconstruction', 
      tag: 'construction', 
      client: 'Ministry of Housing', 
      statusx: 'not started', 
      payment_balance: 20000, 
      wallet_amount: 300000, 
      progress: '80%', 
      expense:[
        {id:1, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:2, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:3, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:4, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
      ]  
    },
    { 
      id:7, 
      name: 'aaaaaApo Legislative Quarters Reconstruction', 
      tag: 'renovation', client: 'Ministry of Housing', 
      statusx: 'completed', 
      payment_balance: 20000, 
      wallet_amount: 300000, 
      progress: '20%', 
      expense:[
        {id:1, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:2, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:3, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:4, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
      ]  
    }
  ]


  const durations = [
    {
      id:1,
      duration: "1 Month"
    },

    {
      id:2,
      duration: "3 Months"
    },

    {
      id:3,
      duration: "6 Months"
    },

    {
      id:4,
      duration: "8 Months"
    },

    {
      id:5,
      duration: "12 Months"
    },



  ]


  const status = [
    {
      id:1, 
      status: 'Ongoing', 
    },

    {
      id:2, 
      status: 'Pending', 
    },

    {
      id:3, 
      status: 'Completed', 
    },

  ]

  const milestones = [
    {
      id:1,
      percentage:10
    },

    {
      id:2,
      percentage:20
    },

    {
      id:3,
      percentage:50
    },

    {
      id:4,
      percentage:70
    },

    {
      id:5,
      percentage:80
    },

    {
      id:6,
      percentage:90
    },

    {
      id:7,
      percentage:100
    },




  ]
  export default {projectsx, status, milestones, durations} 