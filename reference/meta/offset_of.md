# offset_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval member_offset offset_of(info r);
}
```
* info[link info.md]

## 概要
メンバ変数や基底クラスのオフセットを取得する。

以下のいずれかを表すリフレクションを受け取れる：

- メンバ変数
- 無名ビットフィールド
- 直接基底クラス関係（仮想基底クラスかつ派生クラスが抽象クラスである組み合わせは除く）


## 戻り値
`r`が上記のいずれかを表す場合、所属するクラスの先頭からのオフセットを[`member_offset`](member_offset.md)として返す。


## 例外
`r`が上記のいずれも表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <print>

struct S {
  char a;
  int b;
  double c;
};

int main() {
  std::println("sizeof(S) = {}", sizeof(S));

  template for (constexpr auto m :
      std::define_static_array(std::meta::nonstatic_data_members_of(
          ^^S, std::meta::access_context::unchecked()))) {
    constexpr auto off = std::meta::offset_of(m);
    std::println("{}: offset = {} bytes, size = {}",
      std::meta::identifier_of(m),
      off.bytes,
      std::meta::size_of(m));
  }
}
```
* std::meta::offset_of[color ff0000]
* std::meta::nonstatic_data_members_of[link nonstatic_data_members_of.md]
* std::meta::identifier_of[link identifier_of.md]
* std::meta::size_of[link size_of.md]
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]

#### 出力例
```
sizeof(S) = 16
a: offset = 0 bytes, size = 1
b: offset = 4 bytes, size = 4
c: offset = 8 bytes, size = 8
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`member_offset`](member_offset.md)
- [`size_of`](size_of.md)
- [`alignment_of`](alignment_of.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
