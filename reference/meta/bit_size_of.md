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
ビットサイズを取得する。

以下のいずれかを表すリフレクションを受け取れる：

- 型
- オブジェクト
- 値
- 参照型でない変数
- メンバ変数（ビットフィールドを含む）
- 無名ビットフィールド
- 直接基底クラス関係


## 戻り値
`r`がビットフィールドまたは無名ビットフィールドを表す場合、そのビット幅を返す。

それ以外（型、オブジェクト、値、参照型でない変数、ビットフィールドでないメンバ変数、直接基底クラス関係）を表す場合、[`CHAR_BIT`](/reference/climits/char_bit.md) `*` [`size_of(r)`](size_of.md)を返す。


## 例外
`r`が上記のいずれも表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <climits>

struct Flags {
  unsigned a : 1;
  unsigned b : 3;
  int c;
};

consteval bool check() {
  // 型のビットサイズ: CHAR_BIT * size_of(int)
  static_assert(std::meta::bit_size_of(^^int) == CHAR_BIT * sizeof(int));

  // ビットフィールドのビット幅
  auto members = std::meta::nonstatic_data_members_of(
      ^^Flags, std::meta::access_context::unchecked());
  return std::meta::bit_size_of(members[0]) == 1                       // a: 1
      && std::meta::bit_size_of(members[1]) == 3                       // b: 3
      && std::meta::bit_size_of(members[2]) == CHAR_BIT * sizeof(int); // c: CHAR_BIT * sizeof(int)
}

int main() {
  static_assert(check());
}
```
* CHAR_BIT[link /reference/climits/char_bit.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::meta::is_bit_field`](is_bit_field.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
