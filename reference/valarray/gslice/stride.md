# stride
* valarray[meta header]
* std[meta namespace]
* gslice[meta class]
* function[meta id-type]

```cpp
valarray<std::size_t> stride() const;
```
* valarray[link /reference/valarray/valarray.md]

## 概要
スライスを生成する間隔数群を取得する。


## 戻り値
スライスを生成する間隔数群。


## 備考
- `valarray<T>`型のオブジェクトを返すこの関数を含むあらゆる関数は、`valarray`クラスと同じ`const`メンバ関数をもつほかの型を返すことが実装に許可される。例として複数の`valarray`操作をつなげて記述したときに最適化できるよう、式テンプレートを返す実装もある


## 例
```cpp example
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
* stride()[color ff0000]

### 出力
```
10
3
```
