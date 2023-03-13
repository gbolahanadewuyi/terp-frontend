const staff =[
    {"id":1,"name":"Hailee Shank","role":"Biostatistician IV","email":"hshank0@alibaba.com","gender":"Female","salary":"$551613.56","date_of_birth":"01/03/1983","id_type":"driver's license","id_number":609357,"bank_account_name":"West-Towne","bank_account_number":6963701072,"address":"0 Pearson Park","contact":"746-472-6069","account_status":"deactivated","department":"Legal"},
    {"id":2,"name":"Ranique Bleakley","role":"Desktop Support Technician","email":"rbleakley1@admin.ch","gender":"Female","salary":"$981714.09","date_of_birth":"16/06/1957","id_type":"driver's license","id_number":500755,"bank_account_name":"Doyle, Hamill and Brekke","bank_account_number":8893218157,"address":"00686 Gale Lane","contact":"833-850-7054","account_status":"deactivated","department":"Business Development"},
    {"id":3,"name":"Jamesy Fragino","role":"Developer I","email":"jfragino2@mit.edu","gender":"Male","salary":"$293220.60","date_of_birth":"28/10/1994","id_type":"voter's card","id_number":177186,"bank_account_name":"Skiles-Roob","bank_account_number":1154841084,"address":"01395 Waywood Junction","contact":"520-164-8402","account_status":"deactivated","department":"Support"},
    {"id":4,"name":"Stanfield Binnie","role":"Accountant I","email":"sbinnie3@fema.gov","gender":"Male","salary":"$84456.50","date_of_birth":"15/08/1990","id_type":"driver's license","id_number":418712,"bank_account_name":"Waelchi Group","bank_account_number":5121867772,"address":"86768 Melody Court","contact":"104-250-1885","account_status":"deactivated","department":"Product Management"},
    {"id":5,"name":"Keith Towell","role":"Senior Quality Engineer","email":"ktowell4@mapquest.com","gender":"Non-binary","salary":"$207621.86","date_of_birth":"11/10/1954","id_type":"driver's license","id_number":133710,"bank_account_name":"Haley-Gutmann","bank_account_number":1228005466,"address":"31126 Kennedy Lane","contact":"580-868-0248","account_status":"deactivated","department":"Engineering"},
    {"id":6,"name":"Lanny Bromidge","role":"Help Desk Operator","email":"lbromidge5@google.ca","gender":"Female","salary":"$680752.13","date_of_birth":"18/08/1965","id_type":"voter's card","id_number":205970,"bank_account_name":"Yost, Bechtelar and Runolfsson","bank_account_number":4661165694,"address":"04429 Anderson Trail","contact":"749-131-6270","account_status":"deactivated","department":"Engineering"},
    {"id":7,"name":"Bernetta Knibb","role":"Web Developer I","email":"bknibb6@gov.uk","gender":"Female","salary":"$855568.39","date_of_birth":"06/03/1980","id_type":"voter's card","id_number":850079,"bank_account_name":"Doyle-Farrell","bank_account_number":6999268420,"address":"1968 Killdeer Drive","contact":"215-746-8194","account_status":"deactivated","department":"Engineering"},
    {"id":8,"name":"Vince Tomsu","role":"Software Test Engineer IV","email":"vtomsu7@epa.gov","gender":"Male","salary":"$539535.23","date_of_birth":"11/01/1974","id_type":"national ID","id_number":804411,"bank_account_name":"Stokes-Nitzsche","bank_account_number":6467916923,"address":"243 Old Shore Trail","contact":"211-881-4402","account_status":"activated","department":"Business Development"},
    {"id":9,"name":"Zechariah Haggerstone","role":"Physical Therapy Assistant","email":"zhaggerstone8@cmu.edu","gender":"Male","salary":"$807307.47","date_of_birth":"12/09/1999","id_type":"driver's license","id_number":745192,"bank_account_name":"Leffler, Willms and O'Kon","bank_account_number":2576392612,"address":"9587 Sugar Avenue","contact":"294-726-6251","account_status":"deactivated","department":"Support"},
    {"id":10,"name":"Vivianna Jurkiewicz","role":"Chief Design Engineer","email":"vjurkiewicz9@symantec.com","gender":"Female","salary":"$113688.65","date_of_birth":"17/04/1993","id_type":"driver's license","id_number":805332,"bank_account_name":"Nikolaus-McLaughlin","bank_account_number":4341255086,"address":"726 Forster Alley","contact":"528-853-0599","account_status":"deactivated","department":"Support"},
    {"id":11,"name":"Augustine Loram","role":"Sales Representative","email":"alorama@vimeo.com","gender":"Female","salary":"$791447.52","date_of_birth":"06/10/1951","id_type":"national ID","id_number":345200,"bank_account_name":"Hickle, McClure and Reilly","bank_account_number":1666301635,"address":"598 Corscot Park","contact":"670-292-9089","account_status":"deactivated","department":"Legal"},
    {"id":12,"name":"Hally Nelissen","role":"Chemical Engineer","email":"hnelissenb@ox.ac.uk","gender":"Female","salary":"$474417.66","date_of_birth":"17/08/1983","id_type":"voter's card","id_number":269932,"bank_account_name":"Abshire LLC","bank_account_number":2746245848,"address":"9 Annamark Drive","contact":"946-129-0343","account_status":"activated","department":"Business Development"},
    {"id":13,"name":"Garth Blenkinsop","role":"Geological Engineer","email":"gblenkinsopc@drupal.org","gender":"Male","salary":"$618672.17","date_of_birth":"23/11/1981","id_type":"national ID","id_number":920185,"bank_account_name":"Nicolas, Effertz and Gibson","bank_account_number":7494531495,"address":"67 Fallview Way","contact":"607-914-0923","account_status":"activated","department":"Accounting"},
    {"id":14,"name":"Onfre Gyorffy","role":"Media Manager IV","email":"ogyorffyd@senate.gov","gender":"Male","salary":"$225751.84","date_of_birth":"05/01/1987","id_type":"driver's license","id_number":366876,"bank_account_name":"Anderson-Connelly","bank_account_number":3454102778,"address":"38 La Follette Court","contact":"559-812-4630","account_status":"deactivated","department":"Business Development"},
    {"id":15,"name":"Zacherie Hankinson","role":"Senior Cost Accountant","email":"zhankinsone@example.com","gender":"Male","salary":"$283385.44","date_of_birth":"10/06/1996","id_type":"voter's card","id_number":859461,"bank_account_name":"Luettgen, Dare and Daugherty","bank_account_number":5980176843,"address":"1092 Vidon Street","contact":"737-101-1044","account_status":"activated","department":"Services"},
    {"id":16,"name":"Helenelizabeth Standingford","role":"Senior Cost Accountant","email":"hstandingfordf@hp.com","gender":"Female","salary":"$191024.19","date_of_birth":"28/06/1976","id_type":"voter's card","id_number":410159,"bank_account_name":"Pollich, Gutmann and Yundt","bank_account_number":6763580495,"address":"1952 Bluejay Junction","contact":"660-719-8664","account_status":"deactivated","department":"Engineering"},
    {"id":17,"name":"Brook Henker","role":"Developer IV","email":"bhenkerg@admin.ch","gender":"Female","salary":"$547767.06","date_of_birth":"18/12/1997","id_type":"voter's card","id_number":650796,"bank_account_name":"Schmidt-Berge","bank_account_number":3308517870,"address":"7863 Jay Park","contact":"526-278-6569","account_status":"deactivated","department":"Human Resources"},
    {"id":18,"name":"Stefan Zealander","role":"Civil Engineer","email":"szealanderh@mozilla.org","gender":"Male","salary":"$358274.60","date_of_birth":"23/11/1951","id_type":"voter's card","id_number":621184,"bank_account_name":"Gulgowski-Predovic","bank_account_number":8111144852,"address":"16726 Logan Street","contact":"573-306-7570","account_status":"activated","department":"Accounting"},
    {"id":19,"name":"Vita Money","role":"Senior Sales Associate","email":"vmoneyi@phpbb.com","gender":"Female","salary":"$664307.92","date_of_birth":"27/02/1976","id_type":"voter's card","id_number":160771,"bank_account_name":"McCullough, VonRueden and Daugherty","bank_account_number":7236498431,"address":"5129 Claremont Crossing","contact":"189-343-0419","account_status":"deactivated","department":"Training"},
    {"id":20,"name":"Melli Prescote","role":"Geologist III","email":"mprescotej@mozilla.org","gender":"Female","salary":"$769418.69","date_of_birth":"13/02/1985","id_type":"national ID","id_number":879957,"bank_account_name":"Harber, Rutherford and Tromp","bank_account_number":4030445933,"address":"155 Laurel Alley","contact":"591-736-6715","account_status":"deactivated","department":"Accounting"},
    {"id":21,"name":"Laureen Keune","role":"Automation Specialist III","email":"lkeunek@sun.com","gender":"Female","salary":"$244401.58","date_of_birth":"08/07/1973","id_type":"national ID","id_number":107076,"bank_account_name":"Mann-Zulauf","bank_account_number":5897937481,"address":"7310 Huxley Place","contact":"920-384-3731","account_status":"activated","department":"Marketing"},
    {"id":22,"name":"Dennie MacRedmond","role":"GIS Technical Architect","email":"dmacredmondl@aol.com","gender":"Male","salary":"$156628.90","date_of_birth":"20/10/1985","id_type":"voter's card","id_number":993282,"bank_account_name":"Brekke, Kemmer and Spinka","bank_account_number":9302513673,"address":"51940 Butternut Avenue","contact":"363-490-4751","account_status":"activated","department":"Legal"},
    {"id":23,"name":"Archy Petracci","role":"Marketing Manager","email":"apetraccim@miitbeian.gov.cn","gender":"Male","salary":"$932804.81","date_of_birth":"24/12/1998","id_type":"national ID","id_number":887483,"bank_account_name":"Hermann, Wolff and Cronin","bank_account_number":9240321268,"address":"66 Anhalt Park","contact":"888-749-4387","account_status":"activated","department":"Accounting"},
    {"id":24,"name":"Chrysa Cazin","role":"Geologist II","email":"ccazinn@mac.com","gender":"Female","salary":"$966666.28","date_of_birth":"14/01/1952","id_type":"driver's license","id_number":490019,"bank_account_name":"Reinger-Doyle","bank_account_number":6759085734,"address":"850 6th Pass","contact":"909-139-0949","account_status":"activated","department":"Product Management"},
    {"id":25,"name":"Tomlin Tallow","role":"Engineer II","email":"ttallowo@delicious.com","gender":"Male","salary":"$953642.60","date_of_birth":"12/11/1993","id_type":"driver's license","id_number":662000,"bank_account_name":"Ferry-Hauck","bank_account_number":7721997029,"address":"9 Acker Street","contact":"101-901-8315","account_status":"deactivated","department":"Training"},
    {"id":26,"name":"Laughton Birchenhead","role":"Senior Editor","email":"lbirchenheadp@gnu.org","gender":"Male","salary":"$708266.50","date_of_birth":"07/05/1951","id_type":"voter's card","id_number":609158,"bank_account_name":"Jenkins-Volkman","bank_account_number":4504718231,"address":"09409 Dunning Place","contact":"940-722-9444","account_status":"deactivated","department":"Accounting"},
    {"id":27,"name":"Adams Stillmann","role":"Financial Advisor","email":"astillmannq@comsenz.com","gender":"Male","salary":"$427822.91","date_of_birth":"21/10/1992","id_type":"national ID","id_number":912061,"bank_account_name":"Hyatt Group","bank_account_number":3838401437,"address":"46 Mifflin Lane","contact":"617-269-5763","account_status":"deactivated","department":"Sales"},
    {"id":28,"name":"Petronia Trattles","role":"Teacher","email":"ptrattlesr@npr.org","gender":"Female","salary":"$665889.29","date_of_birth":"10/02/1965","id_type":"national ID","id_number":909607,"bank_account_name":"Yundt-Ryan","bank_account_number":8203734033,"address":"9 School Alley","contact":"855-304-6537","account_status":"activated","department":"Research and Development"},
    {"id":29,"name":"Josselyn Dare","role":"GIS Technical Architect","email":"jdares@deliciousdays.com","gender":"Female","salary":"$45850.95","date_of_birth":"13/04/1954","id_type":"driver's license","id_number":337081,"bank_account_name":"Christiansen-Auer","bank_account_number":3436043527,"address":"630 Vidon Pass","contact":"607-107-9486","account_status":"activated","department":"Product Management"},
    {"id":30,"name":"Maximilian Patsall","role":"Account Executive","email":"mpatsallt@last.fm","gender":"Agender","salary":"$629133.60","date_of_birth":"26/03/1973","id_type":"driver's license","id_number":189548,"bank_account_name":"Bode, Gorczany and Reichel","bank_account_number":6304768245,"address":"740 Sommers Court","contact":"385-766-3153","account_status":"deactivated","department":"Human Resources"},
    {"id":31,"name":"Lyda McAleese","role":"Recruiter","email":"lmcaleeseu@php.net","gender":"Female","salary":"$576631.38","date_of_birth":"20/05/1962","id_type":"national ID","id_number":358094,"bank_account_name":"Kilback Inc","bank_account_number":1754133689,"address":"306 Meadow Ridge Junction","contact":"257-989-8989","account_status":"deactivated","department":"Accounting"}

];

export default staff;