# nonstatic_data_members_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval std::vector<info> nonstatic_data_members_of(info type, access_context ctx);
}
```
* info[link info.md]
* access_context[link access_context.md]

## 概要
クラスのメンバ変数のリフレクションを取得する。


## 戻り値
`type`が完全型のクラスを表す場合、アクセスコンテキスト`ctx`でアクセス可能なメンバ変数のリフレクションを宣言順に格納した`vector`を返す。


## 例外
`r`が完全型のクラスを表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <print>

struct Point {
  int x;
  int y;
};

int main() {
  Point p{10, 20};
  template for (constexpr auto m :
      std::define_static_array(std::meta::nonstatic_data_members_of(^^Point,
          std::meta::access_context::unchecked()))) {
    std::println("{} = {}", std::meta::identifier_of(m), p.[:m:]);
  }
}
```
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]
* std::meta::identifier_of[link identifier_of.md]

### 出力
```
x = 10
y = 20
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`members_of`](members_of.md)
- [`subobjects_of`](subobjects_of.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
