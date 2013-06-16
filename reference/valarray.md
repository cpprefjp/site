#valarray
`<valarray>`ヘッダは、線形代数学的な数値例の計算に特化したテンプレートクラスと基礎的な数学的処理を行うためのオーバーロードを定義したライブラリである。

なお、`slice_array`、 `gslice_array`、 `mask_array`、 `indirect_array` はそれぞれ要素を元の `valarray` への参照として保持し、valarray同様にvalarrayに対する各種のオペレータを適用可能なヘルパークラスであり、通常ライブラリのエンドユーザーがこれらのクラスについて特殊化されたユーザーコードを記述する必要は無い。

例については`valarray`クラスの例にまとめてあるのでそちらを参照されたい。


| クラス                               | 説明                          |
|--------------------------------------|-------------------------------|
| [`valarray`](./valarray/valarray.md) | `valarray` クラステンプレート |
| [`slice`](./valarray/slice.md)       | `valarray` のためのスライス指示用のヘルパークラス |
| [`gslice`](./valarray/gslice.md)     | `slice`をより一般化したスライス指示用のヘルパークラス |
| `slice_array`                        | `valarray` のヘルパーオペレータ `[]` が `slice` に対して生成する要素参照スライス用のクラス |
| `gslice_array`                       | `valarray` のヘルパーオペレータ `[]` が `gslice` に対して生成する要素参照スライス用のクラス |
| `mask_array`                         | `valarray` のヘルパーオペレータ `[]` が `valarray<bool>` に対して生成する要素参照スライス用のクラス |
| `indirect_array`                     | `valarray` のヘルパーオペレータ `[]` が `valarray<size_t>` に対して生成する要素参照スライス用のクラス |



