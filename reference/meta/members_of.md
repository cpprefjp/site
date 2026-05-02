# members_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval std::vector<info> members_of(info r, access_context ctx);
}
```
* info[link info.md]
* access_context[link access_context.md]

## 概要
クラスまたは名前空間のすべてのメンバのリフレクションを取得する。


## 戻り値
`r`が完全型のクラスまたは名前空間を表す場合、アクセスコンテキスト`ctx`でアクセス可能なすべてのメンバのリフレクションを格納した`vector`を返す。


## 例外
`r`が完全型のクラスまたは名前空間を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <print>

struct S {
  int x;
  double y;
  void f() {}
};

int main() {
  constexpr auto count = std::meta::members_of(
      ^^S, std::meta::access_context::unchecked()).size();
  std::println("メンバ数: {}", count);
}
```
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]

#### 出力例
```
メンバ数: 9
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`nonstatic_data_members_of`](nonstatic_data_members_of.md)
- [`static_data_members_of`](static_data_members_of.md)
- [`bases_of`](bases_of.md)
- [`access_context`](access_context.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
