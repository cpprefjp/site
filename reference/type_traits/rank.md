# rank
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct rank {
    using type = …;
  };
}
```

## 概要
配列型の次元数を取得する。


## 効果
型`T`が配列型である場合、配列の次元数となる整数値をメンバ定数`value`の値として定義する。配列型でなければ`0`をメンバ定数`value`の値として定義する。


## 例
```cpp
#include <type_traits>

static_assert(std::rank<int>::value == 0, "int rank is 0");
static_assert(std::rank<int[3]>::value == 1, "int[3] rank is 1");
static_assert(std::rank<int[3][4]>::value == 2, "int[3][4] rank is 2");

int main() {}
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0, 12.0, 14.0


