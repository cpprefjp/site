# operator bool
* cpp17[meta cpp]
* node_handle[meta category]
* node_handle[meta class]
* function[meta id-type]
* [meta namespace]

```cpp
explicit operator bool() const noexcept;
```

## 概要
ノードハンドルが空であれば `false`、そうでなければ `true` を返す。


## 戻り値
`ptr_ != nullptr`


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::set<int>::node_type nh;
  std::cout << std::boolalpha << static_cast<bool>(nh);
}
```

### 出力
```
false
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
