# slice

```cpp
namespace std {
  class slice {
  public:
    slice();
    slice(size_t start, size_t length, size_t stride);
    slice(const slice&);
    size_t start() const;
    size_t size() const;
    size_t stride() const;
  };
}
```

## 概要

`std::valarray` テンプレートクラスの `operator[]` メンバ関数にスライスの指示を与える為のヘルパークラス。

## メンバ関数

### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------------------------------------|----------------------------|------|
| [`(constructor)`](./slice/slice.md)| コンストラクタ             |      |

### その他メンバ関数

| 名前 | 説明 | 対応バージョン |
| [`start`](./slice/start.md)        | スライスを生成する初期位置 |      |
| [`size`](.slice/size.md)           | 生成するスライスの要素数   |      |
| [`stride`](.slice/stride.md)       | スライスを生成する間隔     |      |

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

### 出力

```
19
26
33
40
47
```
