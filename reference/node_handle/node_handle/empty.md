# empty
* cpp17[meta cpp]
* node_handle[meta category]
* node_handle[meta class]
* function[meta id-type]
* [meta namespace]

```cpp
bool empty() const noexcept;               // (1) C++17
[[nodiscard]] bool empty() const noexcept; // (1) C++20
constexpr bool empty() const noexcept;     // (1) C++26
```

## 概要
ノードハンドルが空であれば `true`、そうでなければ `false` を返す。


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::set<int>::node_type nh;
  std::cout << std::boolalpha << nh.empty();
}
```
* empty[color ff0000]

### 出力
```
true
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 5 [mark verified]


## 参照
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
