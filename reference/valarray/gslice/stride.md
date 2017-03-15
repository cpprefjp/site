# stride
* valarray[meta header]
* std[meta namespace]
* gslice[meta class]
* function[meta id-type]

```cpp
valarray<size_t> stride() const;
```
* size_t[link /reference/cstddef/size_t.md]
* valarray[link /reference/valarray/valarray.md]

## 概要
スライスを生成する間隔数群を取得する。


## 戻り値
スライスを生成する間隔数群。


## 例
```cpp
#include <valarray>
#include <iostream>

auto main()
  -> int
{
  constexpr auto             start   = 3;
  std::valarray<std::size_t> lengths = {  3, 4 };
  std::valarray<std::size_t> strides = { 10, 3 };

  std::gslice gs( start, lengths, strides );

  for ( auto x : gs.stride() )
    std::cout << x << "\n";
  std::cout << std::flush;
}
```

### 出力
```
10
3
```

