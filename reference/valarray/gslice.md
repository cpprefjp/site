#gslice
```cpp
namespace std {
  class gslice;
}
```

##概要
`gslice`は、[`std::slice`](/reference/valarray/slice.md) をより一般化したスライス指示用のヘルパークラスである。

このクラスは、[`std::valarray`](./valarray.md) クラスの [`operator[]`](./valarray/op_at.md) メンバ関数にスライスの指示を与えるために使用する。


「`gslice`」は、「generalized slice (汎用スライス)」の略。


##メンバ関数
###構築・破棄

| 名前 | 説明 | 対応バージョン |
|------------------------------------|----------------------------|------|
| [`(constructor)`](./slice/slice.md)| コンストラクタ             |      |


###その他メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------|----------------------------------------------------------------|------|
| [`start`](./gslice/start.md)   | スライスを生成する初期位置を取得する                           |      |
| [`size`](./gslice/size.md)     | 生成するスライスの要素数群の `valarray` オブジェクトを取得する |      |
| [`stride`](./gslice/stride.md) | スライスを生成する間隔数群の `valarray` を取得する             |      |


##例
```cpp
#include <valarray>
#include <iostream>

auto main()
  -> int
{
  std::valarray<int> a( 40 );
  std::iota( std::begin(a), std::end(a), 16 );
  
  // スライスの開始位置 3（start）から
  // 10個（strides[0]）おきに 3箇所（length[0]）
  // について、さらにそこから、
  //  3個（strides[1]）おきに 4箇所（legnth[1]）
  // を抜き出す。
  constexpr auto             start   = 3;
  std::valarray<std::size_t> lengths = {  3, 4 };
  std::valarray<std::size_t> strides = { 10, 3 };

  std::gslice gs( start, lengths, strides );

  auto gsliced_array = a[ gs ];
  
  decltype( a ) b( gsliced_array );

  for ( auto v : b )
    std::cout << v << "\n";
  std::cout << std::flush;
}

```

### 出力
```
19
22
25
28
29
32
35
38
39
42
45
48
```

- 19, 29, 39 は `strides[0]` 個おきに `lengths[0]` 個の位置。
    - 19 は元の`s`の `start + strides[0] * 0` 番目の要素。
        - 19, 22, 25, 28 は `strides[1]` 個おきに `lengths[1]` 個の要素。
    - 29 は元の`s`の `start + strides[0] * 1` 番目の要素。
        - 29, 32, 35, 38 は `strides[1]` 個おきに `lengths[1]` 個の要素。
    - 39 は元の`s`の `start + strides[0] * 2` 番目の要素。
        - 39, 42, 45, 48 は `strides[1]` 個おきに `lengths[1]` 個の要素。
