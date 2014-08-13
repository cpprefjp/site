#valarray
`<valarray>`ヘッダは、線形代数学的な数値例の計算に特化したテンプレートクラスと基礎的な数学的処理を行うためのオーバーロードを定義したライブラリである。

なお、`slice_array`、 `gslice_array`、 `mask_array`、 `indirect_array` はそれぞれ要素を元の `valarray` への参照として保持し、valarray同様にvalarrayに対する各種のオペレータを適用可能なヘルパークラスであり、通常ライブラリのエンドユーザーがこれらのクラスについて特殊化されたユーザーコードを記述する必要は無い。

例については`valarray`クラスの例にまとめてあるのでそちらを参照されたい。


| クラス                               | 説明                          | 対応バージョン |
|--------------------------------------|-------------------------------|----------------|
| [`valarray`](./valarray/valarray.md) | 数値演算に特化した配列クラス | |
| [`slice`](./valarray/slice.md)       | `valarray` のためのスライス指示用のヘルパークラス | |
| [`gslice`](./valarray/gslice.md)     | `slice`をより一般化したスライス指示用のヘルパークラス | |
| [`slice_array`](./valarray/slice_array.md) | `valarray` の `operator[]` が `slice` に対して生成する要素参照スライス用のクラス | |
| [`gslice_array`](./valarray/gslice_array.md) | `valarray` の `operator[]` が `gslice` に対して生成する要素参照スライス用のクラス | |
| `mask_array`                         | `valarray` の `operator[]` が `valarray<bool>` に対して生成する要素参照スライス用のクラス | |
| `indirect_array`                     | `valarray` の `operator[]` が `valarray<size_t>` に対して生成する要素参照スライス用のクラス | |



