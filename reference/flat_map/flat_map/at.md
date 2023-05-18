# at
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
mapped_type& at(const key_type& x);             // (1) C++23
const mapped_type& at(const key_type& x) const; // (2) C++23
```

## 概要
指定したキーを持つ要素を取得する。  
要素を取り出す際にキーの存在チェックをする。


## 戻り値
キー`x`に対応する値を返す。対応する要素が存在しないときは、[`out_of_range`](/reference/stdexcept.md)例外を投げる。


## 計算量
要素数に対して対数時間


## 例
```cpp example
#include <iostream>
#include <flat_map>
#include <stdexcept>

template<class Container, class T>
void at_wrap(Container& c, T v)
{
  try {
    std::cout << c.at(v) << std::endl;
  }
  catch(std::out_of_range&) {
    std::cout << "exception std::out_of_range" << std::endl;
  }
}

int main()
{
  std::flat_map<int,char> fm;
  fm.insert(std::make_pair(1, 'a'));

  at_wrap(fm, 1);
  at_wrap(fm, 2);
}
```
* c.at[color ff0000]
* fm.insert[link insert.md.nolink]
* std::out_of_range[link /reference/stdexcept.md]

### 出力
```
a
exception std::out_of_range
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`operator[]`](op_at.md)
- [`find()`](find.md.nolink)
