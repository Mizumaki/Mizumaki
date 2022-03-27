// TODO: This is not compatible with next export
// import Image from 'next/image';
// import Talisker from '../../../talisker.png';
import styles from './LiquorDetail.module.css';

export const LiquorDetail: React.VFC = () => {
  return (
    <div>
      <h2>Liquor</h2>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <p>お酒の画像</p>
          <div className={styles.imgWrapper}>{/* <Image src={Talisker} alt='talisker' /> */}</div>
        </div>
        <div className={styles.detailSection}>
          <table>
            <tbody>
              <tr>
                <th>Category</th>
                <td>Single Malt</td>
              </tr>
              <tr>
                <th>Distillery</th>
                <td>Cragganmore</td>
              </tr>
              <tr>
                <th>Bottler</th>
                <td>Distillery Bottling</td>
              </tr>
              <tr>
                <th>Vintage</th>
                <td>1988</td>
              </tr>
              <tr>
                <th>Bottled</th>
                <td>2014</td>
              </tr>
              <tr>
                <th>Stated Age</th>
                <td>25 years old</td>
              </tr>
              <tr>
                <th>Casktype</th>
                <td>Refill American and European Oak Casks</td>
              </tr>
              <tr>
                <th>Strength</th>
                <td>51.4 % Vol.</td>
              </tr>
              <tr>
                <th>開封</th>
                <td>2021/12/14</td>
              </tr>
              <tr>
                <th>出会った日</th>
                <td>2021/12/10</td>
              </tr>
              <tr>
                <th>飲みきり日</th>
                <td>2022/08/11</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
