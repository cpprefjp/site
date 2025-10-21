# 推論補助
* functional[meta header]
* std[meta namespace]
* functional[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template<class T>
  reference_wrapper(T&) -> reference_wrapper<T>;
}
```

## 概要
[`std::reference_wrapper`](/reference/functional/reference_wrapper.md)クラステンプレートの型推論補助。左辺値参照から推論する。


## 例
```cpp example
#include <iostream>
#include <functional>

int main()
{
  int x = 3;

  // xへの参照を保持する
  std::reference_wrapper r(x);
  r.get() += 1;
  std::cout << x << std::endl;
}
```
* r.get()[link get.md]

### 出力
```
4
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 7.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [LWG Issue 2993. `reference_wrapper<T>` conversion from `T&&`](https://wg21.cmeerw.net/lwg/issue2993)
