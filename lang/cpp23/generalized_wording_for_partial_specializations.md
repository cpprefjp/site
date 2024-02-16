# 変数テンプレートの部分特殊化を許可
* cpp23[meta cpp]

## 概要
変数テンプレートの仕様として、部分特殊化の許可を意図したような仕様はあったが、部分特殊化の多くの仕様はクラステンプレートのみを対象にしていた。

C++23では部分特殊化の仕様を見直し、変数テンプレートの部分特殊化を明確に許可する。


## 例
```cpp example
#include <iostream>

template <class T>
constexpr T zero = 0;

template <class T>
constexpr T* zero<T*> = nullptr;

int main() {
  int x = zero<int>;
  int* y = zero<int*>;

  std::cout << x << std::endl;
  std::cout << y << std::endl;
}
```

### 出力例
```
0
(nil)
```

## 関連項目
- [C++14 変数テンプレート](/lang/cpp14/variable_templates.md)


## 参照
- [P2096R2 Generalized wording for partial specializations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2096r2.html)
