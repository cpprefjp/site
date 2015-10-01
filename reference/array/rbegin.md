#rbegin
* array[meta header]
* std[meta namespace]
* array[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
reverse_iterator rbegin() noexcept;
const_reverse_iterator rbegin() const noexcept;
```

##概要
末尾要素を指す逆イテレータを取得する。


##戻り値
非`const`な文脈では`reverse_iterator`型で末尾要素への逆イテレータを返し、
`const`な文脈では`const_reverse_iterator`型で末尾要素への逆イテレータを返す。


##例外
投げない


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> ar = {1, 2, 3};
  const std::array<int, 3>& car = ar;

  decltype(ar)::reverse_iterator i = ar.rbegin();
  decltype(ar)::const_reverse_iterator ci = car.rbegin();

  std::cout << *i << std::endl;
  std::cout << *ci << std::endl;
}
```
* rbegin[color ff0000]


###出力
```
3
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


