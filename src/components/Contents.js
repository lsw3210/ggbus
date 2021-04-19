import axios from 'axios'

const Contents = () => {



    useEffect(()=> {
        const fetchEvents = async () => {
            
            const res = await axios.get("https://unipass.customs.go.kr:38010/ext/rest/persEcmQry/retrievePersEcm?crkyCn=z270d270s071r197g010c030h1&persEcm=P691152741631&pltxNm=주연웅");
            console.log(res)
            makeData(res.data)
        }
        const makeData = (items) => {
            const arr = items.reduce((acc, cur)=>{
                const currentDate = new Date(cur.Date);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate();

                const confirmed = cur.Confirmed;
                const active = cur.Active;
                const death = cur.Deaths;
                const recovered = cur.Recovered;

                const findItem = acc.find(a=> a.year === year && a.month === month);
                if (!findItem) {
                    acc.push({
                        year, month, date, confirmed, active, death, recovered
                    })
                }
                if (findItem && findItem.date < date) {
                    findItem.active = active;
                    findItem.death = death;
                    findItem.date = date;
                    findItem.year = year;
                    findItem.month = month;
                    findItem.recovered = recovered;
                    findItem.confirmed = confirmed;
                }
                


                return acc;
            }, [])

            const labels = arr.map(a=> `${a.month+1}월`);

        }

        fetchEvents()
    },[])

    return (
        <section>
        <h2>국내 코로나 현황</h2>
        <div className='contents'>
            <div>
          
            </div>
        </div>
      </section>
    )
}

export default Contents

