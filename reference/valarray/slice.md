# slice
* valarray[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class slice;
}
```

## 概要
`slice`は、[`std::valarray`](valarray.md) クラスの [`operator[]`](valarray/op_at.md) メンバ関数にスライスの指示を与えるためのヘルパークラスである。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|----------------------------|------|
| [`(constructor)`](slice/op_constructor.md) | コンストラクタ             |      |


### その他メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------|--------------------------------------|------|
| [`start`](slice/start.md)   | スライスを生成する初期位置を取得する |      |
| [`size`](slice/size.md)     | 生成するスライスの要素数を取得する   |      |
| [`stride`](slice/stride.md) | スライスを生成する間隔を取得する     |      |


## 例
```cpp
#include <valarray>
#include <iostream>

auto main()
  -> int
{
  std::valarray<int> a( 32 );
  std::iota( std::begin(a), std::end(a), 16 );

  constexpr auto start  = 3;
  constexpr auto length = 5;
  constexpr auto stride = 7;

  std::slice s( start, length, stride );

  auto sliced_array = a[ s ];

  decltype( a ) b( sliced_array );

  for ( auto v : b )
    std::cout << v << "\n";
  std::cout << std::flush;
}
```
* std::slice[color ff0000]
* std::valarray[link valarray.md]
* std::iota[link /reference/numeric/iota.md]
* std::begin[link valarray/begin_free.md]
* std::end[link valarray/end_free.md]

### 出力
```
19
26
33
40
47
```
