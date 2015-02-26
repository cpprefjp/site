#begin (C++11)
* array[meta header]
* std[meta namespace]
* array[meta class]

```cpp
iterator begin() noexcept;
const_iterator begin() const noexcept;
```

##概要
先頭要素を指すイテレータを取得する。


##戻り値
非`const`な文脈では`iterator`型で先頭要素へのイテレータを返し、
`const`な文脈では`const_iterator`型で先頭要素へのイテレータを返す。


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

  decltype(ar)::iterator i = ar.begin();
  decltype(ar)::const_iterator ci = car.begin();

  std::cout << *i << std::endl;
  std::cout << *ci << std::endl;
}
```
* begin[color ff0000]


###出力
```
1
1
```


##バージョン
###言語
- C++11

###処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0


##参照

