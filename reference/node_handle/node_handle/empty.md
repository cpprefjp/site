# empty
* cpp17[meta cpp]
* node_handle[meta category]
* node_handle[meta class]
* function[meta id-type]
* [meta namespace]

```cpp
bool empty() const noexcept;
[[nodiscard]] bool empty() const noexcept; // C++20
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
- [Clang](/implementation.md#clang): 7.0.0
- [GCC](/implementation.md#gcc): 7.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 5


## 参照
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
- [P0600R1 `[[nodiscard]]` in the Library, Rev1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
