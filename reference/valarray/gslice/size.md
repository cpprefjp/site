#size
* valarray[meta header]
* std[meta namespace]
* gslice[meta class]

```cpp
valarray<size_t> size() const;
```
* size_t[link /reference/cstddef/size_t.md]
* valarray[link /reference/valarray/valarray.md]

##概要
スライスを生成する要素数群を取得する。


##戻り値
スライスを生成する要素数群。

##例
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
  
  for ( auto v : gs.size() )
    std::cout << v << "\n";
  std::cout << std::flush;
}
```

###出力
```
3
4
```
