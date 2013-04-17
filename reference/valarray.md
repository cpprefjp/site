#valarray
<valarray> は線形代数学的な数値例の計算に特化したテンプレートクラスと基礎的な数学的処理を行うためのオーバーロードを定義したライブラリである。

なお、  slice_array , gslice_array , mask_array , indirect_array はそれぞれ要素を元の valarray への参照として保持し、valarray同様にvalarrayに対する各種のオペレータを適用可能なヘルパークラスであり、通常ライブラリのエンドユーザーがこれらのクラスについて特殊化されたユーザーコードを記述する必要は無い。

例についてはvalarrayクラスの例にまとめてあるのでそちらを参照されたい。

クラス


| | |
|-------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| [valarray](./valarray/valarray.md) | valarray テンプレートクラス |
| [slice](./valarray/slice.md) | valarray のためのスライス指示用のヘルパークラス |
| [gslice](./valarray/gslice.md) | sliceをより一般化したスライス指示用のヘルパークラス |
| slice_array | valarray のヘルパーオペレータ [] が slice に対して生成する要素参照スライス用のクラス |
| gslice_array | valarray のヘルパーオペレータ [] が gslice に対して生成する要素参照スライス用のクラス |
| mask_array | valarray のヘルパーオペレータ [] が valarray<bool> に対して生成する要素参照スライス用のクラス |
| indirect_array | valarray のヘルパーオペレータ [] が valarray<size_t> に対して生成する要素参照スライス用のクラス |


オーバーロードされる std::valarray の為の関数群


| | |
|------------|--------------------------------------------------------------------------------------------------------------------------------|
| operator* | valarray の各要素を valarray または定数で乗算した valarray を生成する |
| operator/ | valarray の各要素を valarray または定数で除算した valarray を生成する |
| operator% | valarray の各要素を valarray または定数で剰余算した valarray を生成する |
| operator+ | valarray の各要素を valarray または定数で加算した valarray を生成する |
| operator- | valarray の各要素を valarray または定数で減算した valarray を生成する  |
| operator^ | valarray の各要素を valarray または定数でビットを排他的論理和した valarray を生成する |
| operator& | valarray の各要素を valarray または定数でビットを論理積した valarray を生成する |
| operator&#x7C; | valarray の各要素を valarray または定数でビットを論理和した valarray を生成する |
| operator<< | valarray の各要素を valarray または定数で左シフト算した valarray を生成する |
| operator>> | valarray の各要素を valarray または定数で右シフト算した valarray を生成する |
| operator== | valarray の各要素を valarray または定数と等しいか比較した valrray<bool> を生成する |
| operator!= | valarray の各要素を valarray または定数と等しくないか比較した valrray<bool> を生成する |
| operator> | valarray の各要素を valarray または定数と大なりか比較した valrray<bool> を生成する |
| operator< | valarray の各要素を valarray または定数と小なりか比較した valrray<bool> を生成する |
| operator<= | valarray の各要素を valarray または定数と以下であるか比較した valrray<bool> を生成する |
| operator>= | valarray の各要素を valarray または定数と以上であるか比較した valrray<bool> を生成する |
| operator&& | valarray の各要素を valarray または定数との論理積の valrray<bool> を生成する |
| operator&#x7C;&#x7C; | valarray の各要素を valarray または定数との論理和の valrray<bool> を生成する |
| abs | valarray の各要素に <cmath> の abs を適用した valarray を生成する |
| acos |<span> valarray の各要素に <cmath> の acos を</span>適用した valarray を生成する |
| asin |<span> valarray の各要素に <cmath> の asin を</span>適用した valarray を生成する |
| atan |<span> valarray の各要素に <cmath> の atan を</span>適用した valarray を生成する |
| atan2 |<span> valarray の各要素に <cmath> の atan2 を</span>適用した valarray を生成する |
| cos | valarray の各要素に <cmath> の cos を適用した valarray を生成する |
| cosh |<span> valarray の各要素に <cmath> の cosh を</span>適用した valarray を生成する |
| exp |<span> valarray の各要素に <cmath> の exp を</span>適用した valarray を生成する |
| log | valarray の各要素に <cmath> の log を適用した valarray を生成する |
| log10 | valarray の各要素に <cmath> の log10 を適用した valarray を生成する |
| pow | valarray の各要素に <cmath> の pow を適用した valarray を生成する |
| sin | valarray の各要素に <cmath> の sin を適用した valarray を生成する |
| sinh | valarray の各要素に <cmath> の sinh を適用した valarray を生成する |
| sqrt | valarray の各要素に <cmath> の sqrt を適用した valarray を生成する |
| tan | valarray の各要素に <cmath> の tan を適用した valarray を生成する |
| tanh | valarray の各要素に <cmath> の tanh を適用した valarray を生成する  |


