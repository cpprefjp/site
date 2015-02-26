#operator* (C++11)
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]

```cpp
T& operator*() const noexcept;
```

##概要
ポインタを間接参照する。


##要件

```cpp
get() != nullptr
```
* get()[link ./get.md]


##戻り値
`*`[`get()`](./get.md)


##備考
型`T`が`void`の場合、この関数が定義されるかどうかは未規定。定義される場合、その戻り値は未規定。


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(3));

  int& r = *p;
  std::cout << r << std::endl;
}
```

###出力
```
3
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation.md#gcc): 4.3.6
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 9.0 (TR1), 10.0, 11.0, 12.0
