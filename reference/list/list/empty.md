# empty
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
bool empty() const;                        // (1) C++03
bool empty() const noexcept;               // (1) C++11
[[nodiscard]] bool empty() const noexcept; // (1) C++20
constexpr bool empty() const noexcept;     // (1) C++26
```

## 概要
コンテナが空かどうかを判定する


## 戻り値
コンテナが空であれば`true`、そうでなければ`false`を返す。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  // 空
  {
    std::list<int> ls;
    bool b = ls.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
  // 空じゃない
  {
    std::list<int> ls = {1, 2, 3};
    bool b = ls.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
}
```
* empty()[color ff0000]

### 出力
```
true
false
```

## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
