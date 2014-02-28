#operator*(C++11)
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
- [GCC](/implementation#gcc.md): 4.3.6
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?
