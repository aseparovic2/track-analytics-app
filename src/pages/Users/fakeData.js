export const users = [
      {
        id: 3,
        fname: "John",
        mname: "Doe",
        lname: "Doe",
        email: "john@intellego.com",
        link_sent: 0,
        email_verified: 1,
        active: 1,
        blocked: 0
      },
      {
        id: 4,
        fname: "Fran",
        mname: "Accountant",
        lname: "Tokyo",
        email: "saty@hello.com",
        link_sent: 1,
        email_verified: 1,
        active: 0,
        blocked: 0
      },
  {
    id: 5,
    fname: "Ivan",
    mname: "Accountant",
    lname: "Ivic",
    email: "ivan@hello.com",
    link_sent: 1,
    email_verified: 0,
    active: 1,
    blocked: 0
  },
  {
    id: 6,
    fname: "Luka",
    mname: "Accountant",
    lname: "Doe",
    email: "luka@hello.com",
    link_sent: 1,
    email_verified: 0,
    active: 1,
    blocked: 0
  },
  {
    id: 7,
    fname: "Blocked",
    mname: "Accountant",
    lname: "User",
    email: "saty@hello.com",
    link_sent: 1,
    email_verified: 1,
    active: 0,
    blocked: 1
  },
  {
    id: 8,
    fname: "Test",
    mname: "Accountant",
    lname: "User",
    email: "user@hello.com",
    link_sent: 1,
    email_verified: 1,
    active: 1,
    blocked: 0
  }

]


export const contacts = [
  {
    id: 1,
    fk_contact_type: 1,
    active: 1,
    label: 'Office',
    value: '+47 414 92 000'
  },
  {
    id: 2,
    fk_contact_type: 1,
    active: 0,
    label: 'Office',
    value: '+48 000 91 199'
  },
  {
    id: 3,
    fk_contact_type: 4,
    active: 1,
    label: '',
    value: 'tester@mail.com'
  }
]

export const companyContacts = [
  {
    id: 1,
    fk_contact_type: 1,
    active: 1,
    label: 'Phone',
    value: '+33 414 92 000'
  },
  {
    id: 2,
    fk_contact_type: 1,
    active: 0,
    label: 'Phone 2',
    value: '+33 000 91 199'
  },
  {
    id: 3,
    fk_contact_type: 4,
    active: 1,
    label: '',
    value: 'tester@mail.com'
  }
]

export const contact_types = [
  {
    id: 1,
    name: 'Phone'
  },
  {
    id: 2,
    name: 'Fax'
  },
  {
    id: 3,
    name: 'Mobile'
  },
  {
    id: 4,
    name: 'E-mail'
  },
  {
    id: 5,
    name: 'Skype'
  },
  {
    id: 6,
    name: 'LinkedIn'
  },
  {
    id: 7,
    name: 'Website'
  }
]

export const addresses = [
  {
    id: 1,
    label: 'Office address',
    fline: 'Svinoddveien',
    sline: 'Aust-Agder',
    tline: null,
    post_num: 40836,
    city: 'Arendal',
    fk_country: 168,
  },
  {
    id: 2,
    label: 'Home address',
    fline: 'Svinoddveien',
    sline: 'Street',
    tline: 'Number 8',
    post_num: 40836,
    city: 'Arendal',
    fk_country: 168,
  }
]

export const companyAddresses = [
  {
    id: 1,
    label: 'Company address',
    fline: 'Svinoddveien',
    sline: 'Aust-Agder',
    tline: null,
    post_num: 40836,
    city: 'Arendal',
    fk_country: 168,
  }
]

export const countries = [
  {
    id: 1,
    name: 'Croatia'
  },
  {
    id: 2,
    name: 'Cipar'
  },
  {
    id: 3,
    name: 'UAE'
  },
  {
    id: 4,
    name: 'SAD'
  },
  {
    id: 168,
    name: 'Norway'
  }
]

export const positions = [
  {
    id: 1,
    department: "Ship Management Asia Tankers",
    position: "Vessel Manager",
    started: "22.02.2006",
    finished: "22.02.2012"
  },
  {
    id: 2,
    department: "Ship Management Asia Tankers",
    position: "Global Manager",
    started: "22.02.2012",
    finished: false
  }
]
