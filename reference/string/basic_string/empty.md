# empty
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
bool empty() const noexcept;               // C++03
[[nodiscard]] bool empty() const noexcept; // C++20
```

## 概要
文�列が空か判定する。


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
