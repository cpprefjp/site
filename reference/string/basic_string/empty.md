# empty
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
bool empty() const;                                  // C++03
bool empty() const noexcept;                         // C++11
[[nodiscard]] constexpr bool empty() const noexcept; // C++20
constexpr bool empty() const noexcept;               // C++26
```

## 概要
文字列が空か判定する。


## 戻り値
[`size()`](size.md) `== 0` の評価結果。


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <string>

int main()
{
  std::string s = "hello";
  assert(!s.empty());

  s.clear();
  assert(s.empty());

  s = "";
  assert(s.empty());
}
```
* empty()[color ff0000]
* s.clear()[link clear.md]

### 出力
```
```

## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
    - C++20で`constexpr`が付加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
