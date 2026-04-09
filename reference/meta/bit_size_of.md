# bit_size_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval std::size_t bit_size_of(info r);
}
```
* info[link info.md]

## 概要
ビットフィールドのビットサイズを取得する。


## 戻り値
`r`がビットフィールドを表す場合、そのビット幅を返す。


## 例外
`r`がビットフィールドを表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

struct Flags {
  unsigned a : 1;
  unsigned b : 3;
};

int main() {
  constexpr auto members = std::meta::nonstatic_data_members_of(
      ^^Flags, std::meta::access_context::unchecked());
  static_assert(std::meta::bit_size_of(members[0]) == 1);
  static_assert(std::meta::bit_size_of(members[1]) == 3);
}
```

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::meta::is_bit_field`](is_bit_field.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
