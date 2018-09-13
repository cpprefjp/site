# end
* array[meta header]
* std[meta namespace]
* array[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator end() noexcept;
const_iterator end() const noexcept;
```

## 概要
末尾の次を指すイテレータを取得する。


## 戻り値
非`const`な文脈では`iterator`型で最後尾要素の次を指すイテレータを返し、
`const`な文脈では`const_iterator`型で 最後尾要素の次を指すイテレータを返す。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> ar = {1, 2, 3};
  const std::array<int, 3>& car = ar;

  decltype(ar)::iterator i = ar.begin();
  decltype(ar)::iterator last = ar.end();

  decltype(ar)::const_iterator ci = car.begin();
  decltype(ar)::const_iterator clast = car.end();

  for (; i != last; ++i) {
    std::cout << *i << std::endl;
  }

  for (; ci != clast; ++ci) {
    std::cout << *ci << std::endl;
  }
}
```
* end[color ff0000]


### 出力
```
1
2
3
1
2
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012


## 参照

