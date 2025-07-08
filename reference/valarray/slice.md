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


### プロパティ

| 名前 | 説明 | 対応バージョン |
|-------------------------------|--------------------------------------|------|
| [`start`](slice/start.md)   | スライスを生成する初期位置を取得する |      |
| [`size`](slice/size.md)     | 生成するスライスの要素数を取得する   |      |
| [`stride`](slice/stride.md) | スライスを生成する間隔を取得する     |      |


### 比較演算子

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|----------------|-------|
| [`operator==`](slice/op_equal.md) | 等値比較を行う | C++20 |
| `friend bool operator!=(const slice&, const slice&);` | 非等値比較を行う (`operator==`により使用可能) | C++20 |


## 例
```cpp example
#include <valarray>
#include <iostream>
#include <numeric>

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

### 出力
```
19
26
33
40
47
```
